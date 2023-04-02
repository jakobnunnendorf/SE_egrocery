import React, { useEffect, useState } from 'react'
import userDataBase from './mockUserData'

export default function AccountBackendEmulator(props) {
  const [userBase, setUserBase] = useState(userDataBase);

  //fetches the userDataBase from mockDatabase and passes it to the account page
  useEffect(() => {
    console.log('user database fetched:', userDataBase)
    props.fetchUserBase(userBase);
  }, [])

  // when a newUser is created the newUser prop changes which triggers this useEffect to first add the
  // new user to the userBase and then pass the userBase to the account page
useEffect(() => {
  // Check if props.newUser is an empty object
  if (Object.keys(props.newUser).length !== 0) {
    console.log("new user added to the database:", props.newUser);
    setUserBase([...userBase, props.newUser]);
    props.addUser(props.newUser);
  }
}, [props.newUser]);

  // when a login attempt is made the loginAttempt prop changes which triggers this useEffect to
  // check if the login attempt is valid
useEffect(() => {
  // Check if props.loginAttempt is an empty object
  if (Object.keys(props.loginAttempt).length !== 0) {
    console.log("login attempt:", props.loginAttempt);

    const matchedUser = userBase.find((user) => {
      // assigns true or false if the login attempt corresponds to some user in the database
      return (
        user.email === props.loginAttempt.email &&
        user.password === props.loginAttempt.password
      );
    });

    if (matchedUser) {
      props.loginUser(matchedUser);
      console.log("User logged in:", matchedUser);
    } else {
      console.log("Invalid login attempt");
    }
  }
}, [props.loginAttempt]);


  return (
    <div>
      
    </div>
  )
}
