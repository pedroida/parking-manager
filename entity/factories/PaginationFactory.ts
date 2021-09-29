import Pagination from '~/entity/Pagination'

export function PaginationFactory (
  direction: string = 'desc',
  page: number = 0,
  size: number = 15,
  sorted: string = '',
  totalElements: number = 0,
  totalPage: number = 0
): Pagination {
  return new Pagination({
    direction,
    page,
    size,
    sorted,
    totalElements,
    totalPage
  })
}
