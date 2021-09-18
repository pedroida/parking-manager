export default class User {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async me (url) {
    return await this.httpClient.get(url)
  }

  async updateName (url, payload) {
    return await this.httpClient.patch(url, { name: payload })
  }

  async updatePassword (url, payload) {
    return await this.httpClient.post(url, payload)
  }

  async profileNewCar (url, payload) {
    return await this.httpClient.patch(url, payload)
  }

  async profileRemoveCar (url, car) {
    return await this.httpClient.delete(url, { data: { plate: car.plateCar } })
  }

  async profileDisableAccount (url) {
    return await this.httpClient.delete(url)
  }

  async updateAvatar (url, avatar) {
    const formData = new FormData()
    formData.append('file', avatar, 'file')
    return await this.httpClient.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    })
  }
}
