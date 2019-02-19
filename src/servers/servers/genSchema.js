// import path from 'path'
import fs from 'fs'
import glob from 'glob'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'

export const genSchema = (pathToModules) => {
  // const pathToModules = path.join(__dirname, './modules')
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: 'utf8' }))

  const resolvers = glob
    .sync(`${pathToModules}/**/*.?s`)
    .map(resolver => require(resolver).resolvers)
    .filter(d => d)

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  })
}
