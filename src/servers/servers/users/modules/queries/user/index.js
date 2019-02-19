export const resolvers = {
  Query: {
    user: async (obj, { id }, { dataSources, errors }) => {
      const res = await dataSources.usersApi.getById(id)
      if (res) return res
      throw new errors.NotFound({ message: 'User not found!' })
    },
  },
}
