import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function SignupConfirmation(props) {
  const [showGift, setShowGift] = useState(false);

  const styles = {
    welcomeSection: {
      display: "flex",
      border: "1px solid #ddd",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#f8f8f8",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "normal",
      color: "#557D71",
      textAlign: "center",
      marginBottom: "50px",
      marginTop: "40px",
    },
    infoText: {
      fontSize: "16px",
      color: "#666",
      textAlign: "justify",
      lineHeight: "1.5",
      width: "65%",
      margin: "0 auto",
      marginBottom: "50px",
    },
    voucher: {
      width: "40%",
      height: "300px",
      margin: "0 auto",
      marginBottom: "50px",
      borderRadius: "10px",
    },
  };

  return (
    <div>
      <div style={styles.welcomeText}> Thank you for joining us!</div>
      <p style={styles.infoText}>
        Welcome to eGROCERY! We are thrilled to have you as a new member of our
        community. Thank you for signing up and choosing us as your go-to
        platform.
        <br />
        <br />
        Our goal is to provide you with the best experience possible, and we
        hope that you will find everything you need on our site. 
        As a new user, you can now enjoy all the benefits of being a part of
        eGROCERY. Experience the convenience of having your groceries delivered right to your doorstep with eGROCERY - get your items delivered very soon!
        <br />
        <br />
        If you have any questions or concerns, please don't hesitate to contact
        us. Our team is always here to help.
        <br />
        <br />
        We have got a small gift for you to get started which you can see by clicking on the gift icon below. Happy Shopping!
      </p>
      {showGift && (
        <div>
          <img
            src="https://img.freepik.com/free-vector/green-discount-voucher-with-yellow-triangles_1017-7588.jpg?w=2000"
            alt="Gift"
            style={styles.voucher}
          />
        </div>
      )}
      <div> {!showGift && ( <div>
      <FontAwesomeIcon
        icon={faGift}
        onClick={() => setShowGift(true)}
        style={{ fontSize: "80px", color: "557D71", marginBottom: "50px" }}
      /> </div> )} 
      </div> 
      <button
        className="btn btn-primary"
        style={{ marginBottom: "10px" }}
        onClick={() => props.setActiveComponent("Login")}
      >
         Login In
      </button>
    </div>
  );
}
