import { ApolloServer } from 'apollo-server-express'

import { errors } from '../constants'
import { formatError } from '../middlewares'

const context = async ({ req, res, connection }) => {
  if (connection) {
    // check connection for metadata
    return connection.context
  }

  return {
    req,
    res,
    errors,
  }
}

export const genServer = ({ logger, ...options }) => {
  return new ApolloServer({
    formatError: formatError(logger),
    context,
    tracing: true,
    playground: true,
    introspection: true,
    ...options,
  })
}
