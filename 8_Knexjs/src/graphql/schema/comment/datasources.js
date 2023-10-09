import { ValidationError } from "apollo-server";
import { SQLDatasource } from "../../datasources/sql/sql-datasources";

const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString(),
  };
};

export class CommentSQLDataSource extends SQLDatasource {
  // call function form abstract class DataSource
  constructor(dbConnection) {
    super(dbConnection);
    this.tableName = "comments";
  }
  async getById(id) {
    // db instancia do knex
    return this.db(this.tableName).where("id", "=", id);
  }
  async getByPostId(post_id) {
    const query = this.db(this.tableName).where({ post_id });
    console.log(query.toString());
    const comments = await query;
    return comments.map((comment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db(this.tableName).where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError("comment already created");
    }

    const created = await this.db(this.tableName).insert(partialComment);

    return {
      id: created[0],
      createAt: new Date().toISOString(),
      ...partialComment,
    };
  }

  async batchLoaderCallback(post_ids) {
    const query = this.db(this.tableName).whereIn("post_id", post_ids);
    const comments = await query;
    // console.log(query.toString());
    const filteredComments = post_ids.map((post_id) => {
      return comments
        .filter((comment) => String(comment.post_id) === String(post_id))
        .map((comment) => commentReducer(comment));
    });
    return filteredComments;
  }
}
