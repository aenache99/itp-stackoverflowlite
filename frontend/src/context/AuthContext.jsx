import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Default Provider Value
const defaultProviderValue = {
    userId: null,
    questions: [],
    answers: {
        question: {},
        answer: [],
    },
    tags: [],
    getQuestions: () => Promise.resolve(),
    getAllAnswers: () => Promise.resolve(),
    signin: () => Promise.resolve(),
    signout: () => Promise.resolve(),
    postQuestion: () => Promise.resolve(),
    postAnswer: () => Promise.resolve(),
    acceptAnswer: () => Promise.resolve(),
    deleteQuestion: () => Promise.resolve(),
    updateQuestion: () => Promise.resolve(),
    filterQuestions: () => Promise.resolve(),
}

// Creating Context
export const AuthContext = createContext(defaultProviderValue);

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({
        question: {},
        answer: [],
    });
    const [tags, setTags] = useState([]);
    const [allquestions, setAllQuestions] = useState([]);

    // Signin User
    const signin = async (username) => {
        try {
            const signinResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, { username });
            console.log(signinResponse.data);
            localStorage.setItem('userId', JSON.stringify(signinResponse.data.userId));
            setUserId(signinResponse.data.userId);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // Signout User
    const signout = async () => {
        try {
            localStorage.removeItem('userId');
            setUserId(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // Get all questions
    const getQuestions = async () => {
        try {
            const questionResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/questions`);
            console.log(questionResponse.data);
            setAllQuestions(questionResponse.data.questions);
            setTags(extractUniqueTags(questionResponse.data.questions));
            setQuestions(questionResponse.data.questions);
        } catch (error) {
            console.log(error);
        }
    }

    // Get all answers
    const getAllAnswers = async (questionId) => {
        try {
            const answerResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/answers?questionId=${questionId}`);
            console.log(answerResponse.data);
            setAnswers(answerResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Post an question
    const postQuestion = async (questionFormValues) => {
        try {
            const questionResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/publish-question`, { questionFormValues }, {
                headers: {
                    userid: userId
                }
            });
            console.log(questionResponse.data);
            setAllQuestions([...allquestions, questionResponse.data.question]);
            setQuestions([...questions, questionResponse.data.question]);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // Post an answer
    const postAnswer = async (answerFormValues) => {
        try {
            const answerResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/publish-answer`, { answerFormValues }, {
                headers: {
                    userid: userId
                }
            });
            console.log(answerResponse.data);
            setAnswers({
                question: answers.question,
                answer: [...answers.answer, answerResponse.data.answer]
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Accept an answer
    const acceptAnswer = async (questionId, answerId) => {
        try {
            const acceptAnswerResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/accept-answer`, { questionId, answerId }, {
                headers: {
                    userid: userId
                }
            });
            console.log(acceptAnswerResponse.data);
            setAnswers((prevState) => {
                return {
                    ...prevState,
                    question: {
                        ...prevState.question,
                        acceptedAnswer: acceptAnswerResponse.data.acceptedAnswerId
                    },
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Delete an question
    const deleteQuestion = async (questionId) => {
        try {
            const deleteQuestionResponse = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/delete-question?questionId=${questionId}`, {
                headers: {
                    userid: userId
                }
            });
            console.log(deleteQuestionResponse.data);
            setQuestions(questions.filter((item) => item._id !== questionId));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // gwt all tags
    const extractUniqueTags = (questions) => {
        const allTags = [];

        // Iterate through the questions and collect all tags
        questions.forEach((question) => {
            allTags.push(...question.tags);
        });

        // Use a Set to eliminate duplicates and then convert it back to an array
        const uniqueTags = [...new Set(allTags)];

        return uniqueTags;
    }

    // update an question
    const updateQuestion = async (questionFormValues, questionId) => {
        try {
            const updateQuestionResponse = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/update-question`, { questionFormValues, questionId }, {
                headers: {
                    userid: userId
                }
            });
            console.log(updateQuestionResponse.data);
            setAllQuestions(allquestions.map((item) => item._id === questionId ? updateQuestionResponse.data.question : item));
            setQuestions(questions.map((item) => item._id === questionId ? updateQuestionResponse.data.question : item));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // filter questions
    const filterQuestions = (filter) => {
        console.log("filter", filter);
        if (filter !== '') {
            setQuestions(allquestions.filter((question) => question.tags.includes(filter)));
        } else {
            setQuestions(allquestions);
        }

    }

    // Init Auth
    const initAuth = async () => {
        // Get user id from local storage
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log("userId", userId);
        // If userId is not available in local storage then redirect to home page
        if (!userId) {
            setUserId(null);
        } else {
            setUserId(userId);
        }
    }

    useEffect(() => {
        initAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ** Provider Values
    const values = {
        userId,
        questions,
        answers,
        getQuestions,
        getAllAnswers,
        signin,
        signout,
        postQuestion,
        postAnswer,
        acceptAnswer,
        deleteQuestion,
        updateQuestion,
        tags,
        filterQuestions,
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}