import { ApolloServer, gql } from "apollo-server";
import { resolvers, typeDefs } from "./graphql/schemas";
import { context } from "./graphql/context";

// um longo arquivo com varias querys e resolvers diferentes tudo junto
// junta tudo no final
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  //midleware executar antes de tudo
  context: context,
});

server.listen(4004).then(({ url }) => {
  console.log(`server run in ${url}`);
});
