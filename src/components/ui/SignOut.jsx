import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

import { appActions } from '@liquid-labs/catalyst-app-core'

const SignOutButton = ({dispatch, history}) => (
  <IconButton onClick={() => { dispatch.reset(); fireauth.signOut().then(history.push('/')) }}>
    <ExitToAppIcon />
  </IconButton>
)

SignOutButton.propTypes = {
  dispatch : PropTypes.func.isRequired,
  history  : PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({ dispatch : {
  reset : () => dispatch(appActions.reset())
}})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(SignOutButton);
