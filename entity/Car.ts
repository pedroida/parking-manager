export interface ICar {
  id?: string | number
  modelCar: string
  plateCar: string
  numberAccess?: number
  lastAccess?: string
  document?: string
}

export default class Car {
  modelCar: string
  plateCar: string
  numberAccess?: number
  document?: string
  lastAccess?: string

  constructor (props: ICar) {
    this.modelCar = props.modelCar
    this.plateCar = props.plateCar
    this.numberAccess = props.numberAccess || 0
    this.document = props?.document
    this.lastAccess = props?.lastAccess
  }
}
