import { AppFrame } from '@liquid-labs/catalyst-core-ui'

import { manageAuthentication } from '../hocs/manageAuthentication'

const AuthenticatingAppFrame = manageAuthentication(AppFrame)

export { AuthenticatingAppFrame }
