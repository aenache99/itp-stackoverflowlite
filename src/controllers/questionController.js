const Question = require('../models/Question');

// Get all questions
exports.getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find().populate('author');
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// ... (similar functions for getQuestion, createQuestion, updateQuestion, deleteQuestion, upvoteQuestion, downvoteQuestion)

