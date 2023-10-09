import { gql } from "apollo-server";

export const commentTypedefs = gql`
  extend type Mutation {
    createComment(data: createCommentInput!): Comment!
  }
  type Comment {
    id: ID!
    comment: String!
    user: User!
    createdAt: String!
  }

  input createCommentInput {
    comment: String!
    postId: String!
  }
`;
