export interface IRecognition {
  id?: string | number
  originIp: string
  epochTime: string
  plate: string
  confidence: number
  hasError: boolean
  accessGranted: boolean
  errorDetails: any
  driverName: string
  identifier?: boolean
  authorize?: boolean
  modelCar?: string
  userAvatar?: string
  trace?: string
}

export default class Recognition {
  public id?: string | number
  public originIp: string
  public epochTime: string
  public plate: string
  public confidence: number
  public hasError: boolean
  public accessGranted: boolean
  public errorDetails: any
  public driverName: string
  public identifier?: boolean
  public authorize?: boolean
  public modelCar?: string
  public userAvatar?: string
  public trace?: string

  constructor (props: IRecognition) {
    this.id = props.id
    this.originIp = props.originIp
    this.epochTime = props.epochTime
    this.plate = props.plate
    this.confidence = props.confidence
    this.hasError = props.hasError
    this.accessGranted = props.accessGranted
    this.errorDetails = props.errorDetails
    this.driverName = props.driverName
    this.identifier = props.identifier
    this.authorize = props.authorize
    this.modelCar = props.modelCar
    this.userAvatar = props.userAvatar
    this.trace = props.trace
  }
}
