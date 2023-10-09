//resolvers das queries
// 4 parametros [obj/parent - arg/parameter -  context - info]
// usar underline para pular um parametro
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// mutation resolvers
const createPost = async (_, { data }, { dataSources }) => {
  return dataSources.postApi.createPost(data);
};

const updatePost = async (_, { PostId, data }, { dataSources }) => {
  return dataSources.postApi.updatePost(PostId, data);
};

const deletePost = async (_, { PostId }, { dataSources }) => {
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
