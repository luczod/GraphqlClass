import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: 'http://localhost:4004/',
  credentials: 'include',
});
