import React from 'react'

export default function Header() {
  const styles = {
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    width: "100%",
    height: "12vh",
  }
  return (
    <div style={styles}>Header</div>
  )
}
