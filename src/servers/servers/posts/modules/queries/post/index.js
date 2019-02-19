export const resolvers = {
  Query: {
    post: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.postsApi.getById(id)
      if (res) return res
      throw new errors.NotFound({ message: 'Post not found!' })
    },
  },
}
