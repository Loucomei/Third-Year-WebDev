import knex from "knex";
import { development, production } from "../db/knexfile.js";
import dotenv from "dotenv";

const env = process.env.ENVIRONMENT || "development";

const db = env === "development" ? knex(development) : knex(production);

export default db;
