import { compose, withHandlers } from 'recompose'

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

import { fireauth } from '@liquid-labs/catalyst-firewrap'
import { appActions } from '@liquid-labs/catalyst-core-ui'


const mapDispatchToProps = (dispatch) => ({
  reset : () => dispatch(appActions.reset())
})

export const withLogout = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withHandlers({
    logout : ({reset, history}) => () => {
      fireauth.signOut().then(() => {
        reset()
        history.push('/')
      })
    }
  })
)
