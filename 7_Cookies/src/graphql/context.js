import jwt from "jsonwebtoken";
import { UsersApi } from "./user/datasources";
//valor default para o parametro path , '/'
/*export const context = () => {
  return {};
};*/

const verifyToken = async (token) => {
  // req.headers.authorization

  try {
    // validando token
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

const authorizeUserWithToken = async (req) => {
  // req.headers.authorization
  const { headers } = req;
  const { authorization } = headers;

  try {
    // validando token
    const [_bearer, token] = authorization.split(" ");
    return await verifyToken(token);
  } catch (e) {
    // console.log(e.message);
    return "";
  }
};

const cookieParser = (cookiesHeader) => {
  // The final goal is to return an object with key/value reflecting
  // the cookies. So, this functions always returns an object.

  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != "string") return {};

  const cookies = cookiesHeader.split(/;\s*/);

  // If we have something similar to cookie, we want to add them
  // to the final object
  const parsedCookie = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    parsedCookie[key] = value;
  }

  // The reason I'm using JSON here is to make sure the final
  // object won't have any undefined value.
  return JSON.parse(JSON.stringify(parsedCookie));
};

export const context = async ({ req, res }) => {
  // executado para cada requisiçao do user
  // verificadno o token do jwt no header da request
  let loggedUserId = await authorizeUserWithToken(req);

  // console.log(req.headers.cookie);
  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyToken(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
  };
};
