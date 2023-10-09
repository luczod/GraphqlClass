import { RESTDataSource } from "apollo-datasource-rest";
import { makeUserDataLoader } from "./dataloaders";

export class UsersApi extends RESTDataSource {
  constructor() {
    //para evocar o construtor da class extendida: RESTDataSource
    super();
    this.baseURL = process.env.API_URL + "/users/";
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this)); //bind copia a funcao anterior para usar em outro lugar
  }

  async getUsers(urlParams = {}) {
    return this.get("", urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id) {
    // ttl time to live , tempo em cache
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoadByid(id) {
    return this.dataLoader.load(id);
  }
}
