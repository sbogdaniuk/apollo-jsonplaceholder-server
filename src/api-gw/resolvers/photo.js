export const photoResolvers = schemas => ({
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
})
