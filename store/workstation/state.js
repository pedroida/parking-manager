import { WorkstationFactory } from '~/entity/factories/WorkstationFactory'

export default () => ({
  workstation: WorkstationFactory(),
  workstations: []
})
