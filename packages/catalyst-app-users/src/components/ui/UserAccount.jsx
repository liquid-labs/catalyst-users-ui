import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose'

import { PasswordRecoverForm } from './PasswordRecover'
import { PasswordChange } from './PasswordChange'

import { checkAccess } from '../hocs/checkAccess'
import { withAuthInfo } from '../hocs/withAuthInfo'

const UserAccountBase = ({ authUser }) =>
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordRecoverForm />
    <PasswordChange />
  </div>

const mapStateToProps = (state) => ({
  authUser : state.sessionState.authUser,
});

UserAccountBase.propTypes = {
  authUser : PropTypes.object.isRequired
}

const authCondition = ({authUser}) => Boolean(authUser)

export const UserAccount = compose(
  withAuthInfo,
  checkAccess(authCondition),
  connect(mapStateToProps)
)(UserAccountBase)
