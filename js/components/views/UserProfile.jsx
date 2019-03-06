import React, { useContext } from 'react'

import { AccessChecker } from '../util/AccessChecker'
import { AccountControlWidget } from '../widgets/AccountControlWidget'
import { AuthenticationContext, BasicContentFrame } from '@liquid-labs/catalyst-core-ui'
import { ItemFetcher } from '@liquid-labs/catalyst-core-api'
import { Person } from '../content/Person'

const accessCond = ({authUser}) => Boolean(authUser)

const UserProfile = ({location}) => {
  const { authUser } = useContext(AuthenticationContext)
  return (
    <AccessChecker check={accessCond}>
      <BasicContentFrame AppNavigationProps={{ logoTo : '/', rightChildren : <AccountControlWidget /> }}>
        <ItemFetcher itemUrl={location.pathname} itemKey='person'>
          {({person}) => <Person person={person} />}
        </ItemFetcher>
      </BasicContentFrame>
    </AccessChecker>
  )
}

export { UserProfile }
