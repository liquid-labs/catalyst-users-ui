import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import qs from 'query-string'

import { contextActions } from '@liquid-labs/catalyst-app-core'

import { withFieldWatcher } from '@liquid-labs/react-validation'

import { Login } from '../ui/Login'
import { fireauth } from '@liquid-labs/catalyst-firewrap'
import { bindOnInputChange, getFieldWatcher } from '@liquid-labs/react-validation'

const INITIAL_STATE = {
  email    : '',
  password : '',
  error    : null,
};

class LoginContainerBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = bindOnInputChange(this);
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
      defaultPostAuthDestination,
      resetContext
    } = this.props;

    fireauth.loginWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        const postLoginPath = qs.parse(this.props.location.search).postLoginPath;
        const destination = postLoginPath ? postLoginPath : defaultPostAuthDestination;
        resetContext();
        history.push(destination);
      })
      .catch(error => {
        this.setState({error : error});
      });

    event.preventDefault();
  }

  render() {
    const { fieldWatcher } = this.props;
    const { email, password, error } = this.state;
    return <Login
        email={email}
        password={password}
        error={error}
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange}
        fieldWatcher={fieldWatcher} />
  }
}

LoginContainerBase.propTypes = {
  defaultPostAuthDestination : PropTypes.string.isRequired,
  history                    : PropTypes.object.isRequired,
  location                   : PropTypes.object.isRequired,
  resetContext               : PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  resetContext : () => dispatch(contextActions.resetContext())
})

export const LoginContainer = compose(
  withRouter,
  withFieldWatcher(),
  connect(null, mapDispatchToProps)
)(LoginContainerBase)
