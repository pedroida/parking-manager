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

  async getCars (url) {
    return await this.httpClient.get(url)
  }

  async getCarDoc (url) {
    return await this.httpClient.get(url)
  }

  async approveCar (url) {
    return await this.httpClient.patch(url)
  }

  async reproveCar (url) {
    return await this.httpClient.patch(url)
  }

  async getUser (url) {
    return await this.httpClient.get(url)
  }

  async createUser (url, user) {
    const payload = {
      name: user.name,
      email: user.email,
      typeUser: user.type,
      roles: user.roles.map(role => role.id),
      enabled: user.enabled,
      authorisedAccess: user.authorisedAccess
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

  async disableUser (url, { userId, reason }) {
    return await this.httpClient.delete(url, { data: { userId, reason } })
  }
}
