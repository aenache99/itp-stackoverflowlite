import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";

const Widget = () => {
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
        return days[num];
    };

    return (
        <div className="widget">
            <h4>The Overflow Blog</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" width="18" />
                    <p>
                        Making the most of your one-on-one with your manager or other
                    </p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" width="18" />
                    <p>ITP Podcast: Is Belgian beer proven to enhance web development?</p>
                </div>
            </div>
            <h4>Featured on Meta</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={comment} alt="pen" width="18" />
                    <p>Building a StackOverflow clone with MERN - how to...</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={comment} alt="pen" width="18" />
                    <p>
                        Please welcome our newest community moderators: Shog9, Robert
                    </p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={blackLogo} alt="pen" width="18" />
                    <p>
                        Outdated Answers: accepted answer is now unpinned on Stack Overflow
                    </p>
                </div>
            </div>
            <h4>Hot Meta Posts</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <p>357</p>
                    <p>
                        How to deal with a user who gives out consistently bad advice?
                    </p>
                </div>
                <div className="right-sidebar-div-2">
                    <p>200</p>
                    <p>
                        Has anyone ever been fired from Stack Overflow? If so, why, and how?
                    </p>
                </div>
                <div className="right-sidebar-div-2">
                    <p>140</p>
                    <p>
                        Is anyone else getting "We are no longer accepting questions/answers from this account"?
                    </p>
                </div>
            </div>
            <h4>Stats of the site</h4>
            {metrics ? (
                <div className="right-sidebar-div-1">
                    <div className="right-sidebar-div-2">
                        <p>Popular Day of the Week:</p>
                        <p>{numberToDay(metrics.popularDay[0]._id)}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Avg Questions/User:</p>
                        <p>{metrics.avgMetrics.avgQuestionsPerUser.toFixed(2)}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Avg Votes/User:</p>
                        <p>{metrics.avgMetrics.avgVotesPerUser.toFixed(2)}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Avg Answers/User:</p>
                        <p>{metrics.avgMetrics.avgAnswersPerUser.toFixed(2)}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Total Questions:</p>
                        <p>{metrics.totalMetrics.totalQuestions}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Total Upvotes:</p>
                        <p>{metrics.totalMetrics.totalUpvotes}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Total Downvotes:</p>
                        <p>{metrics.totalMetrics.totalDownvotes}</p>
                    </div>
                    <div className="right-sidebar-div-2">
                        <p>Total Answers:</p>
                        <p>{metrics.totalMetrics.totalAnswers}</p>
                    </div>
                </div>
            ) : (
                <p>Loading stats...</p>
            )}
        </div>
    );
};

export default Widget;
