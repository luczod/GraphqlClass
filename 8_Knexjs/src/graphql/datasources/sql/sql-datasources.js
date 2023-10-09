import { DataSource } from "apollo-datasource";

import { InMemoryLRUCache } from "apollo-server-caching";
import DataLoader from "dataloader";

export class SQLDatasource extends DataSource {
  // call function form abstract class DataSource
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
    // _ indicar que é privado
    this._loader = new DataLoader(async (ids) => this.batchLoaderCallback(ids));
  }
  initialize({ context, cache }) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
  }

  // faz varias request de uma vez e guarda no dataloader
  async batchLoad(id) {
    return this._loader.load(id);
  }

  async batchLoaderCallback(_ids) {
    return _ids;
  }
}
