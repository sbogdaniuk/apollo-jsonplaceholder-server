export const resolvers = {
  Query: {
    postsByUserId: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.postsApi.getByUserId(id)
      if (res) return res
      throw new errors.NotFound({ message: 'Post not found!' })
    },
  },
}
