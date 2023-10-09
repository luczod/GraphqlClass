/* select 
u.email uemail, u.id uid, u.first_name ufirst_name
from users as u; */

const knex = require("../../knex/config/database");

// é uma promise
const select = knex("users as u").select("u.email as umail", "u.id as uid ");

// é uma promise
select
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERRO:", e.message);
  })
  .finally(() => {
    knex.destroy();
  });
