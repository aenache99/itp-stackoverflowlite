const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    upvoteQuestion,
    downvoteQuestion
} = require('../controllers/questionController');

router.route('/')
    .get(getQuestions)
    .post(createQuestion);

router.route('/:id')
    .get(getQuestion)
    .put(updateQuestion)
    .delete(deleteQuestion);

router.route('/:id/upvote')
    .put(upvoteQuestion);

router.route('/:id/downvote')
    .put(downvoteQuestion);

module.exports = router;
