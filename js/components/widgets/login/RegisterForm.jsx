import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { ValidInput, useValidationContextAPI } from '@liquid-labs/react-validation'

import { isEmail, fieldsMatch } from '@liquid-labs/validators'

export const RegisterForm = ({ displayName, email, password, passwordVerify, displayNameChange, emailChange, passwordChange, passwordVerifyChange, fieldWatcher }) => {
  const vcAPI = useValidationContextAPI()
  useEffect(() => {
    const validator =
      vcAPI.addContextValidator('passwordVerify', // show error here
        fieldsMatch('password', 'passwordVerify'),
        ['password', 'passwordVerify']) // trigger fields

    return () => vcAPI.removeContextValidator(validator)
  }, [])

  const commonFieldProps = {
    required     : true,
    gridded      : {xs : 12},
    fieldWatcher : fieldWatcher
  }

  return [
    <ValidInput key="displayNameInput"
        label="Display Name"
        propName="displayName"
        {...commonFieldProps}
      />,
    <ValidInput key="emailInput"
        label="Email"
        validators={isEmail}
        {...commonFieldProps}
      />,
    <ValidInput key="passwordInput"
        label="Password"
        type="password"
        {...commonFieldProps}
      />,
    <ValidInput key="passwordVerify"
        label="Confirm password"
        propName="passwordVerify"
        type="password"
        {...commonFieldProps}
      />,
  ]
}

RegisterForm.propTypes = {
  displayName          : PropTypes.string.isRequired,
  email                : PropTypes.string.isRequired,
  password             : PropTypes.string.isRequired,
  passwordVerify       : PropTypes.string.isRequired,
  displayNameChange    : PropTypes.func.isRequired,
  emailChange          : PropTypes.func.isRequired,
  passwordChange       : PropTypes.func.isRequired,
  passwordVerifyChange : PropTypes.func.isRequired,
}
