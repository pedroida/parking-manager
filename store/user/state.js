import { UserFactory } from '~/entity/factories/UserFactory'
import { PaginationFactory } from '~/entity/factories/PaginationFactory'
import { UsersPaginationFactory } from '~/entity/factories/UsersPaginationFactory'

export default () => ({
  loading: false,
  carLoading: false,
  user: UserFactory(),
  users: [],
  cars: [],
  pagination: UsersPaginationFactory(),
  recognitionsPagination: PaginationFactory(),
  recognitions: []
})
