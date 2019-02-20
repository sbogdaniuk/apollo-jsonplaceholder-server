import isEmpty from 'lodash/isEmpty'

export const resolvers = {
  Query: {
    postsByUserIds: async (obj, { ids }, { dataSources, errors }) => {
      if (isEmpty(ids)) {
        throw new errors.ParamsError({ message: 'You should provide ids.' })
      }
      const key = 'userId'
      const idsQuery = ids.map(id => `${key}=${id}`).join('&')
      return await dataSources.postsApi.getAll(idsQuery)
    },
  },
}
