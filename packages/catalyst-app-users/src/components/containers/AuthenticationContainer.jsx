import React from 'react'

import { compose, withHandlers, withState, withStateHandlers } from 'recompose'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import { LoginForm } from '../ui/LoginForm'
import { PasswordRecoverForm } from '../ui/PasswordRecover'

import { withFieldWatcher } from '@liquid-labs/react-validation'
import { withRouter } from 'react-router-dom'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

const LOGIN_VIEW = 'login'
const REGISTER_VIEW = 'register'
const RECOVER_PASSWORD_VIEW = 'recover'

const AuthenticationViewRouter = ({view, xs, onLogin, onRecoverPassword, onRegister, remoteError, ...formProps}) => {
  const onSubmit = view === LOGIN_VIEW
    ? onLogin
    : view === RECOVER_PASSWORD_VIEW
      ? onRecoverPassword
      : onRegister

  return (
    <Grid component="form" container spacing={16} item alignContent="flex-start" xs={xs} onSubmit={onSubmit}>
      { remoteError /* TODO: this is superceded by the core info thing */
        ? <Grid item xs={12}>
          <Typography color="error">{error.message}</Typography>
        </Grid>
        : null }
      { view === LOGIN_VIEW && <LoginForm {...formProps} /> }
      { view === RECOVER_PASSWORD_VIEW && <PasswordRecoverForm {...formProps} /> }
      { view === REGISTER_VIEW && null }
    </Grid>
  )
}

const INITIAL_STATE = {
  view: LOGIN_VIEW,
  password : null,
  email: null,
  passwordVerify: null,
  remoteError: null,
}

const mapDispatchToProps = (dispatch) => ({
  resetContext : () => dispatch(contextActions.resetContext())
})

const AuthenticationContainer = compose(
  withRouter,
  withFieldWatcher(),
  connect(null, mapDispatchToProps),
  withStateHandlers(
    INITIAL_STATE,
    {
      showLogin : () => () => ({
        view: LOGIN_VIEW
      }),
      showRegister : () => () => ({
        view: REGISTER_VIEW
      }),
      showRecoverPassword : () => () => ({
        view: RECOVER_PASSWORD_VIEW
      }),
      resetAuthentication : () => () => INITIAL_STATE,
      setRemoteError : () => (error) => ({ remoteError : error })
    }
  ),
  withHandlers({
    onLogin : ({email, password, history, defaultPostAuthDestination, resetContext, setRemoteError }) => (event) => {
      fireauth.loginWithEmailAndPassword(email, password)
        .then(() => {
          resetAuthentication()
          const postLoginPath = qs.parse(this.props.location.search).postLoginPath
          const destination = postLoginPath ? postLoginPath : defaultPostAuthDestination
          resetContext()
          history.push(destination)
        })
        .catch(error => {
          setRemoteError(error)
        });

      event.preventDefault()
    },
    onRecoverPassword : ({email, setRemoteError, resetAuthentication}) => (event) => {
      fireauth.sendPasswordResetEmail(email)
        .then(() => {
          resetAuthentication()
        })
        .catch(error => {
          setRemoteError(error)
        });

      event.preventDefault()
    },
    onInputChange : () => (propName) => (event) => {
      const target = event.target
      const value = target.type === 'checkbox'
        ? (!!target.checked)
        : target.value

      return {
        [propName] : value
      }
    },
  })
)(AuthenticationViewRouter)

AuthenticationContainer.propTypes = {
  defaultPostAuthDestination : PropTypes.string.isRequired,
  history                    : PropTypes.object.isRequired,
  location                   : PropTypes.object.isRequired,
  resetContext               : PropTypes.func.isRequired,
  fieldWatcher               : PropTypes.object.isRequired
}

export { AuthenticationContainer }
