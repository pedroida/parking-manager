import Workstation from '~/entity/Workstation'

export function WorkstationFactory (
  name: string = '',
  ip: string = '',
  mode: string = 'AUTOMATIC',
  port: number = 0,
  key: string = ''
): Workstation {
  return new Workstation({
    name,
    ip,
    port,
    key,
    mode
  })
}
