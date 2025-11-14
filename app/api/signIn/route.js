// signIn

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

    const exactMatch = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = $1 AND user_email = $2) as exists`,
      [name, email]
    );

    const exactMatchExists = exactMatch.rows[0].exists;

    if (exactMatchExists) {
      return Response.json({
        name: [{ exists: true }],
        email: [{ exists: true }],
        exactMatch: true,
        success: true,
        message: "Чики пуки",
      });
    } else {
      const exactName = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = $1) as exists`,
        [name]
      );
      const exactEmail = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE user_email = $1) as exists`,
        [email]
      );
      return Response.json({
        name: [{ exists: exactName.rows[0].exists }],
        email: [{ exists: exactEmail.rows[0].exists }],
        exactMatch: false,
        success: false,
        message: "no чики пуки",
      });
    }
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
