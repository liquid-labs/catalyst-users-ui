import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const LoginForm = ({email, password, onInputChange, error, fieldWatcher, showRegister, showRecoverPassword}) => {
  const commonFieldProps = {
    onInputChange : onInputChange,
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher,
    required      : true // eslint-disable-line no-dupe-keys
  }

  return [
    <ValidInput
        name="email"
        label="Email"
        value={email}
        validate={isEmail}
        {...commonFieldProps}
    />,
    <ValidInput
        name="password"
        label="Password"
        value={password}
        type="password"
        {...commonFieldProps}
    />,
    <Grid item xs={12}>
      <Button color="primary" variant="contained" style={{width: '100%'}} type="submit" disabled={!fieldWatcher.isValid()}>Log In</Button>
    </Grid>,
    <Grid item xs={12}>
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showRecoverPassword}>Recover Password</Button>
    </Grid>,
    <Grid item xs={12}>
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showRegister}>Register</Button>
    </Grid>
  ]
}

export { LoginForm }
