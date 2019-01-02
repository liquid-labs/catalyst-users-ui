import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { appActions } from '@liquid-labs/catalyst-core-ui'
import * as sessionActions from '../../actions/sessionActions'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

const mapDispatchToProps = (dispatch) => ({
  logIn           : (authUser, tokenInfo) => dispatch(sessionActions.logIn(authUser, tokenInfo)),
  logOut          : () => dispatch(sessionActions.logOut()),
  setErrorMessage : (errorMsg) => dispatch(appActions.setErrorMessage(errorMsg)),
})

const manageAuthentication = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { logIn, logOut, setErrorMessage, history, location, postLoginStatusChangeUrl, postLoginUrl, postLogoutUrl } = this.props

      fireauth.onAuthStateChanged((authUser) => {
        if (authUser) {
          authUser.getIdTokenResult().then(function(tokenInfo) {
            logIn(authUser, tokenInfo)
          }).catch(function(error) {
            console.warn(error) // eslint-disable-line no-console
            setErrorMessage("Could not get token info; login invalidated.")
            logOut()

            history.push(postLoginUrl || postLoginStatusChangeUrl || '/')
          })
        }
        else {
          logOut()
          if (location.pathname !== postLogoutUrl) {history.push(postLogoutUrl || postLoginStatusChangeUrl || '/')}
        }
      })
    }
  })
)

export { manageAuthentication }
