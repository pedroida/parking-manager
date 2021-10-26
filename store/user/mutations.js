import { merge } from 'lodash'

export default {
  SET_PAGINATION: (state, pagination) => {
    state.pagination = merge(state.pagination, pagination)
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_USER_ON_LIST: (state, user) => {
    state.users = state.users.map((currentUser) => {
      if (currentUser.id === user) {
        currentUser = user
      }

      return currentUser
    })
  },
  SET_USERS: (state, users) => {
    state.users = users
  },
  ADD_WORKSTATION: (state, workstation) => {
    state.workstations.push(workstation)
  },
  SET_WORKSTATION_ON_LIST: (state, workstation) => {
    state.workstations = state.workstations.map((currentWorkstation) => {
      if (+currentWorkstation.id === +workstation.id) {
        return workstation
      }
      return currentWorkstation
    })
  },
  REMOVE_WORKSTATION_FROM_LIST: (state, workstation) => {
    const index = state.workstations.findIndex((currentWorkstation) => {
      return currentWorkstation.id === workstation.id
    })

    state.workstations.splice(index, 1)
  }
}
