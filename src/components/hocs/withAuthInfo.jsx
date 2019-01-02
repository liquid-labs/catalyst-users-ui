import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CenteredProgress } from '@liquid-labs/mui-extensions'

export const withAuthInfo = (Component) => {
  class WithAuthInfo extends React.Component {
    render() {
      return (
        <React.Fragment>
          { !this.props.authResolved && <CenteredProgress /> }
          { this.props.authResolved && <Component {...this.props} />}
        </React.Fragment>
      )
    }
  }

  WithAuthInfo.propTypes = {
    authResolved : PropTypes.bool.isRequried
  }

  const mapStateToProps = (state) => ({
    authResolved : state.sessionState.authResolved,
    authUser     : state.sessionState.authUser,
    authToken    : state.sessionState.authToken,
    claims       : state.sessionState.claims
  });

  return connect(mapStateToProps)(WithAuthInfo);
}
