import { AuthenticationError } from "apollo-server-errors";
import { checkIsLoggedIn } from "../login/utils/auth-functions";
//resolvers das queries
// 4 parametros [obj/parent - arg/parameter -  context - info]
// usar underline para pular um parametro
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  if (!loggedUserId) {
    throw new AuthenticationError("You have to log in");
  }

  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// mutation resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  return dataSources.postApi.createPost(data);
};

const updatePost = async (
  _,
  { PostId, data },
  { dataSources, loggedUserId }
) => {
  checkIsLoggedIn(loggedUserId);
  return dataSources.postApi.updatePost(PostId, data);
};

const deletePost = async (_, { PostId }, { dataSources, loggedUserId }) => {
  return dataSources.postApi.deletePost(PostId);
};

// field resolver
const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByid(userId);
};

// destructor Post and Posts
export const PostResolvers = {
  // destructor
  Query: { post, posts },
  Mutation: { createPost, updatePost, deletePost },
  Post: { user },
};
