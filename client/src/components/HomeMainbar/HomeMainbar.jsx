// Libraries
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components & Styles
import QuestionList from "./QuestionList";
import "./HomeMainbar.css";

const HomeMainbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { data: questionsData } = useSelector((state) => state.questionsReducer);

    const user = 1; // Placeholder for user authentication

    const checkAuth = () => {
        if (!user) {
            alert("You need to login to ask a question.");
            navigate("/Auth");
        } else {
            navigate("/AskQuestion");
        }
    };

    const renderHeaderTitle = () => pathname === "/" ? "Most Popular Questions" : "All Questions";
    const renderQuestionsContent = () => {
        if (!questionsData) return <h1>Loading...</h1>;

        return (
            <>
                <p>{questionsData.length} questions</p>
                <QuestionList questionsList={questionsData} />
            </>
        );
    };

    return (
        <div className="main-bar">
            <div className="main-bar-header">
                <h1>{renderHeaderTitle()}</h1>
                <button onClick={checkAuth} className="ask-btn">
                    Ask Question
                </button>
            </div>
            <div className="questions-content">
                {renderQuestionsContent()}
            </div>
        </div>
    );
};

export default HomeMainbar;
