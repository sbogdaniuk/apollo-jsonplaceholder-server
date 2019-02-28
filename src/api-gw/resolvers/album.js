export const albumResolvers = schemas => ({
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
    photos: {
      fragment: `... on Album { id }`,
      resolve ({ id }, args, context, info) {
        return info.mergeInfo.delegateToSchema({
          schema: schemas.photos,
          operation: 'query',
          fieldName: 'photosByAlbumId',
          args: { id },
          context,
          info,
        })
      },
    },
  },
})
