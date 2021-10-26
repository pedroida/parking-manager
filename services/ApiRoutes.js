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
}

const apiRoutes = new ApiRoutes()

export default apiRoutes
