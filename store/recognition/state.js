import { PaginationFactory } from '~/entity/factories/PaginationFactory'

export default () => ({
  loading: false,
  recognition: {
    confidence: 92.01182,
    driverName: 'Fulano de tal',
    identifier: true,
    authorized: true,
    modelCar: 'Gol',
    plate: 'UTB-0010',
    userAvatar: 'http://res.cloudinary.com/xenonapp/image/upload/v1629230914/avatar/defaultUser.png'
  },
  recognitions: [],
  errorRecognitions: [],
  pagination: PaginationFactory(),
  errorPagination: PaginationFactory()
})
