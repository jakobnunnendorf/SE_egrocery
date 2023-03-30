import React from 'react'

export default function Filter(props) {
    const style = {
        none: {
            background: "none",
            border: "none",
            padding: "3px 3px 3px 3px",
            margin: "0",
            font: "inherit",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "inherit",
            textDecoration: "none",
        },
        active: {
            background: "none",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "3px 3px 3px 3px",
            margin: "0",
            font: "inherit",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
            textAlign: "inherit",
            textDecoration: "none",
        }
    }
  return (
    <div>
        <button onClick={()=>props.addFilters(props.name)} style={props.active ? style.active : style.none}>
            {props.name} {props.active ? "X" : ""}
        </button>
    </div>
  )
}
