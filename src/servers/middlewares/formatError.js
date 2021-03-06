import { formatError as apolloFormatError, isInstance } from 'apollo-errors'

import { UnknownError } from '../constants/errors'

export const formatError = logger => error => {
  const { originalError } = error

  const apolloError = isInstance(originalError)
    ? error
    : new UnknownError({
      message: originalError.message,
    })

  // log internalData to stdout but not include it in the formattedError
  // logger.warn(JSON.stringify({
  //   type: apolloError.name,
  //   data: apolloError.data,
  //   internalData: apolloError.internalData,
  // }, null, 2))
  // logger.warn(originalError.stack)
  logger.warn(originalError.stack)

  return apolloFormatError(apolloError)
}
