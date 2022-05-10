import { IRecognition } from '~/entity/Recognition'

export interface IWorkstation {
  id?: string | number
  name: string,
  ip: string,
  mode: string,
  port?: number,
  key?: string,
  lastRecognitions?: IRecognition[]
}

export default class Workstation {
  id?: string | number
  name: string
  ip: string
  mode: string
  port?: number
  key?: string
  lastRecognitions?: IRecognition[]

  constructor (props: IWorkstation) {
    this.id = props.id
    this.name = props.name
    this.ip = props.ip
    this.mode = props.mode
    this.port = props.port
    this.key = props.key
    this.lastRecognitions = props.lastRecognitions || []
  }
}
