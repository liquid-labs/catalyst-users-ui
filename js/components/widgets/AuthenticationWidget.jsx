import React, { useContext, useState } from 'react'

import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { LoginForm } from './login/LoginForm'
import { PasswordRecoverForm } from './login/PasswordRecoverForm'
import { RegisterForm } from './login/RegisterForm'
import Typography from '@material-ui/core/Typography'
import { ValidationContext, useValidationAPI } from '@liquid-labs/react-validation'

import { useAuthenticationAPI, useUserContext } from '@liquid-labs/catalyst-core-ui'

import { withRouter } from 'react-router-dom'

import { fireauth } from '@liquid-labs/catalyst-firewrap'
import qs from 'query-string'

const LOGIN_VIEW = 'login'
const REGISTER_VIEW = 'register'
const RECOVER_PASSWORD_VIEW = 'recover'

const register = async(data, setRemoteError, resetAndPush, authenticationAPI) => {
  const userAuthCreation =
    fireauth.createUserWithEmailAndPassword(data.email, data.password, data.displayName)
  try {
    authenticationAPI.addPostAuthGate(userAuthCreation)
    await userAuthCreation
    resetAndPush()
  }
  catch (error) {
    setRemoteError(error)
  }
  finally {
    authenticationAPI.removePostAuthGate(userAuthCreation)
  }
}

const AuthenticationWidgetGuts = withRouter(
  ({xs, onClose, defaultPostAuthDestination,
    history, location,
    ...formProps}) => {

    const authenticationAPI = useAuthenticationAPI()
    const vcAPI = useValidationAPI()

    const [ view, setView ] = useState(LOGIN_VIEW)
    const [ remoteError, setRemoteError ] = useState('')

    const resetAuthForm = () => {
      vcAPI.resetData()
      setView(LOGIN_VIEW)
      setRemoteError('')
    }

    const showLogin = (event) => {
      setView(LOGIN_VIEW)
      event.preventDefault()
    }
    const showRegister = (event) => {
      setView(REGISTER_VIEW)
      event.preventDefault()
    }
    const showRecoverPassword = (event) => {
      setView(RECOVER_PASSWORD_VIEW)
      event.preventDefault()
    }
    const postAuthPush = () => {
      const postLoginPath = qs.parse(location.search).postLoginPath
      const destination = postLoginPath
        ? postLoginPath
        : defaultPostAuthDestination
          ? defaultPostAuthDestination
          : '/'
      if (destination) {
        history.push(destination)
      }
    }

    const { resetContext } = useUserContext()

    const resetAndPush = () => {
      resetAuthForm()
      resetContext()
      postAuthPush()
    }

    const onLogin = (event) => {
      const data = vcAPI.getData()
      fireauth.signInWithEmailAndPassword(data.email, data.password)
        .then(resetAndPush)
        .catch(error => {
          setRemoteError(error)
        })

      event.preventDefault()
    }
    const onRecoverPassword = (event) => {
      const data = vcAPI.getData()
      fireauth.sendPasswordResetEmail(data.email)
        .then(() => {
          resetAuthForm()
        })
        .catch(error => {
          setRemoteError(error)
        })

      event.preventDefault()
    }
    const onRegister = (event) => {
      register(vcAPI.getData(), setRemoteError, resetAndPush, authenticationAPI)
      event.preventDefault()
    }

    const [ onSubmit, submitLabel ] = view === LOGIN_VIEW
      ? [ onLogin, "Log In" ]
      : view === RECOVER_PASSWORD_VIEW
        ? [ onRecoverPassword, "Recover Password" ]
        : [ onRegister, "Register" ]

    return (
      <Grid container spacing={16} item alignContent="flex-start" xs={xs}>
        { remoteError /* TODO: this is superceded by the core info thing */
          ? <Grid item xs={12}>
            <Typography color="error">{remoteError.message}</Typography>
          </Grid>
          : null }
        { view === LOGIN_VIEW && <LoginForm {...formProps} /> }
        { view === RECOVER_PASSWORD_VIEW && <PasswordRecoverForm {...formProps} /> }
        { view === REGISTER_VIEW && <RegisterForm {...formProps} /> }
        <Grid item xs={12} key="authenticationSubmit">
          <Button color="primary" variant="contained" style={{width : '100%'}}
              disabled={!vcAPI.isValid()} onClick={onSubmit}>
            {submitLabel}
          </Button>
        </Grid>
        <Grid item xs={12} key="authenticationCancel">
          <Button color="secondary" variant="outlined" style={{width : '100%'}}
              onClick={onClose}>
          Cancel
          </Button>
        </Grid>
        { view !== LOGIN_VIEW
        && <Grid item xs={12} key="showLoginControl">
          <Button style={{fontSize : '0.6875rem', paddingTop : '5px', paddingBottom : '5px', formHeight : '24px'}} size="small" onClick={showLogin}>Login</Button>
        </Grid>}
        { view !== RECOVER_PASSWORD_VIEW
        && <Grid item xs={12} key="showRecoverPasswordControl">
          <Button style={{fontSize : '0.6875rem', paddingTop : '5px', paddingBottom : '5px', formHeight : '24px'}} size="small" onClick={showRecoverPassword}>Recover Password</Button>
        </Grid> }
        { view !== REGISTER_VIEW
        && <Grid item xs={12} key="showRegisterControl">
          <Button style={{fontSize : '0.6875rem', paddingTop : '5px', paddingBottom : '5px', formHeight : '24px'}} size="small" onClick={showRegister}>Register</Button>
        </Grid> }
      </Grid>
    )
  })

if (process.env.NODE_ENV !== 'production') {
  AuthenticationWidgetGuts.propTypes = {
    defaultPostAuthDestination : PropTypes.string, // TODO: use path regex?
    xs                         : PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    onClose                    : PropTypes.func.isRequired
  }
}

const AuthenticationWidget = (props) =>
  <ValidationContext historyLength={0}>
    <AuthenticationWidgetGuts {...props} />
  </ValidationContext>

export { AuthenticationWidget }
