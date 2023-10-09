// resolvers das queries
// 4 parametros [obj/parent - arg -  context - info]
// usar underline para pular um parametro
const post = async (_, { id }, { getPosts }) => {
  const resposta = await getPosts("/" + id);
  const post = await resposta.json();

  if (Math.random() > 0.5) {
    return {
      statusCode: 500,
      message: "Post timeout",
      timeout: 123,
    };
  }

  if (typeof post.id === "undefined") {
    return {
      statusCode: 404,
      message: "Post not found",
      postId: id,
    };
  }

  return post;
};

const posts = async (_, { input }, { getPosts }) => {
  const ApiFilterinput = new URLSearchParams(input);
  const posts = await getPosts("/?" + ApiFilterinput);
  return posts.json();
};

// destructor Post and Posts
export const PostResolvers = {
  // destructot
  Query: {
    post,
    posts,
  },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const date = new Date(createdAt).getTime() / 1000;
      return Math.floor(date);
    },
  },

  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== "undefined") return "PostNotFoundError";
      if (typeof obj.timeout !== "undefined") return "PostTimeoutError";
      if (typeof obj.id !== "undefined") return "Post";
      return null;
    },
  },

  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== "undefined") return "PostNotFoundError";
      if (typeof obj.timeout !== "undefined") return "PostTimeoutError";
      return null;
    },
  },
};
