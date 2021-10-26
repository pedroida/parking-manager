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
        commit('REMOVE_USER_FROM_LIST', payload.userId)
        return response.data
      })
  }
}
