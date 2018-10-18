import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose'

import { PasswordForgetForm } from './PasswordForget'
import { PasswordChange } from './PasswordChange'

import { checkAccess } from '../hocs/checkAccess'
import { withAuthInfo } from '../hocs/withAuthInfo'

const UserAccount = ({ authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChange />
  </div>

const mapStateToProps = (state) => ({
  authUser : state.sessionState.authUser,
});

UserAccount.propTypes = {
  authUser : PropTypes.object.isRequired
}

const authCondition = ({authUser}) => Boolean(authUser)

export default compose(
  withAuthInfo,
  checkAccess(authCondition),
  connect(mapStateToProps)
)(UserAccount)
