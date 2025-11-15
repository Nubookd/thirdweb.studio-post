// signIn

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
    // const password = searchParams.get("password");

    const { name, password } = await request.json();

    if (!name || !password) {
      return Response.json(
        {
          error: "Необходимо указать имя и пароль",
          success: false,
        },
        { status: 400 }
      );
    }

    const userMatch = await pool.query(
      `SELECT user_id, user_name, user_email, user_password_hash 
      FROM users WHERE user_name = $1`,
      [name]
    );

    if (userMatch.rows.length === 0) {
      return Response.json(
        {
          name: [{ exists: false }],
          exactMatch: false,
          success: false,
          message: "Пользователь не найден",
        },
        { status: 401 }
      );
    }

    const user = userMatch.rows[0];
    const isPasswordOur = await bcrypt.compare(
      password,
      user.user_password_hash
    );

    if (!isPasswordOur) {
      return Response.json(
        {
          name: [{ exists: true }],
          exactMatch: false,
          success: false,
          message: "Неверный пароль",
        },
        { status: 401 }
      );
    }

    return Response.json({
      name: [{ exists: true }],
      exactMatch: true,
      success: true,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
      },
      message: "Вход выполнен успешно",
    });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      {
        error: "Ошибка входа",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
