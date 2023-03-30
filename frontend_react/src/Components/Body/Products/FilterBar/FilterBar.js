import React from 'react'
import FilterSection from './FilterSection'
import filters from './filter_object';

export default function FilterBar(props) {

    const styles = {
        FilterBar_frame: {
            position: 'sticky',
            width: '20vw',
            height: 'auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            // position: 'fixed',
            top: '20vh',
            // left: '0',
            backgroundColor: 'white',
        },
      }
      
  return (

    <div style={styles.FilterBar_frame}>
      {Object.keys(filters).map((key) => {
        const filter = filters[key];
        return (
          <FilterSection
            key={key}
            section_name={filter.name}
            filter_array={filter.filter_array}
            addFilters={props.addFilters}
            activeFilters={props.activeFilters}
          />
        );
      })}
    </div>
  )
}
