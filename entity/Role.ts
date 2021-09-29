export interface IRole {
  id: string | number
  name: string
  description: string
}

export default class Role {
  id: string | number
  name: string
  description: string

  constructor (props: IRole) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
  }
}
