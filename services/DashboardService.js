export default class Dashboard {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async getWorkstationsWithRecognitions (url) {
    return await this.httpClient.get(url)
  }

  async getGroupedCarsByStatus (url) {
    return await this.httpClient.get(url)
  }

  async getLastDaysRecognitions (url) {
    return await this.httpClient.get(url)
  }

  async getGroupedUsersByType (url) {
    return await this.httpClient.get(url)
  }
}
