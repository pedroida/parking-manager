import { WorkstationService } from '@@/services'
import routes from '@@/services/ApiRoutes'
import webstomp from 'webstomp-client'

export default {

  setWorkstation ({ commit }, workstation) {
    commit('SET_WORKSTATION', workstation)
  },

  setLastRecognition ({ commit }, recognition) {
    commit('SET_LAST_RECOGNITION', recognition)
  },

  resetLastRecognitions ({ commit }) {
    commit('RESET_LAST_RECOGNITIONS')
  },

  async getWorkstations ({ dispatch, commit }) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.getWorkstations(routes.getWorkstations)
      .then((response) => {
        commit('SET_WORKSTATIONS', response.data)
        return response.data
      })
  },

  async getWorkstation ({ dispatch, commit }, workstationId) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.getWorkstation(routes.getWorkstation(workstationId))
      .then((response) => {
        commit('SET_WORKSTATION', response.data)
        return response.data
      })
  },

  async createWorkstation ({ dispatch, commit }, workstation) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.createWorkstation(routes.createWorkstation, workstation)
      .then((response) => {
        commit('SET_WORKSTATION', response.data)
        commit('ADD_WORKSTATION', response.data)
        return response.data
      })
  },

  async updateWorkstation ({ dispatch, commit }, workstation) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.updateWorkstation(routes.handleWorkstation(workstation.id), workstation)
      .then((response) => {
        commit('SET_WORKSTATION', response.data)
        commit('SET_WORKSTATION_ON_LIST', response.data)
        return response.data
      })
  },

  async removeWorkstation ({ dispatch, commit }, workstation) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.removeWorkstation(routes.handleWorkstation(workstation.id))
      .then((response) => {
        commit('REMOVE_WORKSTATION_FROM_LIST', workstation)
        return response.data
      })
  },

  listenWebsocket ({ rootGetters, dispatch }, workstationId) {
    const token = `Bearer ${rootGetters['current-user/authorization']}`
    const headers = { Authorization: token }

    const socket = new window.SockJS(process.env.STOMP_URL || 'http://localhost:8080/api/ws')
    const stomp = webstomp.over(socket, {
      protocols: ['v10.stomp']
    })
    stomp.connect(headers, () => {
      stomp.subscribe(`/topic/change-workstation/${workstationId}`, function (data) {
        dispatch('setWorkstation', JSON.parse(data.body).workstation)
      })
      stomp.subscribe(`/topic/workstation/${workstationId}/recognizer`, function (data) {
        const newRecognition = JSON.parse(data.body)
        dispatch('recognition/setRecognition', JSON.parse(data.body), { root: true })
        dispatch('setLastRecognition', newRecognition)
      })
    })
  }
}
