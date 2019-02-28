export const commentResolvers = schemas => ({
  Comment: {
    post: {
      fragment: `... on Comment { postId }`,
      resolve ({ postId: id }, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.posts,
          operation: 'query',
          fieldName: 'post',
          args: { id },
          context,
          info,
        })
      },
    },
  },
})
