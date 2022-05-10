import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  loading: false,
  recognition: null,
  recognitions: [],
  errorRecognitions: [],
  errorRecognition: null,
  pagination: PaginationFactory(),
  errorPagination: PaginationFactory()
})
