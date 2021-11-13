import Car from '~/entity/Car'

export function CarFactory (
  plateCar: string = '',
  modelCar: string = '',
  numberAccess: number = 0,
  lastAccess: string = '',
  authorisedAccess: boolean = true,
  status: string = 'WAITING',
  document: string | undefined = undefined
): Car {
  return new Car({
    plateCar,
    modelCar,
    numberAccess,
    lastAccess,
    authorisedAccess,
    status,
    document
  })
}
