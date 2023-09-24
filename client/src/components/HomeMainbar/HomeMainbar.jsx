import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import QuestionList from "./QuestionList";
import "./HomeMainbar.css";

const HomeMainbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [popularQuestions, setPopularQuestions] = useState([]);

    const { data: questionsData } = useSelector((state) => state.questionsReducer);

    const user = 1; // Placeholder for user authentication

    useEffect(() => {
        if (pathname === "/") {
            // Fetch the most popular questions
            axios.get("http://localhost:5000/questions/popular")
                .then(response => {
                    setPopularQuestions(response.data);
                })
                .catch(error => {
                    console.error("Error fetching popular questions:", error);
                });
        }
    }, [pathname]);

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
        if (pathname === "/") {
            return (
                <>
                    <p>{popularQuestions.length} questions</p>
                    <QuestionList questionsList={popularQuestions} />
                </>
            );
        } else {
            if (!questionsData) return <h1>Loading...</h1>;
            return (
                <>
                    <p>{questionsData.length} questions</p>
                    <QuestionList questionsList={questionsData} />
                </>
            );
        }
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