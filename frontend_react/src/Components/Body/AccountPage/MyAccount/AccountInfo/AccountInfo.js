import React from "react";

export default function AccountInfo({ userData }) {
  const {
    imageURL,
    email,
    firstName,
    lastName,
    address,
    birthdate,
    phoneNumber,
  } = userData;

  return (
    <div>
      <div>
        <img src={imageURL} alt="Profile" width="100" />
      </div>
      <div>Email: {email}</div>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Address: {address}</div>
      <div>Birthdate: {birthdate}</div>
      <div>Phone Number: {phoneNumber}</div>
    </div>
  );
}
