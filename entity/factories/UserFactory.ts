import User from '~/entity/User'
import Car from '~/entity/Car'
import Role from '~/entity/Role'

export function UserFactory (
  cars?: Car[],
  roles: Role[] = [],
  id: string = '',
  name: string = '',
  email: string = '',
  type: string = '',
  avatar: string = '',
  disableReason: string = '',
  password?: string,
  confirmPassword?: string,
  authorisedAccess: boolean = false,
  enabled: boolean = false
): User {
  return new User({
    id,
    name,
    email,
    password,
    confirmPassword,
    cars,
    type,
    roles,
    authorisedAccess,
    enabled,
    avatar,
    disableReason
  })
}
