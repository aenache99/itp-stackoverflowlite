import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    updateNoOfQuestions(_id, noOfAnswers);
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
            $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
        });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json("error in updating");
    }
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, {
            $set: { noOfAnswers: noOfAnswers },
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        );
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        res.status(405).json(error);
    }
};
export const voteAnswer = async (req, res) => {
    const { questionId, answerId, value } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        const question = await Questions.findById(questionId);
        if (!question) {
            return res.status(404).send("Question not found...");
        }

        // Find the answer within the question's answers
        const answer = question.answer.id(answerId);
        if (!answer) {
            return res.status(404).send("Answer not found...");
        }

        // Check if user already upvoted or downvoted
        const hasUpvoted = answer.upVote.includes(String(userId));
        const hasDownvoted = answer.downVote.includes(String(userId));

        // Process the upvote
        if (value === "upVote") {
            if (hasUpvoted) {
                answer.upVote.pull(userId); // Remove upvote if already upvoted
            } else {
                answer.upVote.push(userId); // Add upvote if not upvoted
                if (hasDownvoted) {
                    answer.downVote.pull(userId); // Remove downvote if user changes mind
                }
            }
        }
        // Process the downvote
        else if (value === "downVote") {
            if (hasDownvoted) {
                answer.downVote.pull(userId); // Remove downvote if already downvoted
            } else {
                answer.downVote.push(userId); // Add downvote if not downvoted
                if (hasUpvoted) {
                    answer.upVote.pull(userId); // Remove upvote if user changes mind
                }
            }
        }

        // Save the modified question document
        await question.save();
        res.status(200).json({ message: "voted successfully on the answer..." });

    } catch (error) {
        console.error("Error while voting:", error);  // Log the error
        res.status(404).json({ message: "voting failed for the answer..." });
    }
};


