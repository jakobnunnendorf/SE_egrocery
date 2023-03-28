import React from 'react'
import Filter from './Filter'

export default function FilterBar(props) {
    const styles = {
        FilterBar_frame: {
            border: '1px solid red',
            width: '20vw',
            height: '80vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'fixed',
            top: '20vh',
            left: '0',
        },
      }
      const category_filters = ["Meat", "Vegetables", "Fruits", "Bakery", "Dairy", "Drinks", "Snacks", "Other"]
      const price_filters = ["0-3 $", "3-5 $", "5-10 $", "10-20 $", ">20 $"]
      const random_filters = ["random marc 1", "random marc 2", "random marc 3"]

  return (
    <div style={styles.FilterBar_frame}>

        <section>
          <h5>Categories</h5>
          {category_filters.map((filter, index) => (<Filter key={index} name={filter} addFilters={props.addFilters} active={props.activeFilters.includes(filter) ? true : false}/>))}
        </section>

        <section>
          <h5>Price</h5>
          {price_filters.map((filter, index) => (<Filter key={index} name={filter} addPriceRanges={props.addPriceRanges}/>))}
        </section>

        <section>
          <h5>random filters</h5>
          {random_filters.map((filter, index) => (<Filter key={index} name={filter} addFilters={props.addFilters}/>))}
        </section>

    </div>
  )
}
