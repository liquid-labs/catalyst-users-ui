import React from 'react'

import PropTypes from 'prop-types'

import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail, fieldsMatch } from '@liquid-labs/validators'

export const RegisterForm = ({ displayName, email, password, passwordVerify, displayNameChange, emailChange, passwordChange, passwordVerifyChange, fieldWatcher }) => {
  const commonFieldProps = {
    required     : true,
    gridded      : {xs : 12},
    fieldWatcher : fieldWatcher
  }

  return [
    <ValidInput key="displayNameInput"
        label="Display Name"
        propName="displayName"
        value={displayName}
        onChange={displayNameChange}
        {...commonFieldProps}
      />,
    <ValidInput key="emailInput"
        label="Email"
        value={email}
        onChange={emailChange}
        validate={isEmail}
        {...commonFieldProps}
      />,
    <ValidInput key="passwordInput"
        label="Password"
        value={password}
        type="password"
        onChange={passwordChange}
        {...commonFieldProps}
      />,
    <ValidInput key="passwordVerify"
        label="Confirm password"
        propName="passwordVerify"
        value={passwordVerify}
        type="password"
        onChange={passwordVerifyChange}
        validate={fieldsMatch('Passwords', password)}
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
