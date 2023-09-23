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

    const metricItems = metrics && [
        { text: `Popular Day of the Week: ${metrics.popularDay[0]._id}` },
        { text: `Avg Questions/User: ${metrics.avgMetrics.avgQuestionsPerUser.toFixed(2)}` },
        { text: `Avg Votes/User: ${metrics.avgMetrics.avgVotesPerUser.toFixed(2)}` },
        { text: `Avg Answers/User: ${metrics.avgMetrics.avgAnswersPerUser.toFixed(2)}` },
        { text: `Total Questions: ${metrics.totalMetrics.totalQuestions}` },
        { text: `Total Upvotes: ${metrics.totalMetrics.totalUpvotes}` },
        { text: `Total Downvotes: ${metrics.totalMetrics.totalDownvotes}` },
        { text: `Total Answers: ${metrics.totalMetrics.totalAnswers}` }
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
