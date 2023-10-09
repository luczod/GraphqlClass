import { checkOwner } from "../login/utils/auth-functions";
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

// mutation resolvers
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};

const updateUser = async (
  _,
  { userId, data },
  { dataSources, loggedUserId }
) => {
  checkOwner(userId, loggedUserId);
  return dataSources.userApi.updateUser(userId, data);
};

//useid arg do typedef
const deleteUser = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId);
  return dataSources.userApi.deleteUser(userId);
};

// subfields
const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserid(id);
};

// destructor user and users
export const userResolvers = {
  Query: { user, users },
  Mutation: { createUser, updateUser, deleteUser },
  User: { posts },
};
