import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'recompose'

import { AccountControl } from './AccountControl'
import { BasicContentFrame } from '@liquid-labs/catalyst-core-ui'
import { CardContainer, SectionGrid } from '@liquid-labs/mui-extensions'
import { ContentHeader } from '@liquid-labs/catalyst-theme'
import { PasswordRecoverForm } from './PasswordRecoverForm'
import { PasswordChange } from './PasswordChange'
import { ValidInput } from '@liquid-labs/react-validation'

import { checkAccess } from '../hocs/checkAccess'
import { withAuthInfo } from '../hocs/withAuthInfo'

const UserProfileBase = ({ authUser, match }) =>
  <BasicContentFrame AppNavigationProps={{ logoTo : '/', rightChildren : <AccountControl /> }}>
    <ContentHeader>{authUser.email}</ContentHeader>
    <CardContainer>
      <SectionGrid title="General">
        <ValidInput
          label="Display name"
          value={authUser.displayName}
          maxLength="255"
          gridded={{xs: 12}}
          viewOnly
          defaultViewValue="<none>"
        />
      </SectionGrid>
      <SectionGrid title="Authentication">
        <ValidInput
          label="Email verified"
          value={authUser.emailVerified ? "yes" : "no"}
          maxLength="3"
          gridded={{xs: 12}}
          viewOnly
        />
      </SectionGrid>
    </CardContainer>
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
