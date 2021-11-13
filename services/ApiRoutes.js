class ApiRoutes {
  constructor () {
    this.baseUrl = `${process.env.NUXT_ENV_API_URL || 'http://localhost:8080'}`
  }

  get login () {
    return `${this.baseUrl}/login`
  }

  get requestPassword () {
    return `${this.baseUrl}/request-renew-pass`
  }

  get requestRegister () {
    return `${this.baseUrl}/new-students/registry`
  }

  get activateUser () {
    return `${this.baseUrl}/activate-registry`
  }

  get me () {
    return `${this.baseUrl}/profile/me`
  }

  get updateName () {
    return `${this.baseUrl}/profile/change-name`
  }

  get updatePassword () {
    return `${this.baseUrl}/profile/change-password`
  }

  get profileNewCar () {
    return `${this.baseUrl}/profile/include-new-car`
  }

  get profileRemoveCar () {
    return `${this.baseUrl}/profile/remove-car`
  }

  get profileDisableAccount () {
    return `${this.baseUrl}/profile/disable-account`
  }

  get updateAvatar () {
    return `${this.baseUrl}/profile/avatar`
  }

  sendDoc (carId) {
    return `${this.baseUrl}/profile/car/${carId}/document`
  }

  // workstations
  get getWorkstations () {
    return `${this.baseUrl}/workstations`
  }

  handleWorkstation (id) {
    return `${this.baseUrl}/workstations/${id}`
  }

  get createWorkstation () {
    return `${this.baseUrl}/workstations`
  }

  // recognitions
  get getRecognitions () {
    return `${this.baseUrl}/all-recognizer`
  }

  // recognitions
  get getErrorRecognitions () {
    return `${this.baseUrl}/all-recognizer?onlyError=true`
  }

  // users
  get getUsers () {
    return `${this.baseUrl}/users/all`
  }

  getUser (id) {
    return `${this.baseUrl}/users/${id}`
  }

  get createUser () {
    return `${this.baseUrl}/users`
  }

  editUser (id) {
    return `${this.baseUrl}/users/${id}`
  }

  get disableUser () {
    return `${this.baseUrl}/users/`
  }

  // user car
  getCars (id) {
    return `${this.baseUrl}/users/${id}/cars`
  }

  approveCar (id) {
    return `${this.baseUrl}/users/car/${id}/approved`
  }

  reproveCar (id) {
    return `${this.baseUrl}/users/car/${id}/reproved`
  }

  getCarDoc (id) {
    return `${this.baseUrl}/users/${id}/prepare-download/document`
  }
}

const apiRoutes = new ApiRoutes()

export default apiRoutes
