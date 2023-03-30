import React, { useState } from 'react';
import logo_file from '../../logo.png';
import account_icon from './account.png';
import cartbutton_icon from './cart_darkgreen.png';
import search_icon from './SearchBar/search.png';
/*
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
*/
import './Header.css';

function Header(props) {
  const styles = {
    iconStyleA: {
      height: "12px",
      marginLeft: "6px",
      marginRight: "6px"
    },
    iconStyleB: {
      height: "24px",
      marginLeft: "6px",
      marginRight: "6px"
    },
    iconStyleC: {
      height: "24px",
      marginLeft: "0px",
      marginRight: "6px"
    },
  };


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
          <img src={logo_file} alt="eGROCERY" className="header__logo" />
          &nbsp; &nbsp; Singapore
        </div>
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
      </div>
      <div className="header__container2">
        <div className="header__buttons">
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Home")}><span className='header__buttonCapital'>H</span>ome</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Products")}><span className='header__buttonCapital'>P</span>roducts</button>
          <button className="header__button" onClick={()=> props.setActiveBodyComponent("Help")}><span className='header__buttonCapital'>H</span>elp</button>
        </div>
        <div className="header__search">
          {/* Use SearchIcon as a React component */}
          {/* Pass props like size or color if needed */}
          {/* Use aria-label for accessibility */}
          {/* Add value and onSearch props to control input */}
          {/* Add placeholder prop for user guidance */}
          <img
              style={styles.iconStyleB}
              src={search_icon} // to be replaced with the correct icon
              alt=""
            />
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
          <img
              style={styles.iconStyleC}
              src={cartbutton_icon} // to be replaced with the correct icon
              alt=""
            />
            <span className="header__cartTextCapital">C</span>
            <span className="header__cartText">art</span>
            0 items
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
