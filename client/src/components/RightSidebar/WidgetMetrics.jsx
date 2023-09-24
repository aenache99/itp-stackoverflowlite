import React, { useState, useEffect } from "react";
import axios from "axios";

const WidgetMetrics = () => {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get("/metrics");
                setMetrics(response.data);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };
        fetchMetrics();
    }, []);

    const numberToDay = (num) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[num-1] || "Invalid day";
    };


    const metricItems = metrics && [
        {
            text: `Popular Day of the Week: ${typeof metrics.popularDay[0]._id === 'string' ?
                metrics.popularDay[0]._id :
                numberToDay(metrics.popularDay[0]._id)}`
        },
        {
            text: `Avg Questions/User: ${typeof metrics.avgMetrics.avgQuestionsPerUser === 'string' ?
                metrics.avgMetrics.avgQuestionsPerUser :
                metrics.avgMetrics.avgQuestionsPerUser.toFixed(2)}`
        },
        {
            text: `Avg Votes/User: ${typeof metrics.avgMetrics.avgVotesPerUser === 'string' ?
                metrics.avgMetrics.avgVotesPerUser :
                metrics.avgMetrics.avgVotesPerUser.toFixed(2)}`
        },
        {
            text: `Avg Answers/User: ${typeof metrics.avgMetrics.avgAnswersPerUser === 'string' ?
                metrics.avgMetrics.avgAnswersPerUser :
                metrics.avgMetrics.avgAnswersPerUser.toFixed(2)}`
        },
        {
            text: `Total Questions: ${typeof metrics.totalMetrics.totalQuestions === 'string' ?
                metrics.totalMetrics.totalQuestions :
                metrics.totalMetrics.totalQuestions}`
        },
        {
            text: `Total Upvotes: ${typeof metrics.totalMetrics.totalUpvotes === 'string' ?
                metrics.totalMetrics.totalUpvotes :
                metrics.totalMetrics.totalUpvotes}`
        },
        {
            text: `Total Downvotes: ${typeof metrics.totalMetrics.totalDownvotes === 'string' ?
                metrics.totalMetrics.totalDownvotes :
                metrics.totalMetrics.totalDownvotes}`
        },
        {
            text: `Total Answers: ${typeof metrics.totalMetrics.totalAnswers === 'string' ?
                metrics.totalMetrics.totalAnswers :
                metrics.totalMetrics.totalAnswers}`
        }
    ];

    return (
        <div className="widget">
            <h4>Stats of the site</h4>
            <div className="right-sidebar-div-1">
                {metricItems ? metricItems.map((item, idx) => (
                    <div key={idx} className="right-sidebar-div-2">
                        <p>{item.text}</p>
                    </div>
                )) : <p>Loading stats...</p>}
            </div>
        </div>
    );
};

export default WidgetMetrics;
