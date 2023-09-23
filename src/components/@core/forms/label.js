import React from 'react'
import PropTypes from 'prop-types'

const Label = props => {
  return (
    <label htmlFor={props.htmlFor} className="block text-sm font-medium text-gray-700">{props.title}</label>
  )
}

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Label