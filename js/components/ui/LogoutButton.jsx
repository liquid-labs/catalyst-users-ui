import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { AuthenticationContext } from '../AuthenticationManager'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const LogoutButton = (iconProps, props) => {
  const { authUser, logOut } = useContext(AuthenticationContext)
  return (
    <IconButton onClick={() => logOut()} disabled={Boolean(authUser)} {...props}>
      <ExitToAppIcon {...iconProps} />
    </IconButton>
  )
}

if (process.env.NODE_ENV !== 'production') {
  LogoutButton.propTypes = {
    iconProps : PropTypes.object
  }
}

export {
  LogoutButton
}
