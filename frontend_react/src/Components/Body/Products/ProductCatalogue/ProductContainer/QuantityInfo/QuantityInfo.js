import React from "react"

export default function QuantityInfo({quantity}) {
    const styles = {
        fontSize: "13px",
        color: "grey",
        marginTop: "0px",
        padding: "1px solid red",
        position: "relative", 
        textAlign: "left", 
        marginLeft: "10px"  
    };
    return (
        <div>
        <p style={styles}>{quantity > 5 ? `${quantity} in stock 🟢` : quantity > 1 ? `${quantity} in stock 🟡` : "out of stock 🟠"} </p>
        </div>
    );
    }