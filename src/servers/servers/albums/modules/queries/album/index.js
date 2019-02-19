export const resolvers = {
  Query: {
    album: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.albumsApi.getById(id)
      if (res) return res
      throw new errors.NotFound({ message: 'Album not found!' })
    },
  },
}
