import React, { useCallback, useContext, useState } from 'react'

import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { LoginForm } from './login/LoginForm'
import { PasswordRecoverForm } from './login/PasswordRecoverForm'
import { RegisterForm } from './login/RegisterForm'
import Typography from '@material-ui/core/Typography'

import { useAuthenticationAPI, AppContext } from '@liquid-labs/catalyst-core-ui'

import { withFieldWatcher } from '@liquid-labs/react-validation'
import { withRouter } from 'react-router-dom'

import { fireauth } from '@liquid-labs/catalyst-firewrap'
import qs from 'query-string'

const LOGIN_VIEW = 'login'
const REGISTER_VIEW = 'register'
const RECOVER_PASSWORD_VIEW = 'recover'

const register = async(email, password, displayName, setRemoteError, resetAuthForm, resetContext, postAuthPush, authenticationAPI) => {
  const userAuthCreation =
    fireauth.createUserWithEmailAndPassword(email, password, displayName)
  try {
    authenticationAPI.addPostAuthGate(userAuthCreation)
    await userAuthCreation
    resetAuthForm()
    resetContext()
    postAuthPush()
  }
  catch (error) {
    setRemoteError(error)
  }
  finally {
    authenticationAPI.removePostAuthGate(userAuthCreation)
  }
}

const AuthenticationWidget =
withRouter(
  withFieldWatcher()(({xs, fieldWatcher, onClose, defaultPostAuthDestination,
    history, location,
    ...formProps}) => {

    const [ view, setView ] = useState(LOGIN_VIEW)
    const [ displayName, setDisplayName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordVerify, setPasswordVerify ] = useState('')
    const [ remoteError, setRemoteError ] = useState('')
    const authenticationAPI = useAuthenticationAPI()

    const displayNameChange = useCallback(
      (event) => setDisplayName(extractValue(event)),
      [setDisplayName])
    const emailChange = useCallback(
      (event) => setEmail(extractValue(event)),
      [setEmail])
    const passwordChange = useCallback(
      (event) => setPassword(extractValue(event)),
      [setPassword])
    const passwordVerifyChange = useCallback(
      (event) => setPasswordVerify(extractValue(event)), [setPasswordVerify])
    const resetAuthForm = useCallback(() => {
      setView(LOGIN_VIEW)
      setDisplayName('')
      setEmail('')
      setPassword('')
      setPasswordVerify('')
      setRemoteError('')
    },
    [setView, setDisplayName, setEmail, setPassword, setPasswordVerify, setRemoteError])

    const showLogin = useCallback((event) => {
      setView(LOGIN_VIEW)
      event.preventDefault()
    }, [setView])
    const showRegister = useCallback((event) => {
      setView(REGISTER_VIEW)
      event.preventDefault()
    }, [setView])
    const showRecoverPassword = useCallback((event) => {
      setView(RECOVER_PASSWORD_VIEW)
      event.preventDefault()
    }, [setView])
    const postAuthPush = useCallback(() => {
      const postLoginPath = qs.parse(location.search).postLoginPath
      const destination = postLoginPath
        ? postLoginPath
        : defaultPostAuthDestination
          ? defaultPostAuthDestination
          : '/'
      if (destination) {
        history.push(destination)
      }
    }, [history, location])

    const { resetContext } = useContext(AppContext)

    const onLogin = useCallback((event) => {
      fireauth.signInWithEmailAndPassword(email, password)
        .then(() => {
          resetAuthForm()
          resetContext()
          postAuthPush()
        })
        .catch(error => {
          setRemoteError(error)
        })

      event.preventDefault()
    }, [email, password, history, resetAuthForm, postAuthPush, resetContext, setRemoteError])
    const onRecoverPassword = useCallback((event) => {
      fireauth.sendPasswordResetEmail(email)
        .then(() => {
          resetAuthForm()
        })
        .catch(error => {
          setRemoteError(error)
        })

      event.preventDefault()
    }, [email, setRemoteError, resetAuthForm])
    const onRegister = useCallback((event) => {
      register(email, password, displayName, setRemoteError, resetAuthForm, resetContext, postAuthPush, authenticationAPI)
      event.preventDefault()
    }, [displayName, email, password, resetAuthForm, resetContext, setRemoteError, postAuthPush])

    const [ onSubmit, submitLabel ] = view === LOGIN_VIEW
      ? [ onLogin, "Log In" ]
      : view === RECOVER_PASSWORD_VIEW
        ? [ onRecoverPassword, "Recover Password" ]
        : [ onRegister, "Register" ]

    formProps = Object.assign({
      displayName    : displayName,
      email          : email,
      password       : password,
      passwordVerify : passwordVerify
    },
    formProps)

    return (
      <Grid container spacing={16} item alignContent="flex-start" xs={xs}>
        { remoteError /* TODO: this is superceded by the core info thing */
          ? <Grid item xs={12}>
            <Typography color="error">{remoteError.message}</Typography>
          </Grid>
          : null }
        { view === LOGIN_VIEW
        && <LoginForm fieldWatcher={fieldWatcher}
            email={email} emailChange={emailChange}
            password={password} passwordChange={passwordChange}
            {...formProps} /> }
        { view === RECOVER_PASSWORD_VIEW
        && <PasswordRecoverForm fieldWatcher={fieldWatcher}
            email={email} emailChange={emailChange}
            {...formProps} /> }
        { view === REGISTER_VIEW
        && <RegisterForm fieldWatcher={fieldWatcher}
            displayName={displayName} displayNameChange={displayNameChange}
            email={email} emailChange={emailChange}
            password={password} passwordChange={passwordChange}
            passwordVerify={passwordVerify} passwordVerifyChange={passwordVerifyChange}
            {...formProps} /> }
        <Grid item xs={12} key="authenticationSubmit">
          <Button color="primary" variant="contained" style={{width : '100%'}}
              disabled={!fieldWatcher.isValid()} onClick={onSubmit}>
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
  }))

if (process.env.NODE_ENV !== 'production') {
  AuthenticationWidget.propTypes = {
    defaultPostAuthDestination : PropTypes.string, // TODO: use path regex?
    xs                         : PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    onClose                    : PropTypes.func.isRequired
  }
}

const extractValue = (event) => {
  const target = event.target
  return target.type === 'checkbox'
    ? (!!target.checked)
    : target.value
}

export { AuthenticationWidget }
