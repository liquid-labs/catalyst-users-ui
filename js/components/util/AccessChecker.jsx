import { useContext } from 'react'
import { FeedbackContext, useAuthenticationStatus } from '@liquid-labs/catalyst-core-ui'
import { withRouter } from 'react-router-dom'

const AccessChecker = withRouter(({history, check, children, ...props}) => {
  const authStatus = useAuthenticationStatus()
  const { addErrorMessage } = useContext(FeedbackContext)
  const result = check(authStatus, props)

  if (result === true || (result && result.accessGranted === true)) {
    return typeof children === 'function' ? children(props) : children
  }
  else {
    const denialReason = (typeof result === 'string' && result) // the result may be a string describing the problem
      || (result && result.denialReason) // or an object
      || "Unauthorized or bad URL." // otherwise, we use the default
    const redirectPath = (result && result.redirectPath) || '/'

    addErrorMessage(denialReason)
    history.push(redirectPath)

    return null
  }
})

export { AccessChecker }
