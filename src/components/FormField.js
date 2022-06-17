import { useState } from 'react'
import PropTypes from 'prop-types'

const FormField = ({label, value, type, isDisabled, isRequired, setText}) => {
  return (
    <div className="txt_field">
      <input
        type={type}
        value={value}
        onChange={(e) => setText(e.target.value)}
        required={isRequired}
        disabled={isDisabled}
      />
      <span></span>
      <label>{label}</label>
    </div>
  )
}

// Set default values of props
FormField.defaultProps = {
  type: 'text',
  isRequired: false,
}

// Types of props
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  setTimeout: PropTypes.func,
}

export default FormField