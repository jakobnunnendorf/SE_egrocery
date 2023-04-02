import React, { useEffect } from 'react'
import userDataBase from './mockUserData'

export default function AccountBackendEmulator(props) {
  //fetches the userDataBase from mockDatabase and passes it to the account page
  useEffect(() => {
    console.log('user database fetched:', userDataBase)
    props.fetchUserBase(userDataBase);
  }, [])

useEffect(() => {
  // Check if props.newUser is an empty object
  if (Object.keys(props.newUser).length !== 0) {
    console.log("new user added to the database:", props.newUser);
    props.addUser(props.newUser);
  }
}, [props.newUser]);


  return (
    <div>
      
    </div>
  )
}
