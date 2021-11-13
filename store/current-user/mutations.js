export default {
  REMOVE_ALERT: (state, payload) => {
    state.alerts.splice(state.alerts.indexOf(payload), 1)
  },

  SET_AUTHORIZATION: (state, token) => {
    state.authorization = token
  },

  SET_CURRENT_USER_NAME: (state, name) => {
    state.currentUser.name = name
  },

  SET_CURRENT_USER: (state, user) => {
    if (typeof user === 'string') {
      user = JSON.parse(user)
    }

    if (user && !user.cars) {
      user.cars = []
    }
    state.currentUser = user
  },

  ADD_CAR_TO_CURRENT_USER: (state, car) => {
    state.currentUser.cars.unshift(car)
  },

  REMOVE_CAR_FROM_CURRENT_USER: (state, car) => {
    const carIndex = state.currentUser.cars.findIndex(userCar => userCar.plateCar === car.plateCar)
    state.currentUser.cars.splice(carIndex, 1)
  },

  REMOVE_AUTHORIZATION: (state) => {
    state.authorization = null
  },

  UPDATE_CAR_STATUS_AFTER_POST_DOC: (state, carId) => {
    state.currentUser.cars = state.currentUser.cars.map((car) => {
      if (String(car.id) === String(carId)) {
        car.status = 'WAITING'
        car.document = 'sent_doc'
      }

      return car
    })
  }
}
