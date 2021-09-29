import { UserFactory } from '~/entity/factories/UserFactory'
import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  user: UserFactory(),
  users: [],
  pagination: PaginationFactory()
})
