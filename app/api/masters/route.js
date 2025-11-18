import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "thirdweb.studio-post",
  user: "post",
  password: "post",
});

export async function GET(request) {
  try {
    const res = await pool.query(`SELECT * FROM masters`);
    return Response.json({
      success: true,
      masters: res.rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        error: "Masters not found",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
