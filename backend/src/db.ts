import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "wage_access_platform",
  password: "postgres",
  port: 5432,
});

export default pool;
