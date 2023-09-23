import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [questionTags, setQuestionTags] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();

    const isFormComplete = () => questionTitle && questionBody && questionTags;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("You need to login to ask a question.");
            return;
        }

        if (isFormComplete()) {
            dispatchAskQuestion();
        } else {
            alert("Please enter all the fields.");
        }
    };

    const dispatchAskQuestion = () => {
        dispatch(
            askQuestion({
                questionTitle,
                questionBody,
                questionTags,
                userPosted: user.result.name,
            }, navigate)
        );
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setQuestionBody(prevBody => prevBody + "\n");
        }
    };

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <QuestionInput label="Title" placeholder="e.g. How to count the number of objects in a JavaScript array?" value={questionTitle} setValue={setQuestionTitle} />
                    <QuestionTextarea label="Body" placeholder="" value={questionBody} setValue={setQuestionBody} handleEnter={handleEnter} />
                    <QuestionInput label="Tags" placeholder="e.g. (xml typescript wordpress)" value={questionTags.join(' ')} setValue={(value) => setQuestionTags(value.split(" "))} />
                    <input type="submit" value="Post Question" className="review-btn" />
                </form>
            </div>
        </div>
    );
};

const QuestionInput = ({ label, placeholder, value, setValue }) => (
    <label>
        <h4>{label}</h4>
        <p>Description</p>
        <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            value={value}
        />
    </label>
);

const QuestionTextarea = ({ label, value, setValue, handleEnter }) => (
    <label>
        <h4>{label}</h4>
        <p>Description</p>
        <textarea
            onChange={(e) => setValue(e.target.value)}
            cols="30"
            rows="10"
            onKeyPress={handleEnter}
            value={value}
        ></textarea>
    </label>
);

export default AskQuestion;
