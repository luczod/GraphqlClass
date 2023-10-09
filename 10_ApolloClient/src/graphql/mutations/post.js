import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/posts';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/users';

export const GQL_DELETE_POST = gql`
  mutation DELETE_POST($postId: ID!) {
    deletePost(PostId: $postId)
  }
`;

export const GQL_UPDATE_POST = gql`
  mutation UPDATE_POST($postId: ID!, $title: String, $body: String) {
    updatePost(PostId: $postId, data: { title: $title, body: $body }) {
      ...post
      user {
        ...user
      }
    }
  }
  ${GQL_FRAGMENT_POST}

  ${GQL_FRAGMENT_USER}
`;

export const GQL_CREATE_POST = gql`
  mutation CREATE_POST($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      ...post
      user {
        ...user
      }
    }
  }
  ${GQL_FRAGMENT_POST}

  ${GQL_FRAGMENT_USER}
`;
