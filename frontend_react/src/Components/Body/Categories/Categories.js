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
            }
        
        )
        }
        else if (this.state.activeFilters.includes(filter)) {
            this.setState({
                activeFilters: this.state.activeFilters.filter(item => item !== filter)
            })
        }
    }

  render() {
    return (
        <>
            <FilterBar addFilters={this.addFilters} activeFilters={this.state.activeFilters}/>
            <ProductCatalogue activeFilters={this.state.activeFilters}/>
        </>
    )
  }
}

