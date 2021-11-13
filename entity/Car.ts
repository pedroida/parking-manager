export interface ICar {
  id?: string | number
  modelCar: string
  plateCar: string
  numberAccess?: number
  lastAccess?: string
  authorisedAccess?: boolean
  status: string
  document?: string
}

export default class Car {
  public id?: string | number
  public modelCar: string
  public plateCar: string
  public numberAccess?: number
  public lastAccess?: string
  public authorisedAccess?: boolean
  public status: string
  public document?: string

  constructor (props: ICar) {
    this.id = props.id
    this.modelCar = props.modelCar
    this.plateCar = props.plateCar
    this.numberAccess = props.numberAccess || 0
    this.lastAccess = props?.lastAccess
    this.authorisedAccess = props.authorisedAccess
    this.status = props.status
    this.document = props.document
  }
}
