// Update with your config settings. module.exports

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "mysql2",
  connection: {
    database: "KnexClass",
    user: "root",
    password: "senha",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
