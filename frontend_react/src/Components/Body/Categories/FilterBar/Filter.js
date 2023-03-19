import React from 'react'

export default function Filter(props) {

    const style = {
        none: {
            background: "none",
            border: "none",
            padding: "0",
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
        <button onClick={()=>props.addFilters(props.name)} style={style.none}>
            {props.name} <button style={style.none}>X</button>
        </button>
    </div>
  )
}
