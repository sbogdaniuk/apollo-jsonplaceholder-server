import isEmpty from 'lodash/isEmpty'

export const resolvers = {
  Query: {
    users: async (obj, { ids }, { dataSources }) => {
      if (!isEmpty(ids)) {
        const params = ids.map(id => `id=${id}`).join('&')
        return await dataSources.usersApi.getAll(params)
      }

      return await dataSources.usersApi.getAll()
    },
  },
}
