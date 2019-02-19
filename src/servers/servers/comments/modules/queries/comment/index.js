export const resolvers = {
  Query: {
    comment: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.commentsApi.getById(id)
      if (res) return res
      throw new errors.NotFound({ message: 'Comment not found!' })
    },
  },
}
