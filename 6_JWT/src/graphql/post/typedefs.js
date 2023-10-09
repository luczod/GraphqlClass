import { gql } from "apollo-server";

//o type Post é um iterface para definir o objeto da Query
// poderia ser só a Query
// type de entrada no grafo
export const PostTypeDefs = gql`
  # Queries
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersinput): [Post!]!
  }
  # Mutations
  # apollo server > typedef > resolvers > datasources > post-repository
  extend type Mutation {
    createPost(data: createPostInput!): Post!
    updatePost(PostId: ID!, data: updatePostInput!): Post!
    deletePost(PostId: ID!): Boolean!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    # userId: String!
    user: User!
    indexRef: String!
    createdAt: String!
    unixTimestamp: String!
  }

  input createPostInput {
    title: String!
    body: String!
    # userId: String!
  }

  input updatePostInput {
    title: String
    body: String
    # userId: String
  }
`;
