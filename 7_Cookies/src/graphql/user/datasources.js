import { RESTDataSource } from "apollo-datasource-rest";
import { makeUserDataLoader } from "./dataloaders";
import {
  createUserFn,
  updateUserFn,
  deleteUserFn,
} from "./utils/user-repository";

export class UsersApi extends RESTDataSource {
  constructor() {
    //para evocar o construtor da class extendida: RESTDataSource
    super();
    this.baseURL = process.env.API_URL + "/users/";
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this)); //bind copia a funcao anterior para usar em outro lugar
  }

  async getUsers(urlParams = {}) {
    return this.get("", urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getUser(id) {
    // ttl time to live , tempo em cache
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  // este this é auto instancia de class nesse arquivo aqui
  async createUser(UserData) {
    return createUserFn(UserData, this);
  }

  // este this é auto instancia de class nesse arquivo aqui
  async updateUser(UserId, UserData) {
    return updateUserFn(UserId, UserData, this);
  }

  async deleteUser(UserId) {
    return deleteUserFn(UserId, this);
  }

  batchLoadByid(id) {
    return this.dataLoader.load(id);
  }
}
