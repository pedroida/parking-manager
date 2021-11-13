export interface IRecognition {
  id?: string | number
  originIp: string,
  epochTime: string,
  plate: string,
  confidence: number,
  hasError: boolean,
  accessGranted: boolean,
  errorDetails: any
  driverName: string
}

export default class Recognition {
  id?: string | number
  originIp: string
  epochTime: string
  plate: string
  confidence: number
  hasError: boolean
  accessGranted: boolean
  errorDetails: any
  driverName: string

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
  }
}
