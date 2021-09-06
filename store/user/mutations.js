export default {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },
  SET_AUTHORIZATION: (state, token) => {
    state.authorization = token
  },
  SET_CURRENT_USER: (state, user) => {
    state.currentUser = user
  },
  REMOVE_AUTHORIZATION: (state) => {
    state.authorization = null
  }
}
