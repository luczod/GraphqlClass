import { RESTDataSource } from "apollo-datasource-rest";
import { makePostDataLoader } from "./dataloaders";
import {
  createPostFn,
  updatePostFn,
  deletePostFn,
} from "./utils/post-repository";

export class PostsApi extends RESTDataSource {
  constructor() {
    //para evocar o construtor da class extendida: RESTDataSource
    super();
    this.baseURL = process.env.API_URL + "/posts";
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this)); //bind copia a funcao anterior para usar em outro lugar
  }

  async getPosts(urlParams = {}) {
    return this.get("", urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getPost(id) {
    // ttl time to live , tempo em cache
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  // este this é auto instancia de class nesse arquivo aqui
  async createPost(postData) {
    return createPostFn(postData, this);
  }

  // este this é auto instancia de class nesse arquivo aqui
  async updatePost(postId, postData) {
    return updatePostFn(postId, postData, this);
  }

  async deletePost(postId) {
    return deletePostFn(postId, this);
  }

  batchLoadByUserid(id) {
    return this.dataLoader.load(id);
  }
}
