// resolvers das queries
// 4 parametros obj/parent arg context info
// usar underline para pular um parametro
// getusers vem do context in index.js

const user = async (_, { id }, { dataSources }) => {
  const user = dataSources.userApi.getUser(id);
  return user;
};

const users = async (_, { input }, { dataSources }) => {
  const users = dataSources.userApi.getUsers(input);
  return users;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserid(id);
};

// destructor user and users
export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
