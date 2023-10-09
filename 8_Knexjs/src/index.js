import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./graphql/schema";

import { context } from "./graphql/context";

import { PostsApi } from "./graphql/schema/post/datasources";
import { UsersApi } from "./graphql/schema/user/datasources";
import { LoginApi } from "./graphql/schema/login/datasources";

import { CommentSQLDataSource } from "./graphql/schema/comment/datasources";
import { knex } from "./knex/index";

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
      commentDB: new CommentSQLDataSource(knex),
    };
  },
  uploads: false,
  cors: {
    origin: [],
    credentials: true,
  },
});

server.listen(4004).then(({ url }) => {
  console.log(`server run in ${url}`);
});
