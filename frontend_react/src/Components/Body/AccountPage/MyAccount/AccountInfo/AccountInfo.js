import React from "react";
import jakobImage from "../jakob.jpeg";
import "./AccountInfo.css";

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
    <div className="infoContainer">
      <div>
        <img src={jakobImage} alt="Profile" width="100" className="customerImg" />
      </div>
      <table className="infoTable">
        <tbody>
          <tr>
            <td>Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Birthdate:</td>
            <td>{birthdate}</td>
          </tr>
          <tr>
            <td>Phone Number:</td>
            <td>{phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
