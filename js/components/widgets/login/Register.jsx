import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { bindOnInputChange, getFieldWatcher } from '@liquid-labs/react-validation'
import pick from 'lodash.pick'

const INITIAL_STATE = {
  displayName : '',
  email       : '',
  passwordOne : '',
  passwordTwo : '',
  error       : null
}

class RegisterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.fieldWatcher = getFieldWatcher();

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = bindOnInputChange(this);
  }

  render() {
    const stateVars = pick(this.state, 'email', 'displayName', 'passwordOne', 'passwordTwo', 'error');
    return <RegisterForm {...stateVars}
        fieldWatcher={this.fieldWatcher}
        onInputChange={this.onInputChange} />
  }
}

export const Register = withRouter(RegisterBase)
