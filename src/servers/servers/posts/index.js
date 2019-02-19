import path from 'path'

import { genServer } from '../genServer'
import { genSchema } from '../genSchema'
import { PostsApi } from './dataSources'
import { createLogger } from '../../libs'

const name = 'Posts'
const pathToModules = path.join(__dirname, './modules')

const logger = createLogger(name)

const server = genServer({
  logger,
  schema: genSchema(pathToModules),
  dataSources: () => ({
    postsApi: new PostsApi(),
  }),
})

export const postsConfig = {
  name,
  server,
  path: `/${name.toLowerCase()}`,

}
