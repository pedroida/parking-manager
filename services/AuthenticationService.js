export default class Authentication {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async login (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async requestPassword (url, payload) {
    return await this.httpClient.post(url, { email: payload })
  }

  async confirmRequestPassword (url) {
    return await this.httpClient.get(url)
  }

  async register (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async activateUser (url, payload) {
    return await this.httpClient.get(url, { params: { params: payload } })
  }
}
