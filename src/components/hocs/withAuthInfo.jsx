import { connect } from 'react-redux'

export const withAuthInfo = (Component) => {
  const mapStateToProps = (state) => ({
    authUser  : state.sessionState.authUser,
    authToken : state.sessionState.authToken,
    claims    : state.sessionState.claims
  })

  return connect(mapStateToProps)(Component)
}
