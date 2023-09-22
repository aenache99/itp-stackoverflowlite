//import mongoose from "mongoose";
import Question from "../models/Questions.js";

export const getMetrics = async (req, res, next) => {
    try {
        // 1. Most popular day of the week
        const popularDay = await Question.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$askedOn" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        // 2. Average votes, questions, and answers per user
        const avgMetricsResults = await Question.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalQuestionsByUser: { $sum: 1 },
                    avgUpvotes: { $avg: { $size: "$upVote" } },
                    avgDownvotes: { $avg: { $size: "$downVote" } },
                    avgAnswers: { $avg: { $size: "$answer" } }
                }
            }
        ]);

        const totalUsers = avgMetricsResults.length;
        const totalQuestionsByUsers = avgMetricsResults.reduce((acc, curr) => acc + curr.totalQuestionsByUser, 0);
        const avgQuestionsPerUser = totalQuestionsByUsers / totalUsers;

        const avgVotesPerUser = avgMetricsResults.reduce((acc, curr) => acc + curr.avgUpvotes + curr.avgDownvotes, 0) / totalUsers;
        const avgAnswersPerUser = avgMetricsResults.reduce((acc, curr) => acc + curr.avgAnswers, 0) / totalUsers;

        // 3. Total questions, votes, and answers
        const totalMetrics = await Question.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuestions: { $sum: 1 },
                    totalUpvotes: { $sum: { $size: "$upVote" } },
                    totalDownvotes: { $sum: { $size: "$downVote" } },
                    totalAnswers: { $sum: { $size: "$answer" } }
                }
            }
        ]);

        res.status(200).send({
            popularDay,
            avgMetrics: {
                avgQuestionsPerUser,
                avgVotesPerUser,
                avgAnswersPerUser
            },
            totalMetrics: totalMetrics[0]
        });
    } catch (error) {
        next(error);
    }
};

