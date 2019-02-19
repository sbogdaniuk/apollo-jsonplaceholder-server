export const typeDefs = `
  extend type Album {
    user: User!
  }
  
  extend type Photo {
    album: Album!
  }
  
  extend type Post {
    user: User!
  }
  
  extend type Comment {
    post: Post!
  }
  
  extend type User {
    posts: [Post!]!
  }
`
