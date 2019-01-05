const INITIAL_STATE = {
  authUser  : null,
  authToken : null,
  claims    : []
};

export function sessionReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
  case 'LOG_IN' :
    return {
      ...state,
      authUser  : action.authUser,
      authToken : action.tokenInfo.token,
      claims    : action.tokenInfo.claims
    }
  case ('LOG_OUT'):
    return INITIAL_STATE
  case ('RESET'):
    return INITIAL_STATE
  default : return state
  }
}
