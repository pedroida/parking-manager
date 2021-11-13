import { RecognitionService, routes } from '@@/services'

export default {

  setRecognition ({ commit }, recognition) {
    commit('SET_RECOGNITION', recognition)
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

  async getRecognitions ({ dispatch, commit, getters }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', RecognitionService, { root: true })
    return await service.getRecognitions(routes.getRecognitions, getters.pagination)
      .then((response) => {
        commit('SET_RECOGNITIONS', response.data.items)
        dispatch('setPagination', response.data)
        return response.data
      }).finally(() => {
        dispatch('setLoading', false)
      })
  }
}
