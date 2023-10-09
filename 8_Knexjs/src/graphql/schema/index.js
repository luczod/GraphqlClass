import { gql } from "apollo-server-core";
import { userTypeDefs } from "./user/typedefs";
import { userResolvers } from "./user/resolvers";
import { PostTypeDefs } from "./post/typedefs";
import { PostResolvers } from "./post/resolvers";
import { ApiFiltersTypeDefs } from "./api-filters/typedefs";
import { ApiFiltersResolvers } from "./api-filters/resolvers";
import { loginTypedefs } from "./login/typedefs";
import { loginResolvers } from "./login/resolvers";
import { commentTypedefs } from "./comment/typedefs";
import { commentResolvers } from "./comment/resolvers";

// typedefs defaul empaty
// class pai entre aspas
const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;

// resolvers defaul empaty
const rootResolvers = {
  Query: {
    _empty: () => true,
  },
  Mutation: {
    _empty: () => true,
  },
};

// export every resolveres and typedefs with queries
export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  PostTypeDefs,
  ApiFiltersTypeDefs,
  loginTypedefs,
  commentTypedefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  PostResolvers,
  ApiFiltersResolvers,
  loginResolvers,
  commentResolvers,
];
