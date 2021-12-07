import Car from './Car'
import Role from './Role'

export interface IUser {
  id?: string | number
  cars?: Car[]
  roles?: Role[]
  name: string
  type: string
  email: string
  avatar?: string
  password?: string
  confirmPassword?: string
  disableReason?: string
  authorisedAccess: boolean
  enabled: boolean
}

export default class User {
  public id?: string | number
  public name: string
  public type: string
  public email: string
  public avatar?: string
  public authorisedAccess: boolean
  public enabled: boolean
  public password?: string
  public confirmPassword?: string
  public disableReason?: string
  public cars?: Car[]
  public roles?: Role[]

  constructor (props: IUser) {
    this.id = props.id
    this.name = props.name
    this.type = props.type || 'STUDENTS'
    this.email = props.email
    this.password = props.password
    this.confirmPassword = props.confirmPassword
    this.cars = props.cars
    this.roles = props.roles || []
    this.avatar = props.avatar
    this.disableReason = props.disableReason
    this.enabled = props.enabled || false
    this.authorisedAccess = props.authorisedAccess || false
  }
}
