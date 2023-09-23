import * as api from "../api/index";

// Ask a question
export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData);
        dispatch({ type: "POST_QUESTION", payload: data });
        navigate("/");
    } catch (error) {
        console.error("Failed to post question:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Fetch all questions
export const fetchAllQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.getAllQuestions();
        dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
    } catch (error) {
        console.error("Failed to fetch all questions:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Fetch popular questions
export const fetchPopularQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPopularQuestions();
        dispatch({ type: "FETCH_POPULAR", payload: data });
    } catch (error) {
        console.error("Failed to fetch popular questions:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Delete a question
export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        await api.deleteQuestion(id);
        dispatch({ type: "DELETE_QUESTION", payload: id });
        navigate("/");
    } catch (error) {
        console.error("Failed to delete question:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Vote on a question
export const voteQuestion = (id, value) => async (dispatch) => {
    try {
        const { data } = await api.voteQuestion(id, value);
        dispatch({ type: "UPDATE_QUESTION", payload: data });
    } catch (error) {
        console.error("Failed to vote on question:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Post an answer
export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { data } = await api.postAnswer(answerData);
        dispatch({ type: "POST_ANSWER", payload: data });
    } catch (error) {
        console.error("Failed to post answer:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Delete an answer
export const deleteAnswer = (id, answerId) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(id, answerId);
        dispatch({ type: "DELETE_ANSWER", payload: { id, answerId, ...data } });
    } catch (error) {
        console.error("Failed to delete answer:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};

// Vote on an answer
export const voteAnswer = (questionId, answerId, value) => async (dispatch) => {
    try {
        const { data } = await api.voteAnswer(questionId, answerId, value);
        dispatch({ type: "UPDATE_ANSWER", payload: data });
    } catch (error) {
        console.error("Failed to vote on answer:", error);
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};
