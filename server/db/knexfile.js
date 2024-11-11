import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DEV_HOST);
const development = {
  client: "postgresql",
  connection: {
    host: process.env.DEV_HOST,
    database: process.env.DEV_DB,
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    port: process.env.DEV_PORT,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "db/seeds",
  },
};

const production = {
  client: "postgresql",
  connection: {
    database: "my_db",
    user: "username",
    password: "password",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export { development, production };
