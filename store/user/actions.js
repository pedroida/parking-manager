import { UserService, routes } from '@@/services'

export default {

  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },

  setPagination ({ commit }, data) {
    commit('SET_PAGINATION', {
      nameOrEmail: data.nameOrEmail,
      type: data.type,
      totalElements: data.totalElements,
      totalPage: data.totalPage
    })
  },

  setRecognitionsPagination ({ commit }, data) {
    commit('SET_USER_RECOGNITIONS_PAGINATION', {
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
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.getUsers(routes.getUsers, getters.pagination)
      .then((response) => {
        commit('SET_USERS', response.data.items)
        dispatch('setPagination', response.data)
        return response.data
      }).finally(() => dispatch('setLoading', false))
  },

  async getUser ({ dispatch, commit }, id) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.getUser(routes.getUser(id))
      .then((response) => {
        commit('SET_USER', response.data)
        return response.data
      })
  },

  async getUserRecognitions ({ dispatch, commit, getters }, id) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.getUserRecognitions(routes.getUserRecognitions(id), getters.recognitionsPagination)
      .then((response) => {
        commit('SET_USER_RECOGNITIONS', response.data.items)
        dispatch('setRecognitionsPagination', response.data)
        return response.data
      }).finally(() => dispatch('setLoading', false))
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

  async approveCar ({ dispatch, commit }, carId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.approveCar(routes.approveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'APPROVED'
        })
        return response.data
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  },

  async reproveCar ({ dispatch, commit }, carId) {
    dispatch('setCarLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.reproveCar(routes.reproveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'REPROVED'
        })
        return response.data
      }).finally(() => {
        dispatch('setCarLoading', false)
      })
  }

}
