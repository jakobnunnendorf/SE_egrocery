import React from 'react'
import Filter from './Filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react'

export default function FilterSection(props) {
    const [show, setShow] = useState(props.section_name === 'Price' ? true : props.section_name === "Categories" ? true : false)
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
        },
        hide_ul: {
          display: "none"
        },
        show_ul: {
          display: "block"
        }
      }
  return (
    <section style={styles.section_frame}>

        <div style={styles.header}
        onClick={()=>setShow(!show)}>
          <h5>{props.section_name}</h5>
          <FontAwesomeIcon icon={icon({name: 'angle-down'})} />
        </div>

        <ul
        style={show ? styles.show_ul : styles.hide_ul}>
          {props.filter_array.map((filter, index) => (
            <li>
              <Filter
              key={index}
              name={filter}
              addFilters={props.addFilters}
              active={props.activeFilters.includes(filter) ? true : false}
              />
            </li>
          ))}
        </ul>
</section>
  )
}
