import React from 'react';
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";

const SidebarSection = ({ title, items }) => (
    <div>
        <h4>{title}</h4>
        <div className="right-sidebar-div-1">
            {items.map((item, idx) => (
                <SidebarItem key={idx} {...item} />
            ))}
        </div>
    </div>
);

const SidebarItem = ({ imgSrc, imgAlt = "icon", text, number }) => (
    <div className="right-sidebar-div-2">
        {imgSrc && <img src={imgSrc} alt={imgAlt} width="18" />}
        {number && <p>{number}</p>}
        <p>{text}</p>
    </div>
);

const WidgetTags = () => {
    const overflowBlogItems = [
        { imgSrc: pen, text: "Making the most of your one-on-one with your manager or other" },
        { imgSrc: pen, text: "ITP Podcast: Is Belgian beer proven to enhance web development?" }
    ];

    const featuredOnMetaItems = [
        { imgSrc: comment, text: "Building a StackOverflow clone with MERN - how to..." },
        { imgSrc: comment, text: "Please welcome our newest community moderators: Shog9, Robert" },
        { imgSrc: blackLogo, text: "Outdated Answers: accepted answer is now unpinned on Stack Overflow" }
    ];

    const hotMetaPostsItems = [
        { number: "357", text: "How to deal with a user who gives out consistently bad advice?" },
        { number: "200", text: "Has anyone ever been fired from Stack Overflow? If so, why, and how?" },
        { number: "140", text: "Is anyone else getting 'We are no longer accepting questions/answers from this account'?" }
    ];

    return (
        <div className="widget">
            <SidebarSection title="The Overflow Blog" items={overflowBlogItems} />
            <SidebarSection title="Featured on Meta" items={featuredOnMetaItems} />
            <SidebarSection title="Hot Meta Posts" items={hotMetaPostsItems} />
        </div>
    );
};

export default WidgetTags;
