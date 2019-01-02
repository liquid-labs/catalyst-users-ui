export const logIn = (authUser, tokenInfo) => ({
  type      : 'LOG_IN',
  authUser  : authUser,
  tokenInfo : tokenInfo
})

export const logOut = () => ({ type : 'LOG_OUT' })
