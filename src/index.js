export * from './components/ui/PasswordChange'
export * from './components/ui/PasswordForget'
export * from './components/ui/SignIn'
export * from './components/ui/SignOut'
export * from './components/ui/SignUp'
export * from './components/ui/UserAccount'

export * from './components/hocs/checkAccess'
export * from './components/hocs/withAuthInfo'

export * from './reducers/sessionReducer'
import * as sessionActions from './actions/sessionActions'
export { sessionActions }



/*import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        Example Component: {text}
      </div>
    )
  }
}*/
