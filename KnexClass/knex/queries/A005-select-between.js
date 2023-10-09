/* select * from users
where 
created_at between 
'2022-06-12 00:00:00' 
and '2022-09-04 23:59:59'
and id between 163 and 210; */

const knex = require("../../knex/config/database");

const selectBeetween = knex("users")
  .select("id", "first_name")
  .whereBetween("id", [80, 83])
  .orWhereBetween("id", [10, 15]);

console.log(selectBeetween.toSQL().toNative());

// é uma promise
selectBeetween
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERRO:", e.message);
  })
  .finally(() => {
    knex.destroy();
  });
