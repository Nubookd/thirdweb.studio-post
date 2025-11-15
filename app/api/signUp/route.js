// signUp

import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "thirdweb.studio-post",
  user: "post",
  password: "post",
});

export async function POST(request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const name = searchParams.get("name");
    // const email = searchParams.get("email");
    // const password = searchParams.get("password");

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        {
          error: "Необходимо указать имя, адрес электронной почты и пароль",
          success: false,
        },
        { status: 400 }
      );
    }

    const resultName = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = $1) as exists`,
      [name]
    );
    const resultEmail = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE user_email = $1) as exists`,
      [email]
    );

    const nameExists = resultName.rows[0].exists;
    const emailExists = resultEmail.rows[0].exists;

    if (nameExists || emailExists) {
      return Response.json(
        {
          name: [{ exists: nameExists }],
          email: [{ exists: emailExists }],
          success: false,
          message: nameExists ? "Имя уже занято" : "Email уже занят",
        },
        { status: 409 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await pool.query(
      `INSERT INTO users (user_name, user_email, user_password_hash) VALUES ($1, $2, $3) RETURNING user_id, user_name, user_email, created_at`,
      [name, email, hashPassword]
    );
    return Response.json({
      name: [{ exists: false }],
      email: [{ exists: false }],
      user: newUser.rows[0],
      success: true,
      message: "чики пуки",
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
