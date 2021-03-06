export default {
  SET_WORKSTATION: (state, workstation) => {
    workstation.lastRecognitions = []
    state.workstation = workstation
  },
  SET_WORKSTATIONS: (state, workstations) => {
    state.workstations = workstations
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
  },

  SET_LAST_RECOGNITION: (state, recognition) => {
    if (state.workstation.lastRecognitions.length === 5) {
      state.workstation.lastRecognitions.pop()
    }

    state.workstation.lastRecognitions.unshift(recognition)
  },

  RESET_LAST_RECOGNITIONS: (state) => {
    state.workstation.lastRecognitions = []
  }
}
