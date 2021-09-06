export default class Authentication {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async login (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async requestPassword (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async register (url, payload) {
    payload.modelCar = payload.cars[0].modelCar
    payload.plateCar = payload.cars[0].plateCar
    return await this.httpClient.post(url, payload)
  }

  async activateUser (url, payload) {
    return await this.httpClient.get(url, { params: { params: payload } })
  }
}
