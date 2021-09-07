export default {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },
  SET_AUTHORIZATION: (state, token) => {
    state.authorization = token
  },
  SET_CURRENT_USER: (state, user) => {
    if (!user.cars) {
      user.cars = []
    }
    state.currentUser = user
  },
  ADD_CAR_TO_CURRENT_USER: (state, car) => {
    state.currentUser.cars.unshift(car)
  },
  REMOVE_CAR_FROM_CURRENT_USER: (state, car) => {
    const carIndex = state.currentUser.cars.findIndex(userCar => userCar.plateCar === car.plateCar)
    state.currentUser.cars = state.currentUser.cars.splice(carIndex, 1)
  },
  REMOVE_AUTHORIZATION: (state) => {
    state.authorization = null
  }
}
