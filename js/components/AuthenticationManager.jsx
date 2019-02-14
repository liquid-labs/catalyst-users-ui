/**
 * The AuthenticationManager establishes the authentication status of the user.
 * The AM displays either a loading screen, error message, or the `children`
 * render prop if authentication status is respectivel pending, blocked, or
 * resolved.
 */
 import React, { useEffect, useState } from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { appActions } from '@liquid-labs/catalyst-core-ui'

// import { Await } from '@liquid-labs/catalyst-core-ui'
// import { awaitStatus } from '@liquid-labs/react-await'
import { Await, awaitStatus } from '@liquid-labs/react-await'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

const initialAuthenticationState = {
  authUser  : null,
  authToken : null,
  claims    : [],
  resolved  : false,
  error     : null
}

const AuthenticationContext = React.createContext(initialAuthenticationState)

const statusCheck = ({resolved, error}) =>
  error !== null
    ? { status: awaitStatus.BLOCKED,
        summary: "is blocked on error form auth provider (firebase). Ensure you have a good network connection." }
    : resolved
      ? { status: awaitStatus.RESOLVED,
          summary: "has received response from auth provider (firebase)." }
      : { status: awaitStatus.WAITING,
          summary: "is waiting on response from auth provider (firebase)..." }
const checks = [statusCheck]

const AuthenticationManager = (errorHandler, blocked, children, ...props) => {
  const [ authenticationStatus, setAuthenticationStatus ] =
    useState(initialAuthenticationState)

  // We set up the listener on mount.
  useEffect(() => {
    fireauth.onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.getIdTokenResult().then(function(tokenInfo) {
          setAuthenticationStatus({
            authUser  : authUser,
            authToken : action.tokenInfo.token,
            claims    : action.tokenInfo.claims,
            resolved  : true,
            error     : null
          })
        })
        .catch(function(error) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Error getting authentication token', error) // eslint-disable-line no-console
          }
          if (errorHandler) errorHandler("Could not get token info; login invalidated.")
          setAuthenticationStatus({
            ...initialAuthenticationState,
            resolved: true,
            error: error
          })
        })
      }
      else {
        setAuthenticationStatus({
          ...initialAuthenticationState,
          resolved: true
        })
      }
    })
  }, [])

  return (
    <AuthenticationContext.Provider value={authenticationStatus}>
      <Await name="Authentication manager"
          checks={checks} checkProps={authenticationStatus}>
        { children(props) }
      </Await>
    </AuthenticationContext.Provider>
  )
}

export { AuthenticationManager }
