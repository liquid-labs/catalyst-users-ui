import React from 'react'

import { AppFrame } from '@liquid-labs/catalyst-core-ui'
import { AuthenticationDialog } from './AuthenticationDialog'

import { manageAuthentication } from '../hocs/manageAuthentication'

console.log("AppFrame in AuthenticatingAppFrame: " + AppFrame)

const AuthenticatingAppFrameBase = (props) =>
  <AppFrame {...props}>
    <AuthenticationDialog />
  </AppFrame>

const AuthenticatingAppFrame = manageAuthentication(AuthenticatingAppFrameBase)

export { AuthenticatingAppFrame }
