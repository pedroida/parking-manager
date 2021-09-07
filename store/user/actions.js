import AuthenticationService from '@@/services/Authentication'
import UserService from '@@/services/User'
import routes from '@@/services/ApiRoutes'

export default {
  async setAuthorization ({ commit }, token) {
    await commit('SET_AUTHORIZATION', token)
  },

  async setCurrentUser ({ commit }, token) {
    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    await commit('SET_CURRENT_USER', decodedToken.user)
  },

  async login ({ dispatch }, payload) {
    const service = await dispatch('service', AuthenticationService, { root: true })
    return service.login(routes.login, payload)
      .then((response) => {
        const token = response.data.data.token
        this.$cookies.set('authorization', token)
        dispatch('setAuthorization', token)
        dispatch('setCurrentUser', token)

        return true
      })
      .catch(() => {
        return false
      })
  },

  async logout ({ commit }) {
    await commit('REMOVE_AUTHORIZATION')
    await commit('SET_CURRENT_USER', null)
    this.$cookies.remove('authorization')
  },

  async addCarToCurrentUser ({ commit }, car) {
    await commit('ADD_CAR_TO_CURRENT_USER', car)
  },

  async removeCarFromCurrentUser ({ commit }, car) {
    await commit('REMOVE_CAR_FROM_CURRENT_USER', car)
  },

  async getCurrentUser ({ dispatch, commit }) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.me(routes.me)
      .then((response) => {
        commit('SET_CURRENT_USER', response.data)
        return response.data
      })
  },

  async requestPassword ({ dispatch }, payload) {
    const service = await dispatch('service', AuthenticationService, { root: true })
    return await service.requestPassword(routes.requestPassword, payload)
  },

  async register ({ dispatch }, payload) {
    const service = await dispatch('service', AuthenticationService, { root: true })
    return await service.register(routes.requestRegister, payload)
  },

  async activateUser ({ dispatch }, payload) {
    const service = await dispatch('service', AuthenticationService, { root: true })
    return await service.activateUser(routes.activateUser, payload)
  },

  async updateName ({ dispatch, commit }, name) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.updateName(routes.updateName, name)
      .then((response) => {
        commit('SET_CURRENT_USER_NAME', response.data.name)
        return response.data.name
      })
  },

  async updatePassword ({ dispatch }, payload) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.updatePassword(routes.updatePassword, payload)
      .then(() => {
        dispatch('logout')
      })
  },

  async profileNewCar ({ dispatch }, payload) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.profileNewCar(routes.profileNewCar, payload)
      .then((response) => {
        dispatch('addCarToCurrentUser', response.data)
      })
  },

  async profileRemoveCar ({ dispatch }, car) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.profileRemoveCar(routes.profileRemoveCar, car)
      .then(() => {
        dispatch('removeCarFromCurrentUser', car.plateCar)
      })
  },

  async profileDisableAccount ({ dispatch }) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.profileDisableAccount(routes.profileDisableAccount)
      .then((response) => {
        dispatch('logout')
        return response
      })
  },

  async profileUpdateAvatar ({ dispatch, commit }, avatar) {
    const service = await dispatch('service', UserService, { root: true })
    return await service.updateAvatar(routes.updateAvatar, avatar)
      .then((response) => {
        commit('SET_CURRENT_USER', response.data)
        return response
      })
  }
}
