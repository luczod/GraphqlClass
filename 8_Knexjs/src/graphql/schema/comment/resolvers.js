import { checkIsLoggedIn } from "../login/utils/auth-functions";

const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  const { postId, comment } = data;

  await dataSources.postApi.getPost(postId);

  return dataSources.commentDB.create({
    postId,
    comment,
    userId: loggedUserId,
  });
};

/* const user = async ({ user_id }, _, { dataSources }) => {
  const users = await dataSources.userApi.batchLoadById(user_id);

  return users;
}; */
// field resolver
const user = async ({ user_id }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByid(user_id);
};
export const commentResolvers = {
  Mutation: { createComment },
  Comment: { user },
};
