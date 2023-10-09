import { RESTDataSource } from "apollo-datasource-rest";
import { makePostDataLoader } from "./dataloaders";

export class PostsApi extends RESTDataSource {
  constructor() {
    //para evocar o construtor da class extendida: RESTDataSource
    super();
    this.baseURL = process.env.API_URL + "/posts";
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this)); //bind copia a funcao anterior para usar em outro lugar
  }

  async getPosts(urlParams = {}) {
    return this.get("", urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    // ttl time to live , tempo em cache
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoadByUserid(id) {
    return this.dataLoader.load(id);
  }
}
