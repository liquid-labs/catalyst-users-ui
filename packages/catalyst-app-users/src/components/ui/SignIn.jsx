import React from 'react'
import { Link } from 'react-router-dom'

import { compose } from 'recompose'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ValidInput } from '@liquid-labs/react-validation'

import withMobileDialog from '@material-ui/core/withMobileDialog'

import { isEmail } from '@liquid-labs/validators'

const SignInBase = ({email, password, onSubmit, fullScreen, open, onInputChange, error, fieldWatcher, classes}) => {
  const commonFieldProps = {
    onInputChange : onInputChange,
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher,
    required      : true // eslint-disable-line no-dupe-keys
  };

  return (
    <Dialog fullScreen={fullScreen} open={true}>
      <DialogTitle>Sign in</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={16}>
            {error
              ? <Grid item xs={12}>
                <Typography color="error">{error.message}</Typography>
              </Grid>
              : null
            }
            <ValidInput
                label="Email"
                value={email}
                validate={isEmail}
                {...commonFieldProps}
            />
            <ValidInput
                label="Password"
                value={password}
                type="password"
                {...commonFieldProps}
            />
            <Grid item xs={12} className={null/*classes.controls*/}>
              <Button color="primary" type="submit" disabled={!fieldWatcher.isValid()}>Sign In</Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={'/pw-forget'}>Forgot Password?</Link>
            </Grid>
            <Grid item xs={12}>
              Need an account?
              <Link to={'/'}>Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const SignIn = compose(
  withMobileDialog()
)(SignInBase)
