export const resolvers = {
  Query: {
    commentsByPostId: (obj, { id }, { dataSources, errors }) => {
      return dataSources.commentsApi.getByPostId(id)
    },
  },
}
