export const login = async(user:any) => {
  window.sessionStorage.setItem(
    'loggedUser',
    JSON.stringify(user)
  )
}

export const logout = async() => {
  window.sessionStorage.removeItem(
    'loggedUser'
  )
}