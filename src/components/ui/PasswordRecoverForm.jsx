import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const PasswordRecoverForm = ({email, emailChange, error, fieldWatcher, showLogin, showRegister}) => {
  const commonFieldProps = {
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher,
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
  <Grid item xs={12} key="recoverPasswordSubmit">
      <Button color="primary" variant="contained" style={{width: '100%'}} type="submit" disabled={!fieldWatcher.isValid()}>Recover Password</Button>
    </Grid>,
    <Grid item xs={12} key="showLoginControl">
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showLogin}>Login</Button>
    </Grid>,
    <Grid item xs={12} key="showRegisterControl">
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showRegister}>Register</Button>
    </Grid>
  ]
}

export {
  PasswordRecoverForm
}
