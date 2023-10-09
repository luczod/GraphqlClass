import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from 'graphql/fragments/coments';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/posts';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/users';

export const GQL_POST_LIMIT = 3;

export const GQL_POSTS = gql`
  query GET_POSTS(
    $sort: String = "indexRef"
    $order: ApiFilterOrder = DESC
    $start: Int = 0
    $limit: Int = ${GQL_POST_LIMIT}
  ) {
    posts(
      input: { _sort: $sort, _order: $order, _start: $start, _limit: $limit }
    ) {
      ...post
      user {
        ...user
      }
      comments {
        ...comment
        user {
          ...user
        }
      }
    }
  }

  ${GQL_FRAGMENT_POST}

  ${GQL_FRAGMENT_USER}

  ${GQL_FRAGMENT_COMMENT}
`;

export const GQL_POST = gql`
  query GET_POST($id: ID!) {
    post(id: $id) {
      ...post
      user {
        ...user
      }
      comments {
        ...comment
        user {
          ...user
        }
      }
    }
  }

  ${GQL_FRAGMENT_POST}

  ${GQL_FRAGMENT_USER}

  ${GQL_FRAGMENT_COMMENT}
`;
