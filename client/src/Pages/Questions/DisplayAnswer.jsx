import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';
import { deleteAnswer, voteAnswer } from "../../actions/question";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import toast from 'react-hot-toast';
import HTMLReactParser from 'html-react-parser';

const VotingButtons = ({ ans, handleVote }) => (
    <div className="question-votes">
        <img
            src={upvote}
            alt="Upvote"
            width="18"
            className="votes-icon"
            onClick={() => handleVote(ans._id, "upVote")}
        />
        <p className="votes-count">{ans.upVote.length - ans.downVote.length}</p>
        <img
            src={downvote}
            alt="Downvote"
            width="18"
            className="votes-icon"
            onClick={() => handleVote(ans._id, "downVote")}
        />
    </div>
);

const DisplayAnswer = ({ question, handleShare }) => {
    const User = useSelector((state) => state.currentUserReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleVote = (answerId, value) => {
        if (!User) {
            toast.error(`You need to login to ${value === "upVote" ? "upvote" : "downvote"} an answer.`);
        } else {
            console.log('answerId:', answerId);
            console.log('value:', value);
            dispatch(voteAnswer(answerId, value));
        }
    };

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
        toast.success('Answer deleted');
    };

    return (
        <div>
            {question.answer.map((ans) => (
                <div className="display-ans" key={ans._id}>
                    <div className="question-details-container-2">
                        <VotingButtons ans={ans} handleVote={handleVote} />
                        <div style={{ width: "100%" }}>
                            <p className="answer-body">{HTMLReactParser(ans.answerBody)}</p>
                            <div className="question-actions-user">
                                <div>
                                    <button type="button" onClick={handleShare}>
                                        Share
                                    </button>
                                    {User?.result?._id === ans?.userId && (
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                    <Link
                                        to={`/Users/${ans.userId}`}
                                        className="user-link"
                                        style={{ color: "#0086d8" }}
                                    >
                                        <Avatar
                                            backgroundColor="lightgreen"
                                            px="8px"
                                            py="5px"
                                            borderRadius="4px"
                                        >
                                            {ans.userAnswered.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div>{ans.userAnswered}</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayAnswer;
