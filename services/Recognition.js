export default class Recognition {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async getRecognitions (url) {
    return await this.httpClient.get(url)
  }

  async createWorkstation (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async updateWorkstation (url, payload) {
    return await this.httpClient.put(url, payload)
  }

  async removeWorkstation (url) {
    return await this.httpClient.delete(url)
  }
}
