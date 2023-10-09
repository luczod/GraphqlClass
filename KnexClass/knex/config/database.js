const knexfile = require("../../knexfile");

const knex = require("knex")(knexfile);

knex("users")
  .then((data) => {
    console.log("conected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = knex;
