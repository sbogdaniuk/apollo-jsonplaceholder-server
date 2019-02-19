import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

export class PostsApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = process.env.REST_API

    this.idsLoader = new DataLoader(async (ids) => {
      const list = await this.getAll({ id: ids })
      return ids.map(id =>
        list.find((d) => Number(d.id) === Number(id)),
      )
    })

    this.userIdsLoader = new DataLoader(async (ids) => {
      const list = await this.getAll({ userId: ids })
      return ids.map(id =>
        list.filter((d) => Number(d.userId) === Number(id)),
      )
    })
  }

  async getAll (params = {}) {
    return this.get('posts', params)
  }

  async getById (id) {
    return this.idsLoader.load(id)
  }

  async getByUserId (id) {
    return this.userIdsLoader.load(id)
  }
}
