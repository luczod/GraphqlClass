//resolvers das queries
// 4 parametros [obj/parent - arg -  context - info]
// usar underline para pular um parametro
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByid(userId);
};
// destructor Post and Posts
export const PostResolvers = {
  // destructor
  Query: { post, posts },
  Post: { user },
};
