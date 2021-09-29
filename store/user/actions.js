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
  }
}
