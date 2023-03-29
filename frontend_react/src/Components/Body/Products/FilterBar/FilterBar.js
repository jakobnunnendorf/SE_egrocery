import React from 'react'
import Filter from './Filter'

export default function FilterBar(props) {
    function parsePriceRange(range) {
      if (range.includes('>')) {
        const lowerBound = parseFloat(range.replace('>', '').replace('$', '').trim());
        return [lowerBound, Infinity];
      } else {
        const [lowerBound, upperBound] = range.split('-').map(price => parseFloat(price.replace('$', '').trim()));
        return [lowerBound, upperBound];
      }
    }
    const styles = {
        FilterBar_frame: {
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

  return (
    <div style={styles.FilterBar_frame}>

        <section>
          <h5>Categories</h5>
          {category_filters.map((filter, index) => (<Filter type="category" key={index} name={filter} addFilters={props.addFilters} active={props.activeFilters.includes(filter) ? true : false}/>))}
        </section>

        <section>
          <h5>Price</h5>
          {price_filters.map((filter, index) => (<Filter type="price" key={index} name={filter} addFilters={props.addFilters} active={props.activeFilters.includes(filter) ? true : false}/>))}
        </section>

    </div>
  )
}
