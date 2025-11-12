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
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    const resultName = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = $1) as exists`,
      [name]
    );
    const resultEmail = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE user_email = $1) as exists`,
      [email]
    );
    return Response.json({
      name: resultName.rows,
      email: resultEmail.rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        error: "Failed to fetch login",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
