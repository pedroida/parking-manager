import { RecognitionService, routes } from '@@/services'

export default {

  setRecognition ({ commit }, recognition) {
    console.log('recognition', recognition)
    commit('SET_RECOGNITION', recognition)
  },

  setPagination ({ commit }, data) {
    commit('SET_PAGINATION', {
      totalElements: data.totalElements,
      totalPage: data.totalPage
    })
  },

  setErrorsPagination ({ commit }, data) {
    commit('SET_ERRORS_PAGINATION', {
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
  },

  async getErrorRecognitions ({ dispatch, commit, getters }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', RecognitionService, { root: true })
    return await service.getErrorRecognitions(routes.getErrorRecognitions, getters.errorPagination)
      .then((response) => {
        commit('SET_ERROR_RECOGNITIONS', response.data.items)
        dispatch('setErrorsPagination', response.data)
        return response.data
      }).finally(() => {
        dispatch('setLoading', false)
      })
  }
}
