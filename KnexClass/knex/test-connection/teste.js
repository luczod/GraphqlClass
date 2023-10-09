const knex = require("../config/database");
knex("users")
  .then((data) => {
    console.log("teste");
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    knex.destroy();
  });
