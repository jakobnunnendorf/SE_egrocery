import React from 'react'

export default function NavigationMenu(props) {
  return (
    <div className="header__buttons">
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Home")}><span className='header__buttonCapital'>H</span>ome</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Products")}><span className='header__buttonCapital'>P</span>roducts</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Help")}><span className='header__buttonCapital'>H</span>elp</button>
    </div>
  )
}
