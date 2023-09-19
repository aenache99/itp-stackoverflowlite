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

// Get single question
exports.getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id).populate('author');
        if(!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Create a new question
exports.createQuestion = async (req, res, next) => {
    try {
        const question = await Question.create({ ...req.body, author: req.user._id });
        res.status(201).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a question
exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a question
exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if(!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Upvote a question
exports.upvoteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }
        question.votes += 1;
        await question.save();
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Downvote a question
exports.downvoteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }
        question.votes -= 1;
        await question.save();
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

