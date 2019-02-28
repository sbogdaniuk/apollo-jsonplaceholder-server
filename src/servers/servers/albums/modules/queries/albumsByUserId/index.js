export const resolvers = {
  Query: {
    albumsByUserId: (obj, { id }, { dataSources }) => {
      return dataSources.albumsApi.getByUserId(id)
    },
  },
}
