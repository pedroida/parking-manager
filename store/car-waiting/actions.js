import { CarWaitingService, UserService, routes } from '@@/services'

export default {
  setPagination ({ commit }, data) {
    commit('SET_PAGINATION', {
      totalElements: data.totalElements,
      totalPage: data.totalPage
    })
  },

  setLoading ({ commit }, loading) {
    commit('SET_LOADING', loading)
  },

  async getCarsWaiting ({ dispatch, commit, getters }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', CarWaitingService, { root: true })
    return await service.getCarsWaiting(routes.getCarsWaiting, getters.pagination)
      .then((response) => {
        commit('SET_CARS', response.data.items)
        dispatch('setPagination', response.data)
        return response.data
      }).finally(() => dispatch('setLoading', false))
  },

  async getCarDoc ({ dispatch }, carId) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.getCarDoc(routes.getCarDoc(carId))
      .then((response) => {
        return response.data.uri
      }).finally(() => {
        dispatch('setLoading', false)
      })
  },

  async approveCar ({ dispatch, commit }, carId) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.approveCar(routes.approveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'APPROVED'
        })
        return response.data
      }).finally(() => {
        dispatch('setLoading', false)
      })
  },

  async reproveCar ({ dispatch, commit }, carId) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.reproveCar(routes.reproveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'REPROVED'
        })
        return response.data
      }).finally(() => {
        dispatch('setLoading', false)
      })
  }
}
