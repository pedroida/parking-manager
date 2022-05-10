import { CarWaitingService, UserService, routes } from '@@/services'
import webstomp from 'webstomp-client'

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

  setHasCarsWaiting ({ commit }, payload) {
    commit('SET_HAS_CARS_WAITING', payload)
  },

  async getCarsWaiting ({ dispatch, commit, getters }) {
    dispatch('setLoading', true)
    const service = await dispatch('service', CarWaitingService, { root: true })
    return await service.getCarsWaiting(routes.getCarsWaiting, getters.pagination)
      .then((response) => {
        commit('SET_CARS', response.data.items)
        dispatch('setPagination', response.data)
        return response.data
      })
      .then(() => {
        dispatch('setHasCarsWaiting', !!getters.cars.find(car => car.status === 'WAITING'))
      })
      .finally(() => dispatch('setLoading', false))
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

  async approveCar ({ dispatch, commit, getters }, carId) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.approveCar(routes.approveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'APPROVED'
        })
        return response.data
      })
      .then(() => {
        dispatch('setHasCarsWaiting', !!getters.cars.find(car => car.status === 'WAITING'))
      })
      .finally(() => {
        dispatch('setLoading', false)
      })
  },

  async reproveCar ({ dispatch, commit, getters }, carId) {
    dispatch('setLoading', true)
    const service = await dispatch('service', UserService, { root: true })
    return await service.reproveCar(routes.reproveCar(carId))
      .then((response) => {
        commit('UPDATE_CAR_STATUS', {
          id: carId,
          status: 'REPROVED'
        })
        return response.data
      })
      .then(() => {
        dispatch('setHasCarsWaiting', !!getters.cars.find(car => car.status === 'WAITING'))
      })
      .finally(() => {
        dispatch('setLoading', false)
      })
  },

  listenWebsocket ({ rootGetters, dispatch }) {
    const token = `Bearer ${rootGetters['current-user/authorization']}`
    const headers = { Authorization: token }

    const socket = new window.SockJS(process.env.STOMP_URL || 'http://localhost:8080/api/ws')
    const stomp = webstomp.over(socket, {
      protocols: ['v10.stomp']
    })
    stomp.connect(headers, () => {
      stomp.subscribe('/topic/application/new-registry-car', function () {
        dispatch('setHasCarsWaiting', true)
      })
    })
  }
}
