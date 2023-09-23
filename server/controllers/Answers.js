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

    if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Invalid question or answer ID");
    }

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
    const { id: questionId, answerId } = req.params;
    const { value } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(404).send("Question unavailable...");
    }

    const update = {};

    if (value === "upVote") {
        update.$addToSet = { "answer.$[ans].upVote": userId };
        update.$pull = { "answer.$[ans].downVote": userId };
    } else if (value === "downVote") {
        update.$addToSet = { "answer.$[ans].downVote": userId };
        update.$pull = { "answer.$[ans].upVote": userId };
    } else {
        return res.status(400).send("Invalid vote type");
    }

    try {
        await Questions.updateOne({ _id: questionId }, update, {
            arrayFilters: [{ "ans._id": answerId }]
        });

        res.status(200).json({ message: "Voted successfully on the answer..." });
    } catch (error) {
        console.error("Error while voting on answer:", error);
        res.status(500).json({ message: "Error voting on the answer..." });
    }
};
