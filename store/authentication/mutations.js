export default {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },
}
