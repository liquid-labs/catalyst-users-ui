import React from 'react'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { AppNavigation } from '@liquid-labs/catalyst-core-ui'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { Logout } from './Logout'

import { withAuthInfo } from '../hocs/withAuthInfo'

const AuthenticatingAppNavigationBase = (authUser, ...props) => {
  const rightChildren = authUser
    ? <div>
      <IconButton component={Link}>
        <AccountBoxIcon />
      </IconButton>
      <Logout />
    </div>
    : 'Login'

  return <AppNavigation rightChildren={rightChildren} {...props} />
}

const AuthenticatingAppNavigation = withAuthInfo(AuthenticatingAppNavigationBase)

export { AuthenticatingAppNavigation }
