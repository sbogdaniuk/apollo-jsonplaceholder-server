import { albumResolvers } from './album'
import { commentResolvers } from './comment'
import { photoResolvers } from './photo'
import { postResolvers } from './post'
import { userResolvers } from './user'

export const resolvers = schemas => ({
  ...albumResolvers(schemas),
  ...commentResolvers(schemas),
  ...photoResolvers(schemas),
  ...postResolvers(schemas),
  ...userResolvers(schemas),
})
