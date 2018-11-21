import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { fireauth } from '@liquid-labs/catalyst-firewrap'
import { SignUpForm } from './SignUpForm'
import { bindOnInputChange, getFieldWatcher } from '@liquid-labs/react-validation'
import pick from 'lodash.pick'

const INITIAL_STATE = {
  username    : '',
  email       : '',
  passwordOne : '',
  passwordTwo : '',
  error       : null
}

class SignUpBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.fieldWatcher = getFieldWatcher();

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = bindOnInputChange(this);
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state

    const {
      history,
    } = this.props

    fireauth.createUserWithEmailAndPassword(email, passwordOne, username)
      .then(() =>{
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push('/')
      })
      .catch(error => {
        this.setState(() => ({ error : error }))
      })

    event.preventDefault()
  }

  render() {
    const stateVars = pick(this.state, 'email', 'username', 'passwordOne', 'passwordTwo', 'error');
    return <SignUpForm {...stateVars}
        fieldWatcher={this.fieldWatcher}
        onSubmit={this.onSubmit}
        onInputChange={this.onInputChange} />
  }
}

export const SignUp = withRouter(SignUpBase)
