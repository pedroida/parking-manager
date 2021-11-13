import { merge } from 'lodash'

export default {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },
  SET_CAR_LOADING: (state, loading) => {
    state.carLoading = loading
  },

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

  SET_CARS: (state, cars) => {
    state.cars = cars
  },

  UPDATE_USER_DISABLED: (state, payload) => {
    state.users = state.users.map((currentUser) => {
      if (currentUser.id === payload.userId) {
        currentUser.enabled = false
        currentUser.disableReason = payload.reason
      }

      return currentUser
    })
  }
}
