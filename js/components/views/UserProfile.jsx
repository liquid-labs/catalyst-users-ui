import React, { useContext } from 'react'

import { AccountControlWidget } from '../widgets/AccountControlWidget'
import { AuthenticationContext, BasicContentFrame } from '@liquid-labs/catalyst-core-ui'
import { CardContainer, SectionGrid } from '@liquid-labs/mui-extensions'
import { ContentHeader } from '@liquid-labs/catalyst-theme'
import { ValidInput } from '@liquid-labs/react-validation'

import { AccessChecker } from '../util/AccessChecker'

const accessCond = ({authUser}) => Boolean(authUser)

const UserProfile = () => {
  const { authUser } = useContext(AuthenticationContext)
  return (
    <AccessChecker check={accessCond}>
      <BasicContentFrame AppNavigationProps={{ logoTo : '/', rightChildren : <AccountControlWidget /> }}>
        <ContentHeader>{authUser.email}</ContentHeader>
        <CardContainer>
          <SectionGrid title="General">
            <ValidInput
                label="Display name"
                value={authUser.displayName}
                maxLength="255"
                gridded={{xs : 12}}
                viewOnly
                defaultViewValue="<none>"
            />
          </SectionGrid>
          <SectionGrid title="Authentication">
            <ValidInput
                label="Email verified"
                value={authUser.emailVerified ? "yes" : "no"}
                maxLength="3"
                gridded={{xs : 12}}
                viewOnly
            />
          </SectionGrid>
        </CardContainer>
      </BasicContentFrame>
    </AccessChecker>
  )
}

export { UserProfile }
