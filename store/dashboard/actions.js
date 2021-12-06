import { DashboardService, routes } from '@@/services'

export default {
  setLoading ({ commit }, loading) {
    commit('SET_LOADING', loading)
  },

  async getWorkstationsWithRecognitions ({ dispatch, commit }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', DashboardService, { root: true })
    return await service.getWorkstationsWithRecognitions(routes.getWorkstationsWithRecognitions)
      .then(response => commit('SET_WORKSTATIONS', response.data))
      .finally(() => dispatch('setLoading', false))
  },

  async getGroupedCarsByStatus ({ dispatch, commit }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', DashboardService, { root: true })
    return await service.getGroupedCarsByStatus(routes.getGroupedCarsByStatus)
      .then(response => commit('SET_GROUPED_CARS', response.data))
      .finally(() => dispatch('setLoading', false))
  },

  async getLastDaysRecognitions ({ dispatch, commit }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', DashboardService, { root: true })
    return await service.getLastDaysRecognitions(routes.getLastDaysRecognitions)
      .then(response => commit('SET_LAST_DAYS_RECOGNITIONS', response.data))
      .finally(() => dispatch('setLoading', false))
  },

  async getGroupedUsersByType ({ dispatch, commit }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', DashboardService, { root: true })
    return await service.getGroupedUsersByType(routes.getGroupedUsersByType)
      .then(response => commit('SET_GROUPED_USERS', response.data))
      .finally(() => dispatch('setLoading', false))
  }
}
