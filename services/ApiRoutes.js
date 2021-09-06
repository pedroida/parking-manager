class ApiRoutes {
  constructor () {
    this.baseUrl = `${process.env.NUXT_ENV_API_URL || 'http://localhost:8080'}`
  }

  get login () {
    return `${this.baseUrl}/login`
  }

  get requestPassword () {
    return `${this.baseUrl}/request-new-pass`
  }

  get requestRegister () {
    return `${this.baseUrl}/new-students/registry`
  }

  get activateUser () {
    return `${this.baseUrl}/activate-registry`
  }

  get updateName () {
    return `${this.baseUrl}/profile/change-name`
  }

  get updatePassword () {
    return `${this.baseUrl}/profile/change-password`
  }
}

const apiRoutes = new ApiRoutes()

export default apiRoutes
