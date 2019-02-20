export const typeDefs = `
  extend type Album {
    user: User!
  }
  
  extend type Photo {
    album: Album!
  }
  
  extend type Post_Post {
    user: User!
  }
  
  extend type Comment {
    post: Post_Post!
  }
  
  extend type User {
    posts: [Post_Post!]!
  }
`
