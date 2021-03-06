import axios from 'axios'

export const state = () => ({
  alerts: []
})

export const mutations = {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },
  PUSH_ALERT: (state, payload) => {
    state.alerts.push(payload)
  }
}

export const getters = {
  hasAlerts: state => state.alerts.length,
  alerts: state => state.alerts
}

export const actions = {
  pushAlert ({ commit }, payload) {
    commit('PUSH_ALERT', payload)
    setTimeout(() => {
      commit('REMOVE_ALERT', payload)
    }, 3800)
  },

  removeAlert ({ commit }, payload) {
    commit('REMOVE_ALERT', payload)
  },

  service ({ getters }, Service) {
    const axiosInstance = axios.create()
    axiosInstance.interceptors.response.use((response) => {
      return response
    }, error => Promise.reject(error))

    const authorization = getters['current-user/authorization']
    if (authorization) {
      axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + authorization
    }

    axiosInstance.defaults.headers['Content-Language'] = this.$cookies.get('app_current_lang') || 'en'
    axiosInstance.defaults.headers['Access-Control-Allow-Origin'] = '*'

    return new Service(axiosInstance)
  },

  async nuxtServerInit ({ commit, dispatch }) {
    const authorizationCookie = this.$cookies.get('authorization')
    await commit('current-user/SET_AUTHORIZATION', authorizationCookie)

    if (authorizationCookie) {
      await dispatch('current-user/setCurrentUser', authorizationCookie)
    }
  }
}
