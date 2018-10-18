import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { branch, compose, lifecycle, mapProps, renderNothing, withProps } from 'recompose'

import { appActions } from '@liquid-labs/catalyst-app-core'

import pick from 'lodash.pick'

const mapDispatchToProps = (dispatch) => ({
  setErrorMessage: (msg) => dispatch(appActions.setErrorMessage(msg))
})

export const checkAccess = (accessCheck) =>
  compose(
    withProps((props) => {
      const result = accessCheck(props)
      const resultProps = {
        accessGranted: false,
        denialReason: "Unauthorized or bad URL.",
        redirectPath: '/'
      }
      if (result === true) {
        resultProps.accessGranted = true
      }
      else if (typeof result === 'string') {
        resultProps.denialReason = result
      }
      else {
        Object.assign(resultProps, pick(result, 'accessGranted', 'denialReason', 'redirectPath'))
      }
      // TODO: check that denialReason not set to null, undefined, or empty string.

      return resultProps
    }),
    branch(({accessGranted}) => !accessGranted,
      // Only need these if we have an error.
      compose(
        withRouter,
        connect(null, mapDispatchToProps),
        lifecycle({
          componentDidMount() {
            const { accessGranted, denialReason, redirectPath,
              setErrorMessage, history } = this.props
            if (!accessGranted) {
              setErrorMessage(denialReason)
              history.push(redirectPath)
            }
          }
        }),
        renderNothing,
      ),
      // clean up the access info stuff; notice that since the other props are
      // only added as needed, this effectively means no prop changes on success.
      mapProps(({accessGranted, denialReason, redirectPath, ...props}) => props)
    )
  )
