import React, { Component } from 'react';
import FilterBar from './FilterBar/FilterBar';
import "./catalogue.css";

export default class Catalogue extends Component {
  render() {
    return (
      <div className="catalogue frame">
        <FilterBar/>
        Catalogue Component
      </div>
    )
  }
}
