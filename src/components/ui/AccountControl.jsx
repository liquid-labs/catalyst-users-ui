import React from 'react'

import { compose, withState } from 'recompose'
import PropTypes from 'prop-types'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { AuthenticationDialog } from './AuthenticationDialog'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Logout } from './Logout'

import { withAuthInfo } from '../hocs/withAuthInfo'

const AccountControlBase = ({authUser, authenticationDialogOpen, setAuthenticationDialogOpen}) =>
  authUser
    ? <div key="profileControls">
      <IconButton>
        <AccountBoxIcon />
      </IconButton>
      <Logout />
    </div>
    : <div key="authenticationControl">
      <Button onClick={() => setAuthenticationDialogOpen(true)}>Login</Button>
      <AuthenticationDialog open={authenticationDialogOpen}
          onClose={() => setAuthenticationDialogOpen(false)} />
    </div>

AccountControlBase.propTypes = {
  authUser                    : PropTypes.object,
  authenticationDialogOpen    : PropTypes.bool.isRequired,
  setAuthenticationDialogOpen : PropTypes.func.isRequired
}

const AccountControl = compose(
  withAuthInfo,
  withState('authenticationDialogOpen', 'setAuthenticationDialogOpen', false)
)(AccountControlBase)

export { AccountControl }
