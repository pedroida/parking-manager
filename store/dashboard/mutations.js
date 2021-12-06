export default {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },

  SET_WORKSTATIONS: (state, workstations) => {
    state.workstations = workstations
  },

  SET_GROUPED_CARS: (state, groupedCars) => {
    state.groupedCars = groupedCars
  },

  SET_GROUPED_USERS: (state, groupedUsers) => {
    state.groupedUsers = groupedUsers
  },

  SET_LAST_DAYS_RECOGNITIONS: (state, lastDaysRecognitions) => {
    state.lastDaysRecognitions = lastDaysRecognitions
  }
}
