import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
    const [formData, setFormData] = useState({
        questionTitle: "",
        questionBody: "",
        questionTags: "",
    });

    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (User) {
            const { questionTitle, questionBody, questionTags } = formData;
            if (questionTitle && questionBody && questionTags) {
                dispatch(
                    askQuestion(
                        {
                            ...formData,
                            userPosted: User.result.name,
                            questionTags: questionTags.split(" "),
                        },
                        navigate
                    )
                );
            } else {
                alert("Please enter all the fields.");
            }
        } else {
            alert("You need to login to ask a question.");
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setFormData({
                ...formData,
                questionBody: formData.questionBody + "\n",
            });
        }
    };

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you’re asking a question to another person:</p>
                            <input
                                type="text"
                                id="ask-ques-title"
                                name="questionTitle"
                                value={formData.questionTitle}
                                onChange={handleChange}
                                placeholder="e.g. How to count the number of objects in a JavaScript array?"
                            />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question:</p>
                            <textarea
                                name="questionBody"
                                id="ask-ques-body"
                                value={formData.questionBody}
                                onChange={handleChange}
                                cols="30"
                                rows="10"
                                onKeyPress={handleEnter}
                            ></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about:</p>
                            <input
                                type="text"
                                id="ask-ques-tags"
                                name="questionTags"
                                value={formData.questionTags}
                                onChange={handleChange}
                                placeholder="e.g. (xml typescript wordpress)"
                            />
                        </label>
                    </div>
                    <input type="submit" value="Post Question" className="review-btn" />
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;
