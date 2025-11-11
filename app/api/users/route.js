import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "thirdweb.studio-post",
  user: "post",
  password: "post",
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM users");
    console.log("Fetched users:", result.rows);
    return Response.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        error: "Failed to fetch users",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
