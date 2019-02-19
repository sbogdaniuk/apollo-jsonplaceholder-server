export const resolvers = {
  Query: {
    photo: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.photosApi.getById(id)
      if (res) return res
      throw new errors.NotFound({ message: 'Photo not found!' })
    },
  },
}
