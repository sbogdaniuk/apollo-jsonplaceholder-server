export const typeDefs = `
  extend type Album {
    user: User!
    photos: [Photo!]!
  }
  
  extend type Photo {
    album: Album!
  }
  
  extend type Post {
    user: User!
    comments: [Comment!]!
  }
  
  extend type Comment {
    post: Post!
  }
  
  extend type User {
    posts: [Post!]!
    albums: [Album!]!
  }
`
