import React from 'react'

import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const PasswordRecoverForm = ({email, emailChange, fieldWatcher}) => {
  const commonFieldProps = {
    required     : true,
    gridded      : {xs : 12},
    fieldWatcher : fieldWatcher,
  }

  return [
    <ValidInput key="emailInput"
        name="email"
        label="Email"
        value={email}
        onChange={emailChange}
        validate={isEmail}
        {...commonFieldProps}
    />,
  ]
}

export {
  PasswordRecoverForm
}
