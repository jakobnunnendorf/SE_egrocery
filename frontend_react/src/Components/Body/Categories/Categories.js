import React, { Component } from 'react'
import FilterBar from './FilterBar/FilterBar'
import ProductCatalogue from './ProductCatalogue/ProductCatalogue'

export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeFilters: [],
        }
    }
    addFilters = (filter) => {
        if (!this.state.activeFilters.includes(filter)) {
            this.setState({
                activeFilters: [...this.state.activeFilters, filter]
            })
        }
    }

  render() {
    return (
        <>
            <FilterBar addFilters={this.addFilters}/>
            <ProductCatalogue activeFilters={this.state.activeFilters}/>
        </>
    )
  }
}

