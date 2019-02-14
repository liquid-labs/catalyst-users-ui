import React from 'react'

import { compose, withState } from 'recompose'
import PropTypes from 'prop-types'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { AuthenticationDialog } from './AuthenticationDialog'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { withAuthInfo } from '../hocs/withAuthInfo'
import { withLogout } from '../hocs/withLogout'
import { withRouter } from 'react-router-dom'

const AccountControlBase = ({
  authUser,
  menuAnchor, setMenuAnchor,
  authenticationDialogOpen, setAuthenticationDialogOpen,
  logout, history }) => {
  if (authUser) {
    const closeMenu = () => setMenuAnchor(null)
    const menuLogout = () => {
      closeMenu()
      logout()
    }
    const menuProfile = () => {
      closeMenu()
      history.push('/users/self/profile')
    }
    return (
      <div key="profileControls">
        <IconButton onClick={(e) => setMenuAnchor(e.target)}>
          <AccountBoxIcon />
        </IconButton>
        <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
        >
          <MenuItem onClick={menuProfile}>Profile</MenuItem>
          <Divider />
          <MenuItem onClick={menuLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
  else {
    return (
      <div key="authenticationControl">
        <Button onClick={() => setAuthenticationDialogOpen(true)}>Login</Button>
        <AuthenticationDialog open={authenticationDialogOpen}
            onClose={() => setAuthenticationDialogOpen(false)} />
      </div>
    )
  }
}

AccountControlBase.propTypes = {
  authUser                    : PropTypes.object,
  authenticationDialogOpen    : PropTypes.bool.isRequired,
  setAuthenticationDialogOpen : PropTypes.func.isRequired,
  logout                      : PropTypes.func.isRequired,
}

const AccountControl = compose(
  withAuthInfo,
  withRouter,
  withLogout,
  withState('menuAnchor', 'setMenuAnchor', null),
  withState('authenticationDialogOpen', 'setAuthenticationDialogOpen', false)
)(AccountControlBase)

export { AccountControl }
