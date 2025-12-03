import pool from "./db";

export default class Master {
  static async findMasterById(id) {
    try {
      const res = await pool.query(
        "SELECT * FROM masters WHERE master_id = $1",
        [id]
      );
      return res.rows[0] || null;
    } catch (error) {
      console.error("Error in findMasterById:", error);
      throw error;
    }
  }

  static async findCommentsByMasterId(id) {
    try {
      const res = await pool.query(
        `SELECT * FROM comments 
        JOIN users ON comments.user_id = users.user_id 
        WHERE comments.master_id = $1`,
        [id]
      );
      return res.rows || null;
    } catch (error) {
      console.error("Ошибка в поиске комментариев");
      throw error;
    }
  }

  static async addComment(master__id, user__id, comment) {
    try {
      const res = await pool.query(
        `INSERT INTO comments (master_id, user_id, comment_text)
        VALUES ($1, $2, $3)`,
        [master__id, user__id, comment]
      );
      return res.rows || null;
    } catch (error) {
      console.error("Ошибка в добавлении комментария");
      throw error;
    }
  }
}
