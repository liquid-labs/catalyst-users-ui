import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { appActions } from '@liquid-labs/catalyst-core-ui'
import * as sessionActions from '../../actions/sessionActions'

import { fireauth } from '@liquid-labs/catalyst-firewrap'

const mapDispatchToProps = (dispatch) => ({
  signIn: (authUser, tokenInfo) => dispatch(sessionActions.signIn(authUser, tokenInfo)),
  signOut: () => dispatch(sessionActions.signOut()),
  setErrorMessage: (errorMsg) => dispatch(appActions.setErrorMessage(errorMsg)),
})

const manageAuthentication = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { signIn, signOut, setErrorMessage, history, location, postLoginStatusChangeUrl, postLoginUrl, postLogoutUrl } = this.props

      console.log("postLoginStatusChangeUrl: " + postLoginStatusChangeUrl)

      fireauth.onAuthStateChanged((authUser) => {
        if (authUser) {
          authUser.getIdTokenResult().then(function(tokenInfo) {
            signIn(authUser, tokenInfo)
          }).catch(function(error) {
            console.warn(error);
            setErrorMessage("Could not get token info; login invalidated.");
            signOut()

            history.push(postLoginUrl || postLoginStatusChangeUrl || '/')
          })
        }
        else {
          signOut()
          if (location.pathname !== postLogoutUrl)
            history.push(postLogoutUrl || postLoginStatusChangeUrl || '/')
        }
      })
    }
  })
)

export { manageAuthentication }
