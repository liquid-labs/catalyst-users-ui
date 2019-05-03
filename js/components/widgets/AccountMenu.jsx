import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import LoginIcon from 'mdi-material-ui/LoginVariant'
import LogoutIcon from 'mdi-material-ui/LogoutVariant'

import { useAuthenticationStatus, useAuthenticationAPI } from '@liquid-labs/catalyst-core-ui'

import { withRouter } from 'react-router-dom'

const AccountMenu = withRouter(({
  history,
  showIcons=true, // display/config options
  closeMenu, openAuthenticationDialog // callbacks
}) => {
  const { authUser } = useAuthenticationStatus()
  const { logOut } = useAuthenticationAPI()

  const menuLogout = useCallback(() => {
    closeMenu()
    logOut()
  }, [ closeMenu, logOut ])

  const menuProfile = useCallback(() => {
    closeMenu()
    history.push('/persons/self/')
  }, [ closeMenu ])

  if (process.env.NODE_ENV !== 'production') {
    if (!showIcons) {
      // eslint-disable-next-line no-console
      console.warn("The 'AccountMenu' 'showIcons' property is not yet implemented.")
    }
  }

  return (
    <>
      { authUser
        && <MenuItem onClick={menuProfile}>
          <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem> }
      { authUser
        && <MenuItem onClick={menuLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem> }
      { !authUser
        && <MenuItem onClick={() => { openAuthenticationDialog(); closeMenu(); }}>
          <ListItemIcon><LoginIcon /></ListItemIcon>
          <ListItemText>Login</ListItemText>
        </MenuItem> }
    </>
  )
})

AccountMenu.propTypes = {
  showIcons                : PropTypes.bool,
  closeMenu                : PropTypes.func.isRequired,
  openAuthenticationDialog : PropTypes.func.isRequired,
}

export { AccountMenu }
