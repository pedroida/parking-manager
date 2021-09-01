export const state = () => ({
  alerts: [],
})

export const mutations = {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },
}

export const getters = {
  hasAlerts: state => state.alerts.length
}

export const actions = {
  removeAlert ({ commit }, payload) {
    commit('REMOVE_ALERT', payload)
  },
}
