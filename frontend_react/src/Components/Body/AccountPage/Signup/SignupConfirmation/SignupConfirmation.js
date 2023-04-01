import React from "react";

export default function SignupConfirmation(props) {
  return (
    <div>
      <p>Thank you for signing up!</p>
      <button
        className="btn btn-primary"
        onClick={() => props.setActiveComponent("Login")}
      >
        Go to Login
      </button>
    </div>
  );
}
