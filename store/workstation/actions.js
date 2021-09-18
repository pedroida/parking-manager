import { WorkstationService } from '@@/services'
import routes from '@@/services/ApiRoutes'

export default {

  setWorkstation ({ commit }, workstation) {
    commit('SET_WORKSTATION', workstation)
  },

  async getWorkstations ({ dispatch, commit }) {
    const service = await dispatch('service', WorkstationService, { root: true })
    return await service.getWorkstations(routes.getWorkstations)
      .then((response) => {
        commit('SET_WORKSTATIONS', response.data)
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
  }
}
