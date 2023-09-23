import React from 'react'
import PropTypes from 'prop-types'

const ValidationError = props => {
  return (
    <p className="mt-2 text-sm text-red-600">{props.msg}</p>
  )
}

ValidationError.propTypes = {
    msg: PropTypes.string.isRequired
}

export default ValidationError