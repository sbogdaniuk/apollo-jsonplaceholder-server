import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

export class CommentsApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = process.env.REST_API

    this.byIdsLoader = new DataLoader(async (ids) => {
      const list = await this.getAll({ id: ids })
      return ids.map(id =>
        list.find((progress) => Number(progress.id) === Number(id)),
      )
    })
  }

  async getAll (params = {}) {
    return this.get('comments', params)
  }

  async getById (id) {
    return this.byIdsLoader.load(id)
  }
}
