import React from 'react'

import Grid from '@material-ui/core/Grid'
import { LoginContainer } from '../containers/LoginContainer'

import { withStateHandlers } from 'recompose'

const LOGIN_VIEW = 'login'
const REGISTER_VIEW = 'register'
const RECOVER_PASSWORD_VIEW = 'recover'

const AuthenticationViewRouter = ({view, xs, ...switchControls}) => {
  return (
    <Grid component="form" container spacing={16} item alignContent="flex-start" xs={xs}>
      { view === LOGIN_VIEW && <LoginContainer {...switchControls} /> }
      { view === RECOVER_PASSWORD_VIEW && null }
      { view === REGISTER_VIEW && null }
    </Grid>
  )
}

const AuthenticationContainer =
  withStateHandlers(
    {
      view: LOGIN_VIEW
    },
    {
      showLogin : () => () => ({
        view: LOGIN_VIEW
      }),
      showRegister : () => () => ({
        view: REGISTER_VIEW
      }),
      showRecoverPassword : () => () => ({
        view: RECOVER_PASSWORD_VIEW
      })
    }
  )(AuthenticationViewRouter)

export { AuthenticationContainer }
