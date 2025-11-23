import pool from "./db";
import bcrypt from "bcryptjs";

export default class User {
  static async createUser(name, email, password) {
    try {
      if (!name || !email || !password) {
        throw new Error("Поля name, email, password обязательны");
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
      if (!saltRounds || saltRounds < 12) {
        throw new Error("BCRYPT_SALT_ROUNDS не валиден");
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const res = await pool.query(
        `INSERT INTO users (user_name, user_email, user_password_hash) VALUES ($1, $2, $3) RETURNING user_id, user_name, user_email, created_at`,
        [name, email, hashPassword]
      );

      return res.rows[0];
    } catch (error) {
      console.error("Ошибка при создании пользователя", error);
      throw error;
    }
  }

  static async findUserByEmail(email) {
    try {
      if (!email) {
        throw new Error("Не указан email");
      }
      const res = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      return res.rows[0] || null;
    } catch (error) {
      console.error("Ошибка поиска по email", error);
      throw error;
    }
  }
  
  static async findUserByName(name) {
    try {
      if (!name) {
        throw new Error("Не указан name");
      }
      const res = await pool.query(
        "SELECT * FROM users WHERE user_name = $1",
        [name]
      );
      return res.rows[0] || null;
    } catch (error) {
      console.error("Ошибка поиска по name", error);
      throw error;
    }
  }

  static async findUserById(id) {
    try {
      if (!id) {
        throw new Error("Не указан id");
      }
      const res = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);
      return res.rows[0] || null;
    } catch (error) {
      console.error("Ошибка поиска по id", error);
      throw error;
    }
  }

  static async verifyPassword(password, hashPassword) {
    try {
      if (!password) {
        throw new Error("Не указан password");
      }
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      console.error("Ошибка проверки пароля", error);
      throw error;
    }
  }

  static async saveRefreshToken(userId, token, expiresAt) {
    try {
      await pool.query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING id",
        [userId, token, expiresAt]
      );
    } catch (error) {
      console.error("Ошибка сохранения токена", error);
      throw error;
    }
  }

  static async findRefreshToken(token) {
    try {
      if (!token) {
        throw new Error("Не указан token");
      }
      const res = await pool.query(
        "SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()",
        [token]
      );
      return res.rows[0] || null;
    } catch (error) {
      console.error("Токен не найден", error);
      throw error;
    }
  }

  static async deleteRefreshToken(token) {
    try {
      if (!token) {
        throw new Error("Не указан token");
      }
      await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
    } catch (error) {
      console.error("Ошибка удаления токена", error);
      throw error;
    }
  }
}
