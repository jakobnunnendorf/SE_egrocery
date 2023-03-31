import React, { Component } from 'react'
import MyAccount from './MyAccount/MyAccount'
import Login from './Login/Login'
import Signup from './Signup/Signup'

export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasAccount: false,
            activeComponent: 'Signup'
        }
    }
    createAccount = () => {
        this.setState({hasAccount: true})
    }
    setActiveComponent = (component) => {
        this.setState({activeComponent: component})
    }
  render() {
    return (
      <div>
        {this.props.accountStatus ?
          <MyAccount/> :
          this.state.hasAccount ? 
            <Login/> : 
            <Signup
            createAccount={this.createAccount}
            setActiveComponent={this.setActiveComponent}/>}
      </div>
    )
  }
}
