import Questions from "../models/Questions.js";
import mongoose from "mongoose";

export const AskQuestion = async (req, res) => {
    try {
        const postQuestion = new Questions({ ...req.body, userId: req.userId });
        await postQuestion.save();
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find().sort({ askedOn: -1 });
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPopularQuestions = async (req, res) => {
    try {
        const popularQuestions = await Questions.find().sort({ noOfAnswers: -1 }).limit(10);
        res.status(200).json(popularQuestions);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({ message: "successfully deleted..." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    const update = {};

    if (value === "upVote") {
        update.$addToSet = { upVote: userId };
        update.$pull = { downVote: userId };
    } else if (value === "downVote") {
        update.$addToSet = { downVote: userId };
        update.$pull = { upVote: userId };
    } else {
        return res.status(400).send("Invalid vote type");
    }

    try {
        await Questions.findByIdAndUpdate(_id, update);
        res.status(200).json({ message: "voted successfully..." });
    } catch (error) {
        res.status(404).json({ message: "id not found" });
    }
};
