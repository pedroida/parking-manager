export interface ICar {
  id?: string | number
  modelCar: string
  plateCar: string
  numberAccess?: number
  lastAccess?: string
  authorisedAccess?: boolean
}

export default class Car {
  id?: string | number
  modelCar: string
  plateCar: string
  numberAccess?: number
  lastAccess?: string
  authorisedAccess?: boolean

  constructor (props: ICar) {
    this.id = props.id
    this.modelCar = props.modelCar
    this.plateCar = props.plateCar
    this.numberAccess = props.numberAccess || 0
    this.lastAccess = props?.lastAccess
    this.authorisedAccess = props.authorisedAccess
  }
}
