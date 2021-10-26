export default class User {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async getUsers (url, pagination) {
    return await this.httpClient.get(url, {
      params: {
        size: pagination.size,
        page: pagination.page,
        sorted: pagination.sorted,
        direction: pagination.direction
      }
    })
  }

  async getUser (url) {
    return await this.httpClient.get(url)
  }

  async createUser (url, user) {
    let payload = {
      name: user.name,
      email: user.email,
      typeUser: user.type,
      roles: user.roles.map(role => role.id),
      enabled: user.enabled,
      authorisedAccess: user.authorisedAccess
    }

    if (user.cars[0].modelCar) {
      payload = {
        ...payload,
        modelCar: user.cars[0].modelCar,
        plateCar: user.cars[0].plateCar
      }
    }
    return await this.httpClient.post(url, payload)
  }

  async editUser (url, user) {
    const payload = {
      name: user.name,
      email: user.email,
      typeUser: user.type,
      roles: user.roles.map(role => role.id),
      enabled: user.enabled,
      authorisedAccess: user.authorisedAccess,
      disableReason: user.disableReason
    }

    return await this.httpClient.put(url, payload)
  }
}
