import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

export const publishQuestion = async (req, res) => {
    const { userId } = req;
    const { questionFormValues } = req.body;

    try {
        // extract the values from questionFormValues
        const { title, body, tags } = questionFormValues;

        // Create a new question
        const question = new Question({
            title,
            body,
            tags,
            user: userId,
        });

        // Save the question to the database
        await question.save();

        await question.populate('user', 'username');

        // Send the question to the user
        return res.status(201).json({ question });

    } catch (error) {
        console.log("Error in Question Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const updateQuestion = async (req, res) => {
    const { userId } = req;
    const { questionFormValues, questionId } = req.body;

    try {
        // extract the values from questionFormValues
        const { title, body, tags } = questionFormValues;

        // Check if the question exists in the database
        const question = await Question.findById(questionId);

        // If the question doesn't exist, return an error message
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if the user is the owner of the question
        if (userId !== question.user.toString()) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // Update the question
        question.title = title;
        question.body = body;
        question.tags = tags;
        question.updatedAt = Date.now();

        // Save the question to the database
        await question.save();
        await question.populate('user', 'username');

        // Send the question to the user
        return res.status(200).json({ question });

    } catch (error) {
        console.log("Error in Question Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const getQuestions = async (req, res) => {
    try {
        // Get all the questions from the database
        const questions = await Question.find().populate('user', 'username');

        // Send the questions to the user
        return res.status(200).json({ questions });

    } catch (error) {
        console.log("Error in Question Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteQuestion = async (req, res) => {
    const { userId } = req;
    const { questionId } = req.query;

    try {
        // Check if the question exists in the database
        const question = await Question.findById(questionId);

        // If the question doesn't exist, return an error message
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Check if the user is the owner of the question
        if (userId !== question.user.toString()) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // Delete the question from the database
        await Question.findByIdAndDelete(questionId);
        // Delete the answers from the database
        await Answer.deleteMany({ question: questionId });

        // Send the question to the user
        return res.status(200).json({ questionId: questionId });
    } catch (error) {
        console.log("Error in Question Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}