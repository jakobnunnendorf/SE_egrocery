import React, { Component } from "react";
import MyAccount from "./MyAccount/MyAccount";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import AccountBackendEmulator from "./AccountBackendEmulator";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: false,
      activeComponent: "Signup",
      userBase: [],
      newUser: {},
      loggedInUser: {},
      loginAttempt: {},
    };
  }

  createLoginAttempt = (loginAttempt) => {
    this.setState({
      loginAttempt: loginAttempt,
    });
  };

  loginUser = (user) => {
    this.setState({
      loggedInUser: user,
      activeComponent: "MyAccount",
    });
  };

  createAccount = (formdata) => {
    this.setState({
      hasAccount: true,
      newUser: {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        password: formdata.password,
        phoneNumber: "",
        address: "",
        birthdate: "",
        purchaseHistory: [],
        receipts: [],
        imageURL:
          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
      },
    });
  };

  setActiveComponent = (component) => {
    this.setState({ activeComponent: component });
  };

  fetchUserBase = (database) => {
    this.setState({
      userBase: database,
    });
  };

  addUser = (user) => {
    this.setState({
      userBase: [...this.state.userBase, user],
      newUser: {},
    });
  };

  styles = {
    frame: {
      width: "100%",
      height: "100%",
      minHeight: "80vh",
    },
  };

  render() {
    return (
      <div style={this.styles.frame}>
        {this.state.activeComponent === "MyAccount" ? (
          <MyAccount
            loggedInUser={this.state.loggedInUser} />
        ) : this.state.activeComponent === "Login" ? (
          <Login
            setActiveComponent={this.setActiveComponent}
            createLoginAttempt={this.createLoginAttempt}
          />
        ) : (
          <Signup
            createAccount={this.createAccount}
            setActiveComponent={this.setActiveComponent}
          />
        )}
        <AccountBackendEmulator
          fetchUserBase={this.fetchUserBase}
          addUser={this.addUser}
          newUser={this.state.newUser}
          loginAttempt={this.state.loginAttempt}
          loginUser={this.loginUser}
        />
      </div>
    );
  }
}
