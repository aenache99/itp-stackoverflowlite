import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
    const [question, setQuestion] = useState({
        title: "",
        body: "",
        tags: [],
    });

    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert("You need to login to ask a question.");
            return;
        }

        const { title, body, tags } = question;
        if (title && body && tags.length) {
            dispatch(askQuestion({ ...question, userPosted: user.result.name }, navigate));
        } else {
            alert("Please enter all the fields.");
        }
    };

    const handleChange = (field, value) => {
        setQuestion((prev) => ({ ...prev, [field]: value }));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleChange('body', question.body + "\n");
        }
    };

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a public Question</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Title"
                        instruction="Be specific and imagine you’re asking a question to another person:"
                        placeholder="e.g. How to count the number of objects in a JavaScript array?"
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                    <TextAreaField
                        label="Body"
                        instruction="Include all the information someone would need to answer your question:"
                        onKeyPress={handleKeyPress}
                        onChange={(e) => handleChange('body', e.target.value)}
                    />
                    <InputField
                        label="Tags"
                        instruction="Add up to 5 tags to describe what your question is about:"
                        placeholder="e.g. (xml typescript wordpress)"
                        onChange={(e) => handleChange('tags', e.target.value.split(" "))}
                    />
                    <input type="submit" value="Post Question" className="review-btn" />
                </form>
            </div>
        </div>
    );
};

const InputField = ({ label, instruction, placeholder, onChange }) => (
    <label>
        <h4>{label}</h4>
        <p>{instruction}</p>
        <input type="text" placeholder={placeholder} onChange={onChange} />
    </label>
);

const TextAreaField = ({ label, instruction, onChange, onKeyPress }) => (
    <label>
        <h4>{label}</h4>
        <p>{instruction}</p>
        <textarea cols="30" rows="10" onChange={onChange} onKeyPress={onKeyPress}></textarea>
    </label>
);

export default AskQuestion;
