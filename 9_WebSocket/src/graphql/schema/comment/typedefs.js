import { gql } from "apollo-server";

export const commentTypedefs = gql`
  extend type Mutation {
    createComment(data: createCommentInput!): Comment!
  }

  extend type Subscription {
    createdComment(test: String): Comment!
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
