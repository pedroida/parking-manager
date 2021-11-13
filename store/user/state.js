import { UserFactory } from '~/entity/factories/UserFactory'
import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  loading: false,
  carLoading: false,
  user: UserFactory(),
  users: [],
  cars: [],
  pagination: PaginationFactory()
})
