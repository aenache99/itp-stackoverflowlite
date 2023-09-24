import * as api from "../api/index";

// Generic action creator function
const createAsyncAction = (apiFunction, successType) => async (dispatch, ...params) => {
    try {
        const { data } = await apiFunction(...params);
        dispatch({ type: successType, payload: data });
        dispatch(fetchAllQuestions());
    } catch (error) {
        console.log(error);
    }
};

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    await createAsyncAction(api.postQuestion, "POST_QUESTION")(dispatch, questionData);
    navigate("/");
};

export const fetchAllQuestions = () => createAsyncAction(api.getAllQuestions, "FETCH_ALL_QUESTIONS");

export const deleteQuestion = (id, navigate) => async (dispatch) => {
    await createAsyncAction(api.deleteQuestion, "DELETE_QUESTION")(dispatch, id);
    navigate("/");
};

export const voteQuestion = (id, value) => async (dispatch) => {
    await createAsyncAction(api.voteQuestion, "VOTE_QUESTION")(dispatch, id, value);
};

export const postAnswer = (answerData) => async (dispatch) => {
    const { id, noOfAnswers, answerBody, userAnswered } = answerData;
    await createAsyncAction(api.postAnswer, "POST_ANSWER")(dispatch, id, noOfAnswers, answerBody, userAnswered);
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    await createAsyncAction(api.deleteAnswer, "DELETE_ANSWER")(dispatch, id, answerId, noOfAnswers);
};

export const voteAnswer = (answerId, value) => async (dispatch) => {
    console.log('Voting with id:', answerId);
    console.log('Voting with value:', value);
    await createAsyncAction(api.voteAnswer, "VOTE_ANSWER")(dispatch, answerId, value);
};
