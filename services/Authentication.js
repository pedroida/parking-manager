class Authentication {

  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async requestPassword(url, payload) {
    return await this.httpClient.post(url, payload)
  }
}

const service = new Authentication()

export default service
