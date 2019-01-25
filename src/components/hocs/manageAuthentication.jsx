import { compose, lifecycle, withState } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { appActions } from '@liquid-labs/catalyst-core-ui'
import * as sessionActions from '../../actions/sessionActions'

import { withAwait } from '@liquid-labs/catalyst-core-ui'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

const mapDispatchToProps = (dispatch) => ({
  logIn           : (authUser, tokenInfo) => dispatch(sessionActions.logIn(authUser, tokenInfo)),
  logOut          : () => dispatch(sessionActions.logOut()),
  setErrorMessage : (errorMsg) => dispatch(appActions.setErrorMessage(errorMsg)),
})

const manageAuthentication = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withState('authStatusChecked', 'setAuthStatusChecked', false),
  lifecycle({
    componentDidMount() {
      const { logIn, logOut,
        setAuthStatusChecked, setErrorMessage,
        history, location, postLoginStatusChangeUrl, postLoginUrl, postLogoutUrl } = this.props

      fireauth.onAuthStateChanged((authUser) => {
        if (authUser) {
          authUser.getIdTokenResult().then(function(tokenInfo) {
            logIn(authUser, tokenInfo)
          })
          .catch(function(error) {
            console.warn('Error getting authentication token', error) // eslint-disable-line no-console
            setErrorMessage("Could not get token info; login invalidated.")
            logOut()

            history.push(postLoginUrl || postLoginStatusChangeUrl || '/')
          })
          .finally(
            () => setAuthStatusChecked(true)
          )
        }
        else {
          logOut()
          setAuthStatusChecked(true)
          if (location.pathname !== postLogoutUrl) {history.push(postLogoutUrl || postLoginStatusChangeUrl || '/')}
        }
      })
    }
  }),
  withAwait(({authStatusChecked}) => !authStatusChecked)
)

export { manageAuthentication }
