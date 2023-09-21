import React from "react";
import PropTypes from "prop-types";

const Avatar = ({
                    children,
                    backgroundColor,
                    px,
                    py,
                    color,
                    borderRadius,
                    fontSize,
                    cursor,
                }) => {
    const style = {
        backgroundColor,
        padding: `${py} ${px}`,
        color,
        borderRadius,
        fontSize,
        textAlign: "center",
        cursor,
        textDecoration: "none",
    };

    return <div style={style}>{children}</div>;
};

// Default props
Avatar.defaultProps = {
    color: "black",
    cursor: null
};

// PropTypes for prop validation
Avatar.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    px: PropTypes.string.isRequired,
    py: PropTypes.string.isRequired,
    color: PropTypes.string,
    borderRadius: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    cursor: PropTypes.string
};

export default Avatar;
