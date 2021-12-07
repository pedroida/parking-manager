import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  loading: false,
  cars: [],
  pagination: PaginationFactory()
})
