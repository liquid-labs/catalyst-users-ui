import React from 'react'

import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const PasswordRecoverForm = () => {
  const commonFieldProps = {
    initialValue : '',
    required : true,
    gridded  : {xs : 12},
    viewOnly : false,
  }

  return [
    <ValidInput key="emailInput"
        name="email"
        label="Email"
        validators={isEmail}
        {...commonFieldProps}
    />,
  ]
}

export {
  PasswordRecoverForm
}
