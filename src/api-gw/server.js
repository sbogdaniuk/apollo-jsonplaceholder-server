import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { mergeSchemas } from 'graphql-tools'

import { getIntrospectSchema } from './introspection'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import { getPostsSchema } from './schemas/posts'

const port = process.env.PORT || 3000
const app = express()

//our graphql endpoints
const names = [
  'albums',
  'comments',
  'photos',
  // 'posts',
  'users',
]
const endpoints = names.map(name => `http://localhost:4000/${name.toLowerCase()}`);

(async function() {
  try {
    //promise.all to grab all remote schemas at the same time, we do not care what order they come back but rather just when they finish
    const allSchemas = await Promise.all([
      ...endpoints.map(ep => getIntrospectSchema(ep)),
      getPostsSchema(),
    ])
    const schemas = names.reduce((acc, name, i) => ({
      ...acc, [name]: allSchemas[i],
    }), {
      posts: allSchemas[allSchemas.length - 1]
    })

    const server = new ApolloServer({
      schema: mergeSchemas({
        schemas: [
          ...allSchemas,
          // typeDefs
        ],
        // resolvers: resolvers(schemas),
      }),
      tracing: true,
    })

    server.applyMiddleware({ app, path: '/' })

    app.listen(port, () => {
      console.log(`🚀 ready at http://localhost:${port}${server.graphqlPath}`)
    })
  } catch (error) {
    console.log('ERROR: Failed to grab introspection queries', error)
  }
})()
