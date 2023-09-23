import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer, voteAnswer } from "../../actions/question";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";

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

const ActionButtons = ({ ans, handleShare, handleDelete, User }) => (
    <div>
        <button type="button" onClick={handleShare}>
            Share
        </button>
        {User?.result?._id === ans?.userId && (
            <button
                type="button"
                onClick={() => handleDelete(ans._id, ans.noOfAnswers)}
            >
                Delete
            </button>
        )}
    </div>
);

const UserDetails = ({ ans }) => (
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
);

const Answer = ({
                    ans,
                    handleShare,
                    handleDelete,
                    handleVote,
                    User,
                }) => (
    <div className="display-ans" key={ans._id}>
        <div className="question-details-container-2">
            <VotingButtons ans={ans} handleVote={handleVote} />
            <div style={{ width: "100%" }}>
                <p className="answer-body">{ans.answerBody}</p>
                <div className="question-actions-user">
                    <ActionButtons ans={ans} handleShare={handleShare} handleDelete={handleDelete} User={User} />
                    <UserDetails ans={ans} />
                </div>
            </div>
        </div>
    </div>
);

const useVoteHandler = (id, User) => {
    const dispatch = useDispatch();
    return (answerId, value) => {
        if (!User) {
            alert(`You need to login to ${value === "upVote" ? "upvote" : "downvote"} an answer.`);
        } else {
            dispatch(voteAnswer(id, answerId, value));
        }
    };
};

const useDeleteHandler = (id) => {
    const dispatch = useDispatch();
    return (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    };
};

const DisplayAnswer = ({ question, handleShare }) => {
    const User = useSelector((state) => state.currentUserReducer);
    const { id } = useParams();
    const handleVote = useVoteHandler(id, User);
    const handleDelete = useDeleteHandler(id);

    return (
        <div>
            {question.answer.map((ans) => (
                <Answer
                    ans={ans}
                    handleShare={handleShare}
                    handleDelete={handleDelete}
                    handleVote={handleVote}
                    User={User}
                    key={ans._id}
                />
            ))}
        </div>
    );
};

export default DisplayAnswer;
