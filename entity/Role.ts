export interface IRole {
  id: string | number
  name: string
}

export default class Role {
  id: string | number
  name: string

  constructor (props: IRole) {
    this.id = props.id
    this.name = props.name
  }
}
