import React from "react";

const WidgetTags = () => {
    const tags = [
        "cplusplus",
        "css",
        "express.js",
        "firebase",
        "html",
        "java",
        "javascript",
        "mern",
        "mongodb",
        "mysql",
        "gcp",
        "node.js",
        "ai",
        "python",
        "react.js",
    ];

    return (
        <div className="widget-tags">
            <h4>Watched tags</h4>
            <div className="widget-tags-div">
                {tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                ))}
            </div>
        </div>
    );
};

export default WidgetTags;
