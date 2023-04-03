import React, { useState } from "react";
import SignupForm from "./SignupForm/SignupForm";
import SignupConfirmation from "./SignupConfirmation/SignupConfirmation";

export default function Signup(props) {
  const [createdAccount, confirmAccountCreation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log("User registered:", formData);
    props.createAccount(formData);
    confirmAccountCreation(true);
  };

  return (
    <div>
      {!createdAccount ? (
        <SignupForm
          handleSubmit={handleSubmit}
          setActiveComponent={props.setActiveComponent} />
      ) : (
        <SignupConfirmation
          createAccount={props.createAccount}
          setActiveComponent={props.setActiveComponent}
        />
      )}
    </div>
  );
}
