import { merge } from 'lodash'

export default {
  SET_LOADING: (state, loading) => {
    state.loading = loading
  },

  SET_PAGINATION: (state, pagination) => {
    state.pagination = merge(state.pagination, pagination)
  },

  SET_ERRORS_PAGINATION: (state, pagination) => {
    state.errorPagination = merge(state.errorPagination, pagination)
  },

  SET_RECOGNITION: (state, recognition) => {
    state.recognition = recognition
  },

  SET_RECOGNITIONS: (state, recognitions) => {
    state.recognitions = recognitions
  },

  SET_ERROR_RECOGNITIONS: (state, errorRecognitions) => {
    state.errorRecognitions = errorRecognitions
  }
}
