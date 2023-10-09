import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RESTDataSource } from "apollo-datasource-rest";
import { AuthenticationError } from "apollo-server-errors";

export class LoginApi extends RESTDataSource {
  //para evocar o construtor da class extendida: RESTDataSource
  constructor() {
    super();
    this.baseURL = process.env.API_URL + "/users/";
  }

  async getUser(userName) {
    const user = await this.get("", { userName }, { cacheOptions: { ttl: 0 } });

    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError("User does not exist.");
    }

    return user;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash
    );

    if (!isPasswordValid) {
      throw new AuthenticationError("User or password Invalids.");
    }

    const token = this.createJwtToken({ userId });
    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    //response Header
    this.context.res.cookie("jwtToken", token, {
      secure: true, // rede segura - https
      httpOnly: true, // NÃO DEVE ser acessado via código
      maxAge: 1000 * 60 * 6024 * 7, // 7 days
      path: "/",
      sameSite: "strict", // strict lax none - mesmo dominio
    });

    return {
      userId,
      token,
    };
  }

  async logout(userName) {
    const user = await this.getUser(userName);

    if (user[0].id !== this.context.loggedUserId) {
      throw new AuthenticationError("You are not this user.");
    }
    await this.patch(user[0].id, { token: "" }, { cacheOptions: { ttl: 0 } });
    this.context.res.clearCookie("jwtToken");
    return true;
  }

  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    // colocando os dados no jwt
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
}
