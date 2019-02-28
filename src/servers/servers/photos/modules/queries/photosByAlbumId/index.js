export const resolvers = {
  Query: {
    photosByAlbumId: (obj, { id }, { dataSources }) => {
      return dataSources.photosApi.getByAlbumId(id)
    },
  },
}
