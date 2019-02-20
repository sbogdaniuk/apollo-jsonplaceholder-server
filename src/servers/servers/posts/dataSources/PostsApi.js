import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

export class PostsApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = process.env.REST_API

    this.idsLoader = new DataLoader(async (ids) => {
      const key = 'id'
      const idsQuery = ids.map(id => `${key}=${id}`).join('&')
      const list = await this.getAll(idsQuery)
      return ids.map(id =>
        list.find((d) => Number(d[key]) === Number(id)),
      )
    })

    this.userIdsLoader = new DataLoader(async (ids) => {
      const key = 'userId'
      const idsQuery = ids.map(id => `${key}=${id}`).join('&')
      const list = await this.getAll(idsQuery)
      return ids.map(id =>
        list.filter((d) => Number(d[key]) === Number(id)),
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
