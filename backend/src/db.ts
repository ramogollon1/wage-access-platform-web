import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wage_access_platform",
  password: "postgres",
  port: 5432,
});

export default pool;
