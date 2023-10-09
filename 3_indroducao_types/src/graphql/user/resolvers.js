// resolvers das queries
// 4 parametros obj/parent arg context info
// usar underline para pular um parametro
// getusers vem do context in index.js
const users = async (_, { input }, { getUsers }) => {
  const ApiFilterinput = new URLSearchParams(input);
  // console.log(context.hello);
  const users = await getUsers("/?" + ApiFilterinput);
  return users.json();
};
const user = async (_, { id }, { getUsers }) => {
  const resposta = await getUsers("/" + id);
  const user = await resposta.json();
  console.log(user.userName);
  return user;
};

// destructor user and users
export const userResolvers = {
  Query: {
    user,
    users,
  },
};
