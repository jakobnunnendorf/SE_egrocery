import React, { Component } from 'react';
import FilterBar from './FilterBar/FilterBar';
import ProductCatalogue from './ProductCatalogue/ProductCatalogue';
import BackendEmulator from './BackendEmulator'; // Import BackendEmulator

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: [],
      matchingProducts: [],
      initialMatchingProducts: [],
    };
  }

  styles = {
    frame: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
  };

  addFilters = (filter) => {
    if (!this.state.activeFilters.includes(filter)) {
      this.setState({
        activeFilters: [...this.state.activeFilters, filter],
      });
    } else if (this.state.activeFilters.includes(filter)) {
      this.setState({
        activeFilters: this.state.activeFilters.filter((item) => item !== filter),
      });
    }
  };

  addMatchingProducts = (products) => {
    this.setState((prevState) => ({
      matchingProducts: products,
      initialMatchingProducts: prevState.initialMatchingProducts.length
        ? prevState.initialMatchingProducts
        : products,
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchResults !== this.props.searchResults) {
      if (this.props.searchResults.length) {
        this.setState({
          matchingProducts: this.props.searchResults,
        });
      } else {
        this.setState({
          matchingProducts: this.state.initialMatchingProducts,
        });
      }
    }
  }

  render() {
    return (
      <div style={this.styles.frame}>
        <FilterBar
          addFilters={this.addFilters}
          activeFilters={this.state.activeFilters}
        />
        <ProductCatalogue
          activeFilters={this.state.activeFilters}
          matchingProducts={this.state.matchingProducts}
          addItemToCart={this.props.addItemToCart}
        />
        {/* Use BackendEmulator component with correct capitalization */}
        <BackendEmulator
          addMatchingProducts={this.addMatchingProducts}
          activeFilters={this.state.activeFilters}
          purchasedItems={this.props.purchasedItems}
        />
      </div>
    );
  }
}
