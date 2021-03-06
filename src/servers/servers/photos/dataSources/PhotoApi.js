import { RESTDataSource } from 'apollo-datasource-rest'
import DataLoader from 'dataloader'

export class PhotoApi extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = process.env.REST_API

    this.byIdsLoader = new DataLoader(async (ids) => {
      const key = 'id'
      const idsQuery = ids.map(id => `${key}=${id}`).join('&')
      const list = await this.getAll(idsQuery)
      return ids.map(id =>
        list.find((d) => Number(d[key]) === Number(id)),
      )
    })

    this.albumIdsLoader = new DataLoader(async (ids) => {
      const key = 'albumId'
      const idsQuery = ids.map(id => `${key}=${id}`).join('&')
      const list = await this.getAll(idsQuery)
      return ids.map(id =>
        list.filter((d) => Number(d[key]) === Number(id)),
      )
    })
  }

  async getAll (params = {}) {
    return this.get('photos', params)
  }

  async getById (id) {
    return this.byIdsLoader.load(id)
  }

  async getByAlbumId (id) {
    return this.albumIdsLoader.load(id)
  }
}
