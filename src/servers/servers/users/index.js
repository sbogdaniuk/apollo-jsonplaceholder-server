import path from 'path'

import { genServer } from '../genServer'
import { genSchema } from '../genSchema'
import { UsersApi } from './dataSources'
import { createLogger } from '../../libs'

const name = 'Users'
const pathToModules = path.join(__dirname, './modules')

const logger = createLogger(name)

const server = genServer({
  logger,
  schema: genSchema(pathToModules),
  dataSources: () => ({
    usersApi: new UsersApi(),
  }),
})

export const userssConfig = {
  name,
  server,
  path: `/${name.toLowerCase()}`,

}
