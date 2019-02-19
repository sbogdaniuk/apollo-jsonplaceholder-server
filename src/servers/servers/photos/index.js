import path from 'path'

import { genServer } from '../genServer'
import { genSchema } from '../genSchema'
import { PhotoApi } from './dataSources'
import { createLogger } from '../../libs'

const name = 'Photos'
const pathToModules = path.join(__dirname, './modules')

const logger = createLogger(name)

const server = genServer({
  logger,
  schema: genSchema(pathToModules),
  dataSources: () => ({
    photosApi: new PhotoApi(),
  }),
})

export const photosConfig = {
  name,
  server,
  path: `/${name.toLowerCase()}`,

}
