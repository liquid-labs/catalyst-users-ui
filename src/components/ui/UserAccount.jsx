import React from 'react'
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
      <PasswordChangeForm />
    </div>

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

  const authCondition = ({authUser}) => Boolean(authUser)

  export default compose(
    withAuthInfo,
    checkAccess(authCondition),
    connect(mapStateToProps)
  )(UserAccount)
