import service from '@@/services/Authentication'
import routes from '@@/services/ApiRoutes'

export default {
  async requestPassword ({ commit }, payload) {
    return await service.requestPassword(routes.requestPassword, payload)
  },
}
