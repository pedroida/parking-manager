export interface IWorkstation {
  id?: string | number
  name: string,
  ip: string,
  mode: string,
  port?: number,
  key?: string
}

export default class Workstation {
  id?: string | number
  name: string
  ip: string
  mode: string
  port?: number
  key?: string

  constructor (props: IWorkstation) {
    this.id = props.id
    this.name = props.name
    this.ip = props.ip
    this.mode = props.mode
    this.port = props.port
    this.key = props.key
  }
}
