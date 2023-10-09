import { ValidationError } from "apollo-server";
import { isValidNameError } from "graphql";

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError("missing values");
  }

  return await dataSource.post("", { ...postInfo });
};

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) {
    throw new ValidationError("missing postId valid");
  }
  const { title, body, userId } = postData;
  if (typeof title !== "undefined") {
    if (!title) {
      throw new ValidationError("title is empty");
    }
  }

  if (typeof body !== "undefined") {
    if (!body) {
      throw new ValidationError("body is empty");
    }
  }

  if (typeof userId !== "undefined") {
    if (!userId) {
      throw new ValidationError("userId is empty");
    }
    await userExists(userId, dataSource);
  }
  // ? verificar se o obj existe antes de verificar a chave
  // ? object changinh
  if (postData?.userId) {
    await userExists(postData.userId, dataSource);
  }
  return await dataSource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId, dataSource) => {
  if (!postId) {
    throw new ValidationError("missing postID");
  }

  const deleted = await dataSource.delete(postId);
  // !! converter para boolean
  return !!deleted;
};

// busca profunda
const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (error) {
    throw new isValidNameError(`User ${userId} not exist`);
  }
};

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const indexRefPost = await dataSource.get("", {
    _limit: 1,
    _sort: "indexRef",
    _order: "desc",
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
