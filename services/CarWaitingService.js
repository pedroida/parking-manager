export default class CarWaiting {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async getCarsWaiting (url, pagination) {
    return await this.httpClient.get(url, {
      params: {
        size: pagination.size,
        page: pagination.page,
        sorted: pagination.sorted,
        direction: pagination.direction
      }
    })
  }
}
