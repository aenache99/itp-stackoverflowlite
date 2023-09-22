import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: questionId } = req.params;
    const { answerBody, userAnswered } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) return res.status(404).send("Question unavailable...");

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(questionId, {
            $push: { answer: { answerBody, userAnswered, userId } },
            $inc: { noOfAnswers: 1 }
        }, { new: true });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: "Error in posting answer", error });
    }
};

export const deleteAnswer = async (req, res) => {
    const { id: questionId } = req.params;
    const { answerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(questionId)) return res.status(404).send("Question unavailable...");
    if (!mongoose.Types.ObjectId.isValid(answerId)) return res.status(404).send("Answer unavailable...");

    try {
        await Questions.updateOne(
            { _id: questionId },
            { $pull: { answer: { _id: answerId } }, $inc: { noOfAnswers: -1 } }
        );
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        res.status(405).json({ message: "Error in deleting answer", error });
    }
};

export const voteAnswer = async (req, res) => {
    const { id: _id, answerId } = req.params;
    const { value } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        const question = await Questions.findById(_id);
        if (!question) {
            return res.status(404).send("Question not found...");
        }

        const answer = question.answer.find(ans => ans._id.toString() === answerId);
        if (!answer) {
            return res.status(404).send("Answer not found...");
        }

        const upIndex = answer.upVote.findIndex((id) => id === String(userId));
        const downIndex = answer.downVote.findIndex((id) => id === String(userId));

        if (value === "upVote") {
            if (downIndex !== -1) {
                answer.downVote = answer.downVote.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                answer.upVote.push(userId);
            } else {
                answer.upVote = answer.upVote.filter((id) => id !== String(userId));
            }
        } else if (value === "downVote") {
            if (upIndex !== -1) {
                answer.upVote = answer.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                answer.downVote.push(userId);
            } else {
                answer.downVote = answer.downVote.filter((id) => id !== String(userId));
            }
        }

        await question.save();
        res.status(200).json({ message: "voted successfully on the answer..." });

    } catch (error) {
        console.error("Error while voting on answer:", error);  // Log the error for debugging
        res.status(500).json({ message: "Error voting on the answer..." });
    }
};

