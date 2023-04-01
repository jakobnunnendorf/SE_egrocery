import React, { Component } from "react";
import MyAccount from "./MyAccount/MyAccount";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccount: false,
      activeComponent: "Signup",
    };
  }
  createAccount = () => {
    this.setState({ hasAccount: true });
  };
  setActiveComponent = (component) => {
    this.setState({ activeComponent: component });
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
        {this.props.accountStatus ? (
          <MyAccount />
        ) : this.state.activeComponent === "Login" ? (
          <Login />
        ) : (
          <Signup
            createAccount={this.createAccount}
            setActiveComponent={this.setActiveComponent}
          />
        )}
      </div>
    );
  }
}
