import { gql } from "apollo-server";

//o type Post é um iterface para definir o objeto da Query
// poderia ser só a Query
// type de entrada no grafo
export const PostTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersinput): [Post!]!
  }

  union PostResult = PostNotFoundError | PostTimeoutError | Post

  # nao pode usar interface no union apenas no retorno
  interface PostError {
    statusCode: Int!
    message: String!
  }

  # obrigado a usar as chaves da interface
  # grante a uniformidade entre os tipos de erros
  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type PostTimeoutError implements PostError {
    statusCode: Int!
    message: String!
    timeout: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    # userId: String!
    # user: user!
    indexRef: String!
    createdAt: String!
    unixTimestamp: String!
  }
`;
