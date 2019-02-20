import {
  transformSchema,
  FilterRootFields,
  RenameTypes,
  RenameRootFields,
} from 'graphql-tools';

import { getIntrospectSchema } from '../introspection'

export const getPostsSchema = async () => {
  const postsSchema = await getIntrospectSchema('http://localhost:4000/posts')
  // create transform schema

  const transformedChirpSchema = transformSchema(postsSchema, [
    new FilterRootFields(
      (operation, rootField) => rootField !== 'postsByUserId'
    ),
    new RenameTypes((name) => `Post_${name}`),
    new RenameRootFields((operation, name) => `Post_${name}`),
  ]);

  return transformedChirpSchema
}
