import React from 'react'

import { AppFrame } from '@liquid-labs/catalyst-core-ui'
import { AuthenticationDialog } from './AuthenticationDialog'

import { manageAuthentication } from '../hocs/manageAuthentication'

const AuthenticatingAppFrameBase = (props) =>
  <AppFrame {...props}>
    <AuthenticationDialog />
  </AppFrame>

const AuthenticatingAppFrame = manageAuthentication(AuthenticatingAppFrameBase)

export { AuthenticatingAppFrame }
