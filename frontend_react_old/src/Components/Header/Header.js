import React, { useState } from 'react';
import Logo from './Logo/Logo';
import Account from './Account/Account';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import SearchBar from './SearchBar/SearchBar';
import OpenCart from './OpenCart/OpenCart';
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
        <Logo/>
        <Account/>
      </div>

      <div className="header__container2">
        <NavigationMenu setActiveBodyComponent={props.setActiveBodyComponent}/>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch}/>
        <OpenCart
        setActiveBodyComponent={props.setActiveBodyComponent}
        nOfCartItems={props.nOfCartItems}/>
      </div>
    </div>
  );
}

export default Header;
