import { useContext } from 'react'
import { AuthenticationContext } from './AuthenticationManager'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { appActions } from '@liquid-labs/catalyst-core-ui'

const mapDispatchToProps = (dispatch) => ({
  errorHandler : (msg) => dispatch(appActions.setErrorMessage(msg))
})
// TODO: once we refactor the error display stuff to use hooks, we can get rid
// of the 'connect' (obviously) and make errorHandler overrideable with the
// AppInfo display as the default.
// TODO: ditto for 'history' from 'withRouter'
const AccessChecker = withRouter(connect(null, mapDispatchToProps)(({history, check, errorHandler, children, ...props}) => {
  const authContext = useContext(AuthenticationContext)
  const result = check(authContext, props)

  if (result === true || (result && result.accessGranted === true)) {
    return typeof children === 'function' ? children(props) : children
  }
  else {
    const denialReason = (typeof result === 'string' && result) // the result may be a string describing the problem
      || (result && result.denialReason) // or an object
      || "Unauthorized or bad URL." // otherwise, we use the default
    const redirectPath = (result && result.redirectPath) || '/'

    errorHandler(denialReason)
    history.push(redirectPath)

    return null
  }
}))

export { AccessChecker }
