export interface IUsersPagination {
  direction?: string
  page: number
  size: number
  sorted?: string
  totalElements: number
  totalPage: number
  nameOrEmail?: string
  type?: string
}

export default class UsersPagination implements IUsersPagination {
  public direction?: string
  public page: number
  public size: number
  public sorted?: string
  public totalElements: number
  public totalPage: number
  public nameOrEmail?: string
  public type?: string

  constructor (props: IUsersPagination) {
    this.direction = props?.direction
    this.page = props.page
    this.size = props.size
    this.sorted = props?.sorted
    this.totalElements = props.totalElements
    this.totalPage = props.totalPage
    this.nameOrEmail = props.nameOrEmail
    this.type = props.type
  }
}
