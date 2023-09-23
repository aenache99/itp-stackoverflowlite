import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { postAnswer, deleteQuestion, voteQuestion } from "../../actions/question";

const QuestionsDetails = () => {
    const { id } = useParams();
    const questionsList = useSelector((state) => state.questionsReducer);

    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUserReducer);
    const location = useLocation();
    const url = "http://localhost:3000";

    const handlePostAnswer = (e, answerLength) => {
        e.preventDefault();
        if (user === null) {
            alert("You need to login to answer a question.");
            navigate("/Auth");
        } else {
            if (answer === "") {
                alert("Enter an answer before submitting.");
            } else {
                dispatch(
                    postAnswer({
                        id,
                        noOfAnswers: answerLength + 1,
                        answerBody: answer,
                        userAnswered: user.result.name,
                    })
                );
                setAnswer("");
            }
        }
    };

    const handleShare = () => {
        copy(url + location.pathname);
        alert("Copied URL: " + url + location.pathname);
    };

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    };

    const handleVote = (value) => {
        if (user === null) {
            alert(`You need to login to ${value === "upVote" ? "upvote" : "downvote"} a question.`);
            navigate("/Auth");
        } else {
            dispatch(voteQuestion(id, value));
        }
    };

    const renderQuestion = () => {
        if (!questionsList.data) {
            return <h1>Loading...</h1>;
        }

        const question = questionsList.data.find((q) => q._id === id);

        if (!question) {
            return <h1>Question not found.</h1>;
        }

        return (
            <div key={question._id}>
                <section className="question-details-container">
                    <h1>{question.questionTitle}</h1>
                    <div className="question-details-container-2">
                        <div className="question-votes">
                            <img
                                src={upvote}
                                alt=""
                                width="18"
                                className="votes-icon"
                                onClick={() => handleVote("upVote")}
                            />
                            <p>{question.upVote.length - question.downVote.length}</p>
                            <img
                                src={downvote}
                                alt=""
                                width="18"
                                className="votes-icon"
                                onClick={() => handleVote("downVote")}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <p className="question-body">{question.questionBody}</p>
                            <div className="question-details-tags">
                                {question.questionTags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))}
                            </div>
                            <div className="question-actions-user">
                                <div>
                                    <button type="button" onClick={handleShare}>
                                        Share
                                    </button>
                                    {user?.result?._id === question?.userId && (
                                        <button type="button" onClick={handleDelete}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                    <Link
                                        to={`/Users/${question.userId}`}
                                        className="user-link"
                                        style={{ color: "#0086d8" }}
                                    >
                                        <Avatar
                                            backgroundColor="orange"
                                            px="8px"
                                            py="5px"
                                            borderRadius="4px"
                                        >
                                            {question.userPosted.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div>{question.userPosted}</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {question.noOfAnswers !== 0 && (
                    <section>
                        <h3>{question.noOfAnswers} Answers</h3>
                        <DisplayAnswer
                            key={question._id}
                            question={question}
                            handleShare={handleShare}
                        />
                    </section>
                )}
                <section className="post-ans-container">
                    <h3>Your Answer</h3>
                    <form onSubmit={(e) => handlePostAnswer(e, question.answer.length)}>
            <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
                        <br />
                        <input
                            type="submit"
                            className="post-ans-btn"
                            value="Post Your Answer"
                        />
                    </form>
                    <p>
                        Browse other questions tagged with
                        {question.questionTags.map((tag) => (
                            <Link to="/Tags" key={tag} className="ans-tags">
                                {" "}
                                {tag}{" "}
                            </Link>
                        ))}{" "}
                        or
                        <Link
                            to="/AskQuestion"
                            style={{ textDecoration: "none", color: "#009dff" }}
                        >
                            {" "}
                            ask your own question!
                        </Link>
                    </p>
                </section>
            </div>
        );
    };

    return <div className="question-details-page">{renderQuestion()}</div>;
};

export default QuestionsDetails;
