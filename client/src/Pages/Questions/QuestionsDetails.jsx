import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import {
    postAnswer,
    deleteQuestion,
    voteQuestion,
} from "../../actions/question";

const QuestionsDetails = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const questionsList = useSelector((state) => state.questionsReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const [answer, setAnswer] = useState("");

    const matchedQuestion = useMemo(
        () => questionsList.data?.find((question) => question._id === id),
        [id, questionsList.data]
    );

    const isLoggedIn = () => {
        if (!currentUser) {
            alert("You need to login.");
            Navigate("/Auth");
            return false;
        }
        return true;
    };

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (isLoggedIn() && answer.trim()) {
            dispatch(
                postAnswer({
                    id,
                    noOfAnswers: answerLength + 1,
                    answerBody: answer,
                    userAnswered: currentUser.result.name,
                })
            );
            setAnswer("");
        } else {
            alert("Enter an answer before submitting.");
        }
    };

    const handleVote = (type) => {
        isLoggedIn() && dispatch(voteQuestion(id, type));
    };

    const handleShare = () => {
        const fullPath = window.location.origin + location.pathname;
        copy(fullPath);
        alert("Copied URL: " + fullPath);
    };

    const handleDelete = () => {
        isLoggedIn() && dispatch(deleteQuestion(id, Navigate));
    };

    if (!matchedQuestion) return <h1>Loading...</h1>;

    return (
        <div className="question-details-page">
            <section className="question-details-container">
                <h1>{matchedQuestion.questionTitle}</h1>
                <div className="question-details-container-2">
                    <div className="question-votes">
                        <img
                            src={upvote}
                            alt="Upvote"
                            width="18"
                            className="votes-icon"
                            onClick={() => handleVote("upVote")}
                        />
                        <p>{matchedQuestion.upVote.length - matchedQuestion.downVote.length}</p>
                        <img
                            src={downvote}
                            alt="Downvote"
                            width="18"
                            className="votes-icon"
                            onClick={() => handleVote("downVote")}
                        />
                    </div>
                    <div style={{width: "100%"}}>
                        <p className="question-body">{matchedQuestion.questionBody}</p>
                        <div className="question-details-tags">
                            {matchedQuestion.questionTags.map((tag) => (
                                <p key={tag}>{tag}</p>
                            ))}
                        </div>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>
                                    Share
                                </button>
                                {currentUser?.result?._id === matchedQuestion?.userId && (
                                    <button type="button" onClick={handleDelete}>
                                        Delete
                                    </button>
                                )}
                            </div>
                            <div>
                                <p>asked {moment(matchedQuestion.askedOn).fromNow()}</p>
                                <Link
                                    to={`/Users/${matchedQuestion.userId}`}
                                    className="user-link"
                                    style={{color: "#0086d8"}}
                                >
                                    <Avatar
                                        backgroundColor="orange"
                                        px="8px"
                                        py="5px"
                                        borderRadius="4px"
                                    >
                                        {matchedQuestion.userPosted.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div>{matchedQuestion.userPosted}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {matchedQuestion.noOfAnswers !== 0 && (
                <section>
                    <h3>{matchedQuestion.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                        key={matchedQuestion._id}
                        question={matchedQuestion}
                        handleShare={handleShare}
                    />
                </section>
            )}
            <section className="post-ans-container">
                <h3>Your Answer</h3>
                <form
                    onSubmit={(e) => {
                        handlePostAns(e, matchedQuestion.answer.length);
                    }}
                >
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                    <br/>
                    <input
                        type="submit"
                        className="post-ans-btn"
                        value="Post Your Answer"
                    />
                </form>
                <p>
                    Browse other questions tagged with
                    {matchedQuestion.questionTags.map((tag, index) => (
                        <React.Fragment key={tag}>
                            <Link to="/Tags" className="ans-tags"> {tag} </Link>
                            {index !== matchedQuestion.questionTags.length - 1 && ", "}
                        </React.Fragment>
                    ))}
                    or
                    <Link
                        to="/AskQuestion"
                        style={{textDecoration: "none", color: "#009dff"}}
                    >
                        {" "} ask your own question!
                    </Link>
                </p>
            </section>
        </div>
    );
}
export default QuestionsDetails;