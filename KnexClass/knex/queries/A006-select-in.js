/* -- in seleciona elementos entre os valores enviados
select * from users
where id in (110,115,120,125,130,1000,12200,1212545)
and first_name in ('Luiz', 'Keelie'); */

const knex = require("../../knex/config/database");

const selectIn = knex("users")
  .select("id", "first_name")
  .whereIn("id", [10, 15, 20, 25]);

console.log(selectIn.toSQL().toNative());

// é uma promise
selectIn
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERRO:", e.message);
  })
  .finally(() => {
    knex.destroy();
  });
