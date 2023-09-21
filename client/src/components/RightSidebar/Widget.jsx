// Libraries
import React from "react";

// Assets & Styles
import "./RightSidebar.css"; // Renamed the CSS file for consistency
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";

const Widget = () => {
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
        </div>
    );
};

export default Widget;
