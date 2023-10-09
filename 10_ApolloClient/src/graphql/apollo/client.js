import { ApolloClient, from } from '@apollo/client';

import { cache } from './chache/in-memory';
import { forwardLink } from './links/forward-link';
import { errorLink } from './links/error-link';
import { asyncLink } from './links/async-link';

import { splitLink } from './links/split-link';

export const apolloClient = new ApolloClient({
  link: from([errorLink, forwardLink, asyncLink, splitLink]),
  cache,
});
