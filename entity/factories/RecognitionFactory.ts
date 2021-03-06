import Recognition from '~/entity/Recognition'

export function RecognitionFactory (
  id: string = '',
  originIp: string = '',
  epochTime: string = '',
  plate: string = '',
  confidence: number = 0,
  hasError: boolean = false,
  accessGranted: boolean = false,
  errorDetails: string = '',
  driverName: string = '',
  identifier?: boolean,
  authorize?: boolean,
  modelCar?: string,
  trace?: string,
  userAvatar?: string
): Recognition {
  return new Recognition({
    id,
    originIp,
    epochTime,
    plate,
    confidence,
    hasError,
    accessGranted,
    errorDetails,
    driverName,
    identifier,
    authorize,
    modelCar,
    trace,
    userAvatar
  })
}
