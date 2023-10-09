import { ApolloServer, gql } from "apollo-server";
import { resolvers, typeDefs } from "./graphql/schemas";
import { context } from "./graphql/context";
import { PostsApi } from "./graphql/post/datasources";
import { UsersApi } from "./graphql/user/datasources";
import { LoginApi } from "./graphql/login/datasources";

// um longo arquivo com varias querys e resolvers diferentes tudo junto
// junta tudo no final
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  //midleware executar antes de tudo
  context: context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
    };
  },
});

server.listen(4004).then(({ url }) => {
  console.log(`server run in ${url}`);
});
