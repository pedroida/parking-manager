import { UserService, routes } from '@@/services'

export default {

  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },

  setPagination ({ commit }, data) {
    commit('SET_PAGINATION', {
      totalElements: data.totalElements,
      totalPage: data.totalPage
    })
  },

  setLoading ({ commit }, loading) {
    commit('SET_LOADING', loading)
  },

  setCarLoading ({ commit }, loading) {
    commit('SET_CAR_LOADING', loading)
  },

  async getUsers ({ dispatch, commit, getters }) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.getUsers(routes.getUsers, getters.pagination)
      .then((response) => {
        commit('SET_USERS', response.data.items)
        dispatch('setPagination', response.data)
        return response.data
      })
  },

  async getUser ({ dispatch, commit }, id) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.getUser(routes.getUser(id))
      .then((response) => {
        commit('SET_USER', response.data)
        return response.data
      })
  },

  async createUser ({ dispatch, commit }, payload) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.createUser(routes.createUser, payload)
      .then((response) => {
        commit('SET_USER_ON_LIST', response.data)
        return response.data
      })
  },

  async editUser ({ dispatch }, payload) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.editUser(routes.editUser(payload.id), payload)
      .then((response) => {
        return response.data
      })
  },

  async disableUser ({ dispatch, commit }, payload) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.disableUser(routes.disableUser, payload)
      .then((response) => {
        commit('UPDATE_USER_DISABLED', payload)
        return response.data
      })
  },

  async getCars ({ dispatch, commit }, userId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.getCars(routes.getCars(userId))
      .then((response) => {
        commit('SET_CARS', response.data)
        return response.data
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  },

  async getCarDoc ({ dispatch }, carId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.getCarDoc(routes.getCarDoc(carId))
      .then((response) => {
        return response.data.uri
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  },

  async approveCar ({ dispatch }, carId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.approveCar(routes.approveCar(carId))
      .then((response) => {
        console.log(response)
        return response.data
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  },

  async reproveCar ({ dispatch }, carId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.reproveCar(routes.reproveCar(carId))
      .then((response) => {
        console.log(response)
        return response.data
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  }

}
