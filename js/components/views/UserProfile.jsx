import React from 'react'
import PropTypes from 'prop-types'

import { AccessChecker } from '../util/AccessChecker'
import { AccountControlWidget } from '../widgets/AccountControlWidget'
import { BasicContentFrame, ItemFetcher, useAuthenticationStatus } from '@liquid-labs/catalyst-core-ui'
import { Person } from '../content/Person'

const accessCond = ({authUser}) => Boolean(authUser)

const UserProfile = ({location}) => {
  const { authUser } = useAuthenticationStatus()
  return (
    <AccessChecker check={accessCond}>
      <BasicContentFrame AppNavigationProps={{ logoTo : '/', rightChildren : <AccountControlWidget /> }}>
        <ItemFetcher itemUrl={location.pathname} itemKey='person'>
          {({person}) =>
            <Person person={person} authUser={authUser} />}
        </ItemFetcher>
      </BasicContentFrame>
    </AccessChecker>
  )
}

if (process.env.NODE_ENV !== 'production') {
  UserProfile.propTypes = {
    location : PropTypes.object.isRequired
  }
}

export { UserProfile }
