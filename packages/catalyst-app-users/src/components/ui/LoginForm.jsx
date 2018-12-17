import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { ValidInput } from '@liquid-labs/react-validation'

import { isEmail } from '@liquid-labs/validators'

const LoginForm = ({email, password, onSubmit, onInputChange, error, fieldWatcher}) => {

  const commonFieldProps = {
    onInputChange : onInputChange,
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher,
    required      : true // eslint-disable-line no-dupe-keys
  };

  return [
    error /* TODO: this is superceded by the core info thing */
      ? <Grid item xs={12}>
        <Typography color="error">{error.message}</Typography>
      </Grid>
      : null,
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
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" component={Link} to={'/pw-forget'}>Recover Password</Button>
    </Grid>,
    <Grid item xs={12}>
      <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" component={Link} to={'/pw-forget'}>Register</Button>
    </Grid>
  ]
}

export { LoginForm }
