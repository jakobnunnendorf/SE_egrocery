import React from "react"

export default function Title({ title }) {
    const styles = {
        // border: "2px solid #e1e4e8",
        position: "relative",
        fontSize: "19px",
        fontWeight: "550",
        fontFamily: "sans-serif",
        width: "97%",
        height: "95px",
        marginBottom: "5px",
        marginTop: "21px",
        textAlign: "left", 
        marginLeft: "10px",
        textTransform: "capitalize",
        letterSpacing: "0.15px",
        lineHeight: "1.0",
        color: "#444C4F",
        wordWrap: "break-word",
        textOverflow: "ellipsis"
      };
    return <div style={styles}>{title}</div>;
}