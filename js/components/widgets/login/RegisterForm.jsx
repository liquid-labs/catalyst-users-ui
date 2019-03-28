import React, { useEffect } from 'react'

import { ValidInput, useValidationAPI } from '@liquid-labs/react-validation'

import { isEmail, fieldsMatch } from '@liquid-labs/validators'

export const RegisterForm = () => {
  const vcAPI = useValidationAPI()
  useEffect(() => {
    const validator =
      vcAPI.addContextValidator('passwordVerify', // show error here
        fieldsMatch('password', 'passwordVerify'),
        ['password', 'passwordVerify']) // trigger fields

    return () => vcAPI.removeContextValidator(validator)
  }, [])

  const commonFieldProps = {
    required : true,
    gridded  : {xs : 12},
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
