export const resolvers = {
  Query: {
    postsByUserId: (obj, { id }, { dataSources }) => {
      return dataSources.postsApi.getByUserId(id)
    },
  },
}
