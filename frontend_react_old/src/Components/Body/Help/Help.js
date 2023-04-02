import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


export default function Help() {
  return (
    <FontAwesomeIcon icon={icon({name: 'user-secret'})} />
  )
}

