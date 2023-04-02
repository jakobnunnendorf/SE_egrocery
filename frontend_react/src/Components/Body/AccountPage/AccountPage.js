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
    };
  }
  createAccount = (formdata) => {
    this.setState({
      hasAccount: true,
      newUser: {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        password: formdata.password,
      }
    });
  };

  setActiveComponent = (component) => {
    this.setState({ activeComponent: component });
  };

  fetchUserBase = (database) => {
    this.setState(
      {
        userBase: database,
      },
    )
  }
  
  addUser = (user) => {
    this.setState({
      userBase: [...this.state.userBase, user],
      newUser: {}
    })
  }

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
          <MyAccount />
        ) : this.state.activeComponent === "Login" ? (
          <Login setActiveComponent={this.setActiveComponent} />
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
        />
      </div>
    );
  }
}
