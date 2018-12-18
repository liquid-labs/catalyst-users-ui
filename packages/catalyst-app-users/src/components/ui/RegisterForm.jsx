import React from 'react'

import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail, fieldsMatch } from '@liquid-labs/validators'

export const RegisterForm = ({username, email, password, passwordVerify, usernameChange, emailChange, passwordChange, passwordVerifyChange, error, fieldWatcher, showLogin, showRecoverPassword}) => {
  const commonFieldProps = {
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher
  }

  return [
      <ValidInput key="usernameInput"
          label="Username"
          propName="username"
          value={username}
          onChange={usernameChange}
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
    <Grid item xs={12} key="registerSubmit">
      <Button color="primary" variant="contained" style={{width: '100%'}} type="submit" disabled={!fieldWatcher.isValid()}>Register</Button>
    </Grid>,
    <Grid item xs={12} key="showLoginControl">
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showLogin}>Login</Button>
    </Grid>,
    <Grid item xs={12} key="showRecoverPasswordControl">
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" onClick={showRecoverPassword}>Recover Password</Button>
    </Grid>,
  ]
}

RegisterForm.propTypes = {
  username      : PropTypes.string.isRequired,
  email         : PropTypes.string.isRequired,
  password      : PropTypes.string.isRequired,
  passwordVerify: PropTypes.string.isRequired,
  usernameChange : PropTypes.func.isRequired,
  emailChange : PropTypes.func.isRequired,
  passwordChange : PropTypes.func.isRequired,
  passwordVerifyChange : PropTypes.func.isRequired,
}
