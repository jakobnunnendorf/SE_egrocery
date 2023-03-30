import React from 'react'
import Filter from './Filter'


export default function FilterSection(props) {
    const styles = {
        section_frame: {
          marginTop: '5vh',
          width: '50%',
          textAlign: 'left'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
      }
  return (
    <section style={styles.section_frame}>
        <div style={styles.header}><h5>{props.section_name}</h5></div>
        {props.filter_array.map((filter, index) => (
            <Filter
            key={index}
            name={filter}
            addFilters={props.addFilters}
            active={props.activeFilters.includes(filter) ? true : false}
            />
  ))}
</section>
  )
}
