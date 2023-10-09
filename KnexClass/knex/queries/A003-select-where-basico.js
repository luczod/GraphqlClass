/* select * from users
where 
created_at < '2023-07-26 23:26:36'
and first_name = 'Lucas' 
and password_hash = '4856'; */

const knex = require("../../knex/config/database");

// é uma promise
const select = knex("users")
  .select("*")
  .where("id", "=", 4)
  .andWhere("first_name", "=", "Helena")
  .orWhere("id", "=", 7);

const select1 = knex("users")
  .select("*")
  .where({ id: 7, first_name: "Helena" });

console.log(select1.toSQL().toNative());

// é uma promise
select1
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERRO:", e.message);
  })
  .finally(() => {
    knex.destroy();
  });
