/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    { email: "test1", username: "test1", password: "test1" },
    { email: "test2", username: "test2", password: "test2" },
    { email: "test3", username: "test3", password: "test3" },
  ]);
};
