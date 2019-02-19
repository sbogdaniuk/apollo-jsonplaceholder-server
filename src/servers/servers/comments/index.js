import path from 'path'

import { genServer } from '../genServer'
import { genSchema } from '../genSchema'
import { CommentsApi } from './dataSources'
import { createLogger } from '../../libs'

const name = 'Comments'
const pathToModules = path.join(__dirname, './modules')

const logger = createLogger(name)

const server = genServer({
  logger,
  schema: genSchema(pathToModules),
  dataSources: () => ({
    commentsApi: new CommentsApi(),
  }),
})

export const commentsConfig = {
  name,
  server,
  path: `/${name.toLowerCase()}`,

}
