import React from 'react'
import logo_file from '../../../media/logo.png'

export default function Logo() {
  const styles={
    width: '200px',
  }
  return (
    <img src={logo_file} style={styles} alt=""/>
  )
}
