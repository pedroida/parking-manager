import Role from '~/entity/Role'

export function RoleFactory (
  id: number = 0,
  name: string = '',
  description: string = ''
): Role {
  return new Role({
    id,
    name,
    description
  })
}
