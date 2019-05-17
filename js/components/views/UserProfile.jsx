import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { AccessChecker } from '../util/AccessChecker'
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

const UserProfile = ({location, ...props}) => {
  const { authUser } = useAuthenticationStatus()
  const { appCtrlsAPI } = useAppControlsAPI()
  const itemContextAPI = useItemContextAPI()

  const isItemReady = itemContextAPI.isItemReady()
  useMemo(() => {
    appCtrlsAPI.setControls(isItemReady ? <ItemControls /> : null)
  }, [ isItemReady ])

  return (
    <AccessChecker check={accessCond}>
      <ValidationContext>
        <ItemContext>
          <ItemFetcher itemUrl={location.pathname} itemKey='person'>
            {({person}) =>
              <Person person={person} authUser={authUser} />}
          </ItemFetcher>
        </ItemContext>
      </ValidationContext>
    </AccessChecker>
  )
}

if (process.env.NODE_ENV !== 'production') {
  UserProfile.propTypes = {
    location : PropTypes.object.isRequired
  }
}

export { UserProfile }
