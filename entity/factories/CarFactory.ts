import Car from '~/entity/Car'

export function CarFactory (
  plateCar: string = '',
  modelCar: string = '',
  numberAccess: number = 0,
  document: string = '',
  lastAccess: string = ''
): Car {
  return new Car({
    plateCar,
    modelCar,
    numberAccess,
    document,
    lastAccess
  })
}
