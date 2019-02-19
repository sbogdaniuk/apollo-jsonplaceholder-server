import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools'

export const getIntrospectSchema = async url => {
  const link = new HttpLink({
    uri: url,
    fetch,
  })

  const schema = await introspectSchema(link)

  return makeRemoteExecutableSchema({
    schema,
    link,
  })
}
