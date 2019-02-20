import DataLoader from 'dataloader'
import filter from 'lodash/filter'
import { visit, Kind, visitWithTypeInfo, TypeInfo } from 'graphql'
import { append, uniqBy } from 'ramda'

function requestTransform (schema, typeName, fieldName) {
  return originalRequest => {
    const typeInfo = new TypeInfo(schema)
    let document = visit(originalRequest.document, visitWithTypeInfo(typeInfo, {
      [Kind.SELECTION_SET]: function (node) {
        let parentType = typeInfo.getParentType()
        if (parentType && parentType.name === typeName) {
          let fieldNode = { kind: Kind.FIELD, name: { kind: Kind.NAME, value: fieldName } }
          let selections = uniqBy(f => f.name.value, append(fieldNode, node.selections))
          return { ...node, selections }
        }
        return node
      }
    }))
    return { ...originalRequest, document }
  }
}

const batchPostsByUserId = async (ids, { info, schemas, context }) => {
  const list = await info.mergeInfo.delegateToSchema({
    schema: schemas.posts,
    operation: 'query',
    fieldName: 'postsByUserIds',
    args: { ids },
    context,
    info,
    transforms: [{
      transformRequest: requestTransform(schemas.posts, 'Post', 'userId')
    }]
  })

  return ids.map(id => filter(list, { userId: id }))
}



export const resolvers = schemas => ({
  User: {
    posts: {
      fragment: `... on User { id }`,
      resolve: async ({ id }, args, context, info) => {
        if (!id) return null
        if (!context.postsByUserIdLoader) {
          context.postsByUserIdLoader = new DataLoader(ids =>
            batchPostsByUserId(ids, {
              schemas,
              context,
              info,
            })
          )
        }

        return context.postsByUserIdLoader.load(id)
      },
    },
  },



  Query: {
    userDL: async (_, { id }, context, info) => {
      if (!context.usersByIdLoader) {
        context.usersByIdLoader = new DataLoader(ids =>
          info.mergeInfo.delegateToSchema({
            schema: schemas.users,
            operation: 'query',
            fieldName: 'users',
            args: { ids },
            context,
            info,
          }),
        )
      }

      return context.usersByIdLoader.load(id)
    },
  },
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
})
