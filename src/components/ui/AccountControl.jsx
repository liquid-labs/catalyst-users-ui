import React from 'react'

import PropTypes from 'prop-types'

import AccountBoxIcon from '@material-ui/icons/AccountBox'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import { Logout } from './Logout'

const AccountControl = ({authUser}) =>
  authUser
    ? (<div key="accountControls">
      <IconButton component={Link}>
        <AccountBoxIcon />
      </IconButton>
      <Logout />
    </div>)
    : (<span key="accountControls">Login</span>)

AccountControl.propTypes = {
  authUser : PropTypes.object
}

export { AccountControl }
