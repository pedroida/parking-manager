import { merge } from 'lodash'

export default {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },

  SET_PAGINATION: (state, pagination) => {
    state.pagination = merge(state.pagination, pagination)
  },

  SET_CARS: (state, cars) => {
    state.cars = cars
  },

  SET_HAS_CARS_WAITING: (state, hasCarsWaiting) => {
    state.hasCarsWaiting = hasCarsWaiting
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
