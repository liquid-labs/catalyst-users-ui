import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose'

import { AccountControl } from '@liquid-labs/catalyst-users-ui'
import { BasicContentFrame } from '@liquid-labs/catalyst-core-ui'
import { PasswordRecoverForm } from './PasswordRecoverForm'
import { PasswordChange } from './PasswordChange'

import { checkAccess } from '../hocs/checkAccess'
import { withAuthInfo } from '../hocs/withAuthInfo'

const UserProfileBase = ({ authUser, match }) =>
  <BasicContentFrame AppNavigationProps={{ logoTo : '/', rightChildren : <AccountControl /> }}>
    <h1>Account Profile: {authUser.email}</h1>
    { (match.params.id == 'self' || match.params.id == authUser.uid) &&
      <PasswordChange /> }
    { (match.params.id != 'self' && match.params.id != authUser.uid) &&
      <PasswordReset /> }
  </BasicContentFrame>

const mapStateToProps = (state) => ({
  authUser : state.sessionState.authUser,
});

UserProfileBase.propTypes = {
  authUser : PropTypes.object.isRequired
}

const authCondition = ({authUser}) => Boolean(authUser)

export const UserProfile = compose(
  withAuthInfo,
  checkAccess(authCondition),
  connect(mapStateToProps)
)(UserProfileBase)
