export const postResolvers = schemas => ({
  Post: {
    user: {
      fragment: `... on Post { userId }`,
      resolve ({ userId: id }, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.users,
          operation: 'query',
          fieldName: 'user',
          args: { id },
          context,
          info,
        })
      },
    },
    comments: {
      fragment: `... on Post { id }`,
      resolve ({ id }, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.comments,
          operation: 'query',
          fieldName: 'commentsByPostId',
          args: { id },
          context,
          info,
        })
      },
    },
  },
})
