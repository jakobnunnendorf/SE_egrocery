import React from "react";

export default function SignupConfirmation(props) {
  const styles = {
    welcomeSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#f8f8f8",
      padding: "20px",
      margin: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "20px"
    },
    infoText: {
      fontSize: "16px",
      color: "#666",
      textAlign: "center",
      lineHeight: "1.5"
    }
  };
  
  return (
    <div>
    <div style={styles.welcomeText}> Thank you for joining us!
    </div>
      <p style={styles.infoText}>Welcome to eGROCERY! We are thrilled to have you as a new member of our community. Thank you for signing up and choosing us as your go-to platform.

Our goal is to provide you with the best experience possible, and we hope that you will find everything you need on our site. Please feel free to explore and discover all the amazing features we have to offer.

As a new user, you can now enjoy all the benefits of being a part of Egrcoety. You can connect with like-minded individuals, access our exclusive content, and much more.

If you have any questions or concerns, please don't hesitate to contact us. Our team is always here to help.

We look forward to seeing you around and hope you enjoy your experience with Egrcoety!

</p>
      <button
        className="btn btn-primary"
        onClick={() => props.setActiveComponent("Login")}
      >
        Go to Login
      </button>
    </div>
  );
}
