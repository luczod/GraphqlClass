/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users_roles", (table) => {
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.integer("roles_id").unsigned();
    table
      .foreign("roles_id")
      .references("roles.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.primary(["user_id", "roles_id"]); // rpimary composta
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users_roles");
};
