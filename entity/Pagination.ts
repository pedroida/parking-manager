export interface IPagination {
  direction?: string
  page: number
  size: number
  sorted?: string
  totalElements: number
  totalPage: number
}

export default class Pagination implements IPagination {
  public direction?: string
  public page: number
  public size: number
  public sorted?: string
  public totalElements: number
  public totalPage: number

  constructor (props: IPagination) {
    this.direction = props?.direction
    this.page = props.page
    this.size = props.size
    this.sorted = props?.sorted
    this.totalElements = props.totalElements
    this.totalPage = props.totalPage
  }
}
