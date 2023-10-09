import { WebSocketLink } from '@apollo/client/link/ws';

export const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4004/',
  options: {
    reconnect: true,
  },
});
