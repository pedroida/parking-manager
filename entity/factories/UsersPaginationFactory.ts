import UsersPagination from '~/entity/UsersPagination'

export function UsersPaginationFactory (
  direction: string = 'desc',
  page: number = 0,
  size: number = 5,
  sorted: string = '',
  totalElements: number = 0,
  totalPage: number = 0,
  nameOrEmail?: string,
  type?: string
): UsersPagination {
  return new UsersPagination({
    direction,
    page,
    size,
    sorted,
    totalElements,
    totalPage,
    nameOrEmail,
    type
  })
}
