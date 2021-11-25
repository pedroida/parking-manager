import Workstation from '~/entity/Workstation'
import Recognition from '~/entity/Recognition'

export function WorkstationFactory (
  name: string = '',
  ip: string = '',
  mode: string = 'AUTOMATIC',
  port: number = 0,
  key: string = '',
  lastRecognitions: Recognition[] = []
): Workstation {
  return new Workstation({
    name,
    ip,
    port,
    key,
    mode,
    lastRecognitions
  })
}
