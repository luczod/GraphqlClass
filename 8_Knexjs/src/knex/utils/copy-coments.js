import { comments } from "../../../db.json";
import { dateToMySql } from "./date-iso-mysql";
import { knex } from "../index";

// não manipula primary key ou autoincrement, não muda
const commentsForDb = comments.map((Objcomment) => {
  return {
    comment: Objcomment.comment,
    user_id: Objcomment.userId,
    post_id: Objcomment.postId,
    created_at: dateToMySql(Objcomment.createdAt),
  };
});

knex("comments")
  .insert(commentsForDb)
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log(e.menssage);
  })
  .finally(() => {
    knex.destroy();
  });
