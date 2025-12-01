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
}
