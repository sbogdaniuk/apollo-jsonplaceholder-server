import path from 'path'

import { genServer } from '../genServer'
import { genSchema } from '../genSchema'
import { AlbumApi } from './dataSources'
import { createLogger } from '../../libs'

const name = 'Albums'
const pathToModules = path.join(__dirname, './modules')

const logger = createLogger(name)

const server = genServer({
  logger,
  schema: genSchema(pathToModules),
  dataSources: () => ({
    albumsApi: new AlbumApi(),
  }),
})

export const albumsConfig = {
  name,
  server,
  path: `/${name.toLowerCase()}`,

}
