import { checkIsLoggedIn } from "../login/utils/auth-functions";
import { PubSub, withFilter } from "apollo-server";

export const pubSub = new PubSub();

export const CREATED_COMMENT_TRIGGER = "CREATED_COMMENT";

const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  const { postId, comment } = data;

  const post = await dataSources.postApi.getPost(postId);

  return dataSources.commentDB.create({
    postId,
    comment,
    userId: loggedUserId,
    postOwner: post?.userId || null,
  });
};

// field resolver
const user = async ({ user_id }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByid(user_id);
};
/* console.log("PARENT", parentObj);
    console.log("ARG", args);
    console.log("CONTEXT", context); */

// field resolver
const createdComment = {
  subscribe: withFilter(
    () => {
      return pubSub.asyncIterator(CREATED_COMMENT_TRIGGER);
    },
    (payload, _, context) => {
      const hasPostOwner = payload.postOwner && payload.postOwner !== null;
      const postOwerIsLoggedUser = payload.postOwner === context.loggedUserId;
      const NotifyUser = hasPostOwner && postOwerIsLoggedUser;
      return NotifyUser;
    }
  ),
};

export const commentResolvers = {
  Mutation: { createComment },
  Subscription: { createdComment },
  Comment: { user },
};
