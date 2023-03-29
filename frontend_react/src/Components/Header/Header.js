import React, { useState } from 'react';
import logo_file from '../../logo.png';
/*
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
*/
import './Header.css';

function Header(props) {
  const [searchTerm, setSearchTerm] = useState("");
  /* const [results, setResults] = useState([]); */

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /*
  const handleSubmit = (event) => {
  event.preventDefault();
  // Perform your search logic here
  // For example: fetch data from an API using searchTerm
  // Then update results state with setResults
  };
*/


  return (
    <div className="header">
      <div className="header__container1">
        <div className="header__left">
          <img src={logo_file} alt="eGROCERY" className="header__logo"/>
          <div className="header__right">
            <div className="header__text1">You are logged in as Joshua Vargas</div>
            <div className="header__text2">Managed Account</div>
          </div>
        </div>
      </div>
      <div className="header__container2">
        <div className="header__buttons">
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Home")}>Home</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Products")}>Products</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Help")}>Help</button>
        </div>
        <div className="header__search">
          {/* Use SearchIcon as a React component */}
          {/* Pass props like size or color if needed */}
          {/* Use aria-label for accessibility */}
          {/* Add value and onSearch props to control input */}
          {/* Add placeholder prop for user guidance */}
          <input
            className="header__searchInput"
            type="text"
            placeholder="Search for something you love"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="header__cart">
          <button className="header__cartButton" onClick={()=>props.setActiveBodyComponent("Cart")}>
            <span className="header__cartText">Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
