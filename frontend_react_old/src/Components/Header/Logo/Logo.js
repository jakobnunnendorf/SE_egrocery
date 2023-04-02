import React from 'react'
import logo_file from '../../../logo.png';

export default function Logo() {
  return (
    <div className="header__left"> {/* logo and country */}
      <img src={logo_file} alt="eGROCERY" className="header__logo" />
      &nbsp; &nbsp; Singapore
    </div>
  )
}
