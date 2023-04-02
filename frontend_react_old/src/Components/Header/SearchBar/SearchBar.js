import React from 'react'
import search_icon from './search.png';

export default function SearchBar(props) {
  const styles = {
    iconStyleB: {
      height: "24px",
      marginLeft: "6px",
      marginRight: "6px"
    },
  };
  return (
    <div className="header__search">
      <img
          style={styles.iconStyleB}
          src={search_icon} // to be replaced with the correct icon
          alt=""
        />
      <input
        className="header__searchInput"
        type="text"
        placeholder="Search for something you love"
        value={props.searchTerm}
        onChange={props.handleSearch}
      />
    </div>
  )
}
