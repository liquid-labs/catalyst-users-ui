import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

import { appActions } from '@liquid-labs/catalyst-core-ui'

const LogoutButton = ({reset, history}) => (
  <IconButton onClick={() => { reset(); fireauth.signOut().then(history.push('/')) }}>
    <ExitToAppIcon />
  </IconButton>
)

LogoutButton.propTypes = {
  reset : PropTypes.func.isRequired,
  history  : PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  reset : () => dispatch(appActions.reset())
})

export const Logout = compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(LogoutButton);
