import { gql } from "apollo-server";

//o type Post é um iterface para definir o objeto da Query
// poderia ser só a Query
// type de entrada no grafo
export const PostTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersinput): [Post!]!
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
`;
