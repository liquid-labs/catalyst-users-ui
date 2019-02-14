import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { withLogout } from '../hocs/withLogout'

const LogoutButtonBase = ({logout}) => (
  <IconButton onClick={() => logout()}>
    <ExitToAppIcon />
  </IconButton>
)

LogoutButtonBase.propTypes = {
  logout : PropTypes.func.isRequired,
}

export const LogoutButton = withLogout(LogoutButtonBase)
