import jwt from "jsonwebtoken";
import { UsersApi } from "./user/datasources";
//valor default para o parametro path , '/'
/*export const context = () => {
  return {};
};*/

const authorizeUser = async (req) => {
  // req.headers.authorization
  const { headers } = req;
  const { authorization } = headers;

  try {
    // validando token
    const [_bearer, token] = authorization.split(" ");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // comparando no banco de dados
    const userApi = new UsersApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return "";
    return userId;
  } catch (e) {
    console.log(e.message);
    return "";
  }
};

export const context = async ({ req }) => {
  // executado para cada requisiçao do user
  // verificadno o token do jwt no header da request
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
  };
};
