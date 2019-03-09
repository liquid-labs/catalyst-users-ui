import React, { useState } from 'react'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useAuthenticationStatus, useAuthenticationAPI } from '@liquid-labs/catalyst-core-ui'
import { AuthenticationDialog } from './AuthenticationDialog'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { withRouter } from 'react-router-dom'

const AccountControlWidget = withRouter(({ history }) => {
  const { authUser } = useAuthenticationStatus()
  const { logOut } = useAuthenticationAPI()
  const [ menuAnchor, setMenuAnchor ] = useState(null)
  const [ authenticationDialogOpen, setAuthenticationDialogOpen ] = useState(false)

  if (authUser) {
    const closeMenu = () => setMenuAnchor(null)
    const menuLogout = () => {
      closeMenu()
      logOut()
    }
    const menuProfile = () => {
      closeMenu()
      history.push('/persons/self/')
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
})

export { AccountControlWidget }
