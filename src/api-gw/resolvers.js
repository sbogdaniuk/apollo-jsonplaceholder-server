export const resolvers = schemas => ({
  Album: {
    user: {
      fragment: `... on Album { userId }`,
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
  },
  Photo: {
    album: {
      fragment: `... on Photo { albumId }`,
      resolve ({ albumId: id }, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.albums,
          operation: 'query',
          fieldName: 'album',
          args: { id },
          context,
          info,
        })
      },
    },
  },
  Post_Post: {
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
  },
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
  User: {
    posts: {
      fragment: `... on User { id }`,
      resolve ({ id }, args, context, info) {
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
  },
})
