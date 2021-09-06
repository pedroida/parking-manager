export default class User {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async updatePassword (url, payload) {
    return await this.httpClient.post(url, payload)
  }
}
