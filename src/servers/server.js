require('dotenv').config()
import express from 'express'

import { albumsConfig, commentsConfig, photosConfig, postsConfig, userssConfig } from './servers'

const port = parseInt(process.env.PORT, 10) || 4000
const app = express()

const servers = [
  albumsConfig, commentsConfig, photosConfig, postsConfig, userssConfig,
]

servers.forEach(({ server, path }) => {
  server.applyMiddleware({ app, path })
})

app.listen(port, () => {
  servers.forEach(({ server, name }) => {
    console.log(`🚀 ${name} –– http://localhost:${port}${server.graphqlPath}`)
  })
})
