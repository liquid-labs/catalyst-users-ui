import React from 'react'
import PropTypes from 'prop-types'

import { AccessChecker } from '../util/AccessChecker'
import { AccountControlWidget } from '../widgets/AccountControlWidget'
import {
  BasicContentFrame,
  ItemContext,
  ItemControls,
  ItemFetcher,
  useAuthenticationStatus,
  useItemContextAPI } from '@liquid-labs/catalyst-core-ui'

import { ValidationContext } from '@liquid-labs/react-validation'

import { Person } from '../content/Person'

const accessCond = ({authUser}) => Boolean(authUser)

const ItemContentFrame = ({location, ItemControlsProps}) => {
  const { authUser } = useAuthenticationStatus()
  const itemContextAPI = useItemContextAPI()

  return (
    <BasicContentFrame
        navLogoTo={'/'}
        navChildren={(<ItemControls />)}
        navShowChildren={itemContextAPI.isItemReady()}
        navRightChildren={<AccountControlWidget />}>
      <ItemFetcher itemUrl={location.pathname} itemKey='person'>
        {({person}) =>
          <Person person={person} authUser={authUser} />}
      </ItemFetcher>
    </BasicContentFrame>
  )
}

if (process.env.NODE_ENV !== 'production') {
  ItemContentFrame.propTypes = {
    ItemControlsProps : PropTypes.object,
    location          : PropTypes.object.isRequired,
  }
}

const UserProfile = (props) =>
  <AccessChecker check={accessCond}>
    <ValidationContext>
      <ItemContext>
        <ItemContentFrame {...props} />
      </ItemContext>
    </ValidationContext>
  </AccessChecker>

if (process.env.NODE_ENV !== 'production') {
  UserProfile.propTypes = {
    location : PropTypes.object.isRequired
  }
}

export { UserProfile }
