import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  loading: false,
  recognition: null,
  recognitions: [],
  pagination: PaginationFactory()
})
