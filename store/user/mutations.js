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

  SET_FILTER_PAGINATION: (state, pagination) => {
    state.pagination.nameOrEmail = pagination.nameOrEmail
    state.pagination.type = pagination.type
    state.pagination.page = 0
  },

  SET_USER_RECOGNITIONS_PAGINATION: (state, recognitionsPagination) => {
    state.recognitionsPagination = merge(state.recognitionsPagination, recognitionsPagination)
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_USER_RECOGNITIONS: (state, recognitions) => {
    state.recognitions = recognitions
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
  },

  UPDATE_CAR_STATUS: (state, currentCar) => {
    state.cars = state.cars.map((car) => {
      if (String(car.id) === String(currentCar.id)) {
        car.status = currentCar.status
      }

      return car
    })
  }
}
