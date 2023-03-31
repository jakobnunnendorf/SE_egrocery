import React, { useState } from 'react';
import './Signup.css';
import SignupForm from './SignupForm/SignupForm';
import SignupConfirmation from './SignupConfirmation/SignupConfirmation';

export default function Signup(props) {
    const [createdAccount, confirmAccountCreation] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createAccount();
    confirmAccountCreation(true);
    // Add your signup logic here, e.g. API call to create a new user
    //console.log('User registered:', { firstName, lastName, email, password });
  };

  return (
    <div className="signup">
        {createdAccount ? <SignupConfirmation createAccount={props.createAccount}/> : <SignupForm handleSubmit={handleSubmit}/>}
        <div>Have an account already?
            <button onClick={props.createAccount}>Log In</button>
        </div>
    </div>
  );
}
