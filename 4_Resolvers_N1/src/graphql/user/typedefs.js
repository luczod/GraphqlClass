import { gql } from "apollo-server-core";

// tipagem das queries
// o type user é um interface para definir o objeto da Query
// poderia ser só a Query
// ! nao pode ser null
export const userTypeDefs = gql`
  # as duas queries em si
  extend type Query {
    user(id: ID!): User!
    users(input: ApiFiltersinput): [User!]!
  }
  type User {
    # a tipagem das queries
    id: ID!
    firstName: String
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }
`;
