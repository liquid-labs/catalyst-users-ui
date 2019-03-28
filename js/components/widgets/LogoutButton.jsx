import React from 'react'
import PropTypes from 'prop-types'

import { useAuthenticationAPI, useAuthenticationStatus } from '@liquid-labs/catalyst-core-ui'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const LogoutButton = (iconProps, props) => {
  const { authUser } = useAuthenticationStatus()
  const { logOut } = useAuthenticationAPI()
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
