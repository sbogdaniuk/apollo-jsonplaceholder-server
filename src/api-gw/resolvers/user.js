export const userResolvers = schemas => ({
  User: {
    posts: {
      fragment: `... on User { id }`,
      resolve: async ({ id }, args, context, info) => {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.posts,
          operation: 'query',
          fieldName: 'postsByUserId',
          args: { id },
          context,
          info,
        })
      },
    },
    albums: {
      fragment: `... on User { id }`,
      resolve: async ({ id }, args, context, info) => {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.albums,
          operation: 'query',
          fieldName: 'albumsByUserId',
          args: { id },
          context,
          info,
        })
      },
    },
  },
})
