import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { CardContainer, SectionGrid } from '@liquid-labs/mui-extensions'
import { ContentHeader } from '@liquid-labs/catalyst-theme'
import Link from '@material-ui/core/Link'
import { ValidInput } from '@liquid-labs/react-validation'
import { Waiter, waiterStatus } from '@liquid-labs/react-waiter'

import { useFeedbackAPI } from '@liquid-labs/catalyst-core-ui'

const sendingStatusCheck = [({sendingStatus, errorMessage, setSendingStatus}) =>
  Object.assign({ status : sendingStatus },
    sendingStatus === waiterStatus.BLOCKED
      // TODO: this currently relies on the 'Feedback' popping up the full
      // message. Which is fine, but for robustness, would be nice to use
      // '...' overflow wrapper with abaility to hover and get full message.
      ? { summary : <span>
        {'Error sending email. '}
        <Link onClick={() => setSendingStatus(waiterStatus.RESOLVED)}>
            Dismiss
        </Link>
      </span>,
      errorMessage : errorMessage }
      : sendingStatus === waiterStatus.WAITING
        ? { summary : `Sending email...` }
        : {}
  )
]

const VerifyEmailLink = ({authUser}) => {
  const [sendingStatus, setSendingStatus] = useState(waiterStatus.RESOLVED)
  const [errorMessage, setErrorMessage] = useState(null)
  const checkProps = useMemo(
    () => ({ sendingStatus, errorMessage, setSendingStatus }),
    [sendingStatus, errorMessage])

  const { addInfoMessage } = useFeedbackAPI()
  const sendEmailVerification = async() => {
    setSendingStatus(waiterStatus.WAITING)
    try {
      await authUser.sendEmailVerification()
      setSendingStatus(waiterStatus.RESOLVED)
      addInfoMessage('Email sent.')
    }
    catch (error) {
      setErrorMessage(error.toString())
      setSendingStatus(waiterStatus.BLOCKED)
    }
  }
  return (
    <Waiter name="Sending email verification"
        checks={sendingStatusCheck}
        checkProps={checkProps}
        tiny>
      <Link style={{ cursor : 'pointer' }} onClick={sendEmailVerification}>
        Send verification email...
      </Link>
    </Waiter>
  )
}

const Person = ({person, authUser}) =>
  <>
    <ContentHeader>{person.email}</ContentHeader>
    <CardContainer>
      <SectionGrid title="General">
        <ValidInput
            label="Display name"
            value={person.displayName}
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
            helperText={!authUser.emailVerified ? <VerifyEmailLink authUser={authUser} /> : null}
        />
      </SectionGrid>
    </CardContainer>
  </>

if (process.env.NODE_ENV !== 'production') {
  Person.propTypes = {
    authUser : PropTypes.object.isRequired,
    person   : PropTypes.object.isRequired,
  }
  VerifyEmailLink.propTypes = {
    authUser : PropTypes.object.isRequired,
  }
}

export { Person }
