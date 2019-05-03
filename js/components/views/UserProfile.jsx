import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { AccessChecker } from '../util/AccessChecker'
import { AccountControlWidget } from '../widgets/AccountControlWidget'
import {
  ItemContext,
  ItemControls,
  ItemFetcher,
  useAppControlsAPI,
  useAuthenticationStatus,
  useItemContextAPI } from '@liquid-labs/catalyst-core-ui'

import { ValidationContext } from '@liquid-labs/react-validation'

import { Person } from '../content/Person'

const accessCond = ({authUser}) => Boolean(authUser)

const ItemContentFrame = ({location, ItemControlsProps}) => {
  const { authUser } = useAuthenticationStatus()
  const { appCtrlsAPI } = useAppControlsAPI()
  const itemContextAPI = useItemContextAPI()

  const isItemReady = itemContextAPI.isItemReady()
  useMemo(() => {
    appCtrlsAPI.setControls(isItemReady ? <ItemControls /> : null)
  }, [ isItemReady ])

  return (
    <ItemFetcher itemUrl={location.pathname} itemKey='person'>
      {({person}) =>
        <Person person={person} authUser={authUser} />}
    </ItemFetcher>
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
