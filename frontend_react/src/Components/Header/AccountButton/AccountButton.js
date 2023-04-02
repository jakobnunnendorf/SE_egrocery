import React from 'react'

import account_icon from './account.png';

export default function AccountButton(props){
    const styles = {
      iconStyleA: {
        height: "12px",
        marginLeft: "6px",
        marginRight: "6px"
      },
      bold_underlined: {
        fontWeight: "bold",
        textDecoration: "underline",
        fontSize: "13px",
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        outline: "none",
        padding: "0px",
        margin: "0px",
        display: "inline",
        verticalAlign: "baseline",
        fontFamily: "inherit",
        textAlign: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
        textShadow: "inherit",
        textRendering: "inherit",
        
      }
    };
    return (
      <div className="header__right">

          <div className="header__text1">
            {props.AccountButton ?
              "You are logged in as Joshua Vargas" :
              <span>Dont have an account yet?
                <button style={styles.bold_underlined}
                onClick={()=>props.setActiveBodyComponent("Account")}><br/>login | signup</button></span>}</div>

          {props.AccountButton && <div className="header__text2">

            <img
              style={styles.iconStyleA}
              src={account_icon} // to be replaced with the correct icon
              alt=""
            />

            Manage Account
          </div>}

        </div>
    )
  }
