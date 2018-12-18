import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { contextActions } from '@liquid-labs/catalyst-app-core'

import { LoginForm } from '../ui/LoginForm'

import { fireauth } from '@liquid-labs/catalyst-firewrap'
import { bindOnInputChange, getFieldWatcher, withFieldWatcher } from '@liquid-labs/react-validation'

const INITIAL_STATE = {
  email    : '',
  password : ''
};

class LoginContainerBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }

    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = bindOnInputChange(this)
  }

  render() {
    const { fieldWatcher, ...props } = this.props;
    const { email, password } = this.state;
    return <LoginForm
        email={email}
        password={password}
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange}
        fieldWatcher={fieldWatcher}
        {...props} />
  }
}

LoginContainerBase.propTypes = {
  defaultPostAuthDestination : PropTypes.string.isRequired,
  history                    : PropTypes.object.isRequired,
  location                   : PropTypes.object.isRequired,
  resetContext               : PropTypes.func.isRequired,
  fieldWatcher               : PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  resetContext : () => dispatch(contextActions.resetContext())
})

export const LoginContainer = compose(
  withRouter,
  withFieldWatcher(),
  connect(null, mapDispatchToProps)
)(LoginContainerBase)
