import React, { Component } from 'react'

import account_icon from './account.png';

export default class Account extends Component {
  render() {
    const styles = {
      iconStyleA: {
        height: "12px",
        marginLeft: "6px",
        marginRight: "6px"
      },
    };
    return (
      <div className="header__right">

          <div className="header__text1">You are logged in as Joshua Vargas</div>

          <div className="header__text2">

            <img
              style={styles.iconStyleA}
              src={account_icon} // to be replaced with the correct icon
              alt=""
            />

            Manage Account
          </div>

        </div>
    )
  }
}
