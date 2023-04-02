import React, { useEffect, useState } from 'react';
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
  const [searchOutput, setSearchOutput] = useState([]);
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

async function searchProducts(searchFilters) {
  try {
    const response = await fetch('http://127.0.0.1:5000/product/search_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchFilters),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log(products[0]);
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
  }
}

// useEffect(() => {
//   console.log("searchTerm", searchTerm);
//   const fetchSearchResults = async () => {
//     const results = await searchProducts({ name: searchTerm });
//     setSearchOutput(results);
//   };

//   if (searchTerm) {
//     fetchSearchResults();
//   } else {
//     setSearchOutput([]);
//   }
// }, [searchTerm]);

useEffect(() => {
  console.log("searchTerm", searchTerm);
  const fetchSearchResults = async () => {
    const results = await searchProducts({ name: searchTerm });
    setSearchOutput(results);
    props.setSearchResults(results); // Update the parent component's state
  };

  if (searchTerm) {
    fetchSearchResults();
  } else {
    setSearchOutput([]);
    props.setSearchResults([]); // Reset the parent component's state
  }
}, [searchTerm]);


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
