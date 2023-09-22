import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Questions = ({ question }) => {
    const netVotes = question.upVote.length - question.downVote.length;

    const truncateTitle = (title) => {
        const maxLength = window.innerWidth <= 400 ? 70 : 90;
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + "...";
        }
        return title;
    };


    return (
        <div className="display-question-container">
            <div className="display-votes-ans">
                <p>{netVotes}</p>
                <p>votes</p>
            </div>
            <div className="display-votes-ans">
                <p>{question.noOfAnswers}</p>
                <p>answers</p>
            </div>
            <div className="display-question-details">
                <Link to={`/Questions/${question._id}`} className="question-title-link">
                    {truncateTitle(question.questionTitle)}
                </Link>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {question.questionTags.map((tag) => (
                            <p key={tag}>{tag}</p>
                        ))}
                    </div>
                    <p className="display-time">
                        asked {moment(question.askedOn).fromNow()} by {question.userPosted}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Questions;
