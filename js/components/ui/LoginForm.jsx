import React from 'react'

import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const LoginForm = ({email, password, emailChange, passwordChange, error, fieldWatcher}) => {
  const commonFieldProps = {
    required     : true,
    gridded      : {xs : 12},
    fieldWatcher : fieldWatcher
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
    <ValidInput key="passwordInput"
        name="password"
        label="Password"
        value={password}
        onChange={passwordChange}
        type="password"
        {...commonFieldProps}
    />,
  ]
}

export { LoginForm }
