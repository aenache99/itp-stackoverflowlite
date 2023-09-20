import Answer from "../models/Answer.js";
import Question from "../models/Question.js";


export const publishAnswer = async (req, res) => {
    const { userId } = req;
    const { answerFormValues } = req.body;

    try {
        // extract the values from answerFormValues
        const { body, questionId } = answerFormValues;

        // Check if the question exists in the database
        const question = await Question.findById(questionId);

        // If the question doesn't exist, return an error message
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Create a new answer
        const answer = new Answer({
            body,
            question: questionId, // Associate the answer with the question
            user: userId, // Associate the answer with the user
        });

        // Save the answer to the database
        await answer.save();

        // Update the question's answers field to include the new answer
        question.answers.push(answer._id);
        await question.save();

        await answer.populate('user', 'username');

        // Send the answer to the user
        return res.status(201).json({ answer });

    } catch (error) {
        console.log("Error in Answer Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const acceptAnswer = async (req, res) => {
    const { userId } = req;
    const { questionId, answerId } = req.body;

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

        // Find the answer by its ID
        const answer = await Answer.findById(answerId);

        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        // Mark the answer as accepted
        question.acceptedAnswer = answerId;
        await question.save();

        // Send the answer to the user
        return res.status(200).json({ acceptedAnswerId: answerId });

    } catch (error) {
        console.log("Error in Answer Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}

export const getAnswers = async (req, res) => {
    const { questionId } = req.query;

    try {
        // get the question by its ID
        const question = await Question.findById(questionId).populate('user', 'username').exec();

        // Get all answers from the database by questionId
        const answer = await Answer.find({ question: questionId }).populate('user', 'username').exec();

        // Send the answer to the user
        return res.status(200).json({ question, answer });

    } catch (error) {
        console.log("Error in Answer Controller: ", error)
        // If there is an error, return an error message
        return res.status(500).json({ message: 'Server Error' });
    }
}