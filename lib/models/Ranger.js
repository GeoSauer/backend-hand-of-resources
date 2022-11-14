const pool = require('../utils/pool');

class Ranger {
  id;
  firstName;
  lastName;
  gender;
  companion;

  constructor({ id, first_name, last_name, gender, companion }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.gender = gender;
    this.companion = companion;
  }

  static async getAllRangers() {
    const { rows } = await pool.query(
      'SELECT id, first_name, last_name FROM rangers'
    );
    return rows.map((rangerRows) => new Ranger(rangerRows));
  }

  static async getRangerById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM rangers 
      WHERE id = $1 
      ;`,
      [id]
    );
    if (!rows[0]) return;
    return new Ranger(rows[0]);
  }

  static async insertRanger({ firstName, lastName, gender, companion }) {
    const { rows } = await pool.query(
      `
        INSERT INTO rangers (first_name, last_name, gender, companion)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
      [firstName, lastName, gender, companion]
    );
    return new Ranger(rows[0]);
  }

  static async updateRangerById(id, newAttributes) {
    const ranger = await Ranger.getRangerById(id);
    if (!ranger) return null;
    const updatedData = { ...ranger, ...newAttributes };
    const { rows } = await pool.query(
      `
        UPDATE rangers
        SET first_name = $2, last_name = $3, gender = $4, companion = $5
        WHERE id = $1
        RETURNING *;
        `,
      [
        id,
        updatedData.firstName,
        updatedData.lastName,
        updatedData.gender,
        updatedData.companion,
      ]
    );
    return new Ranger(rows[0]);
  }

  static async deleteRangerById(id) {
    const { rows } = await pool.query(
      `
        DELETE
        FROM rangers
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new Ranger(rows[0]);
  }
}

module.exports = Ranger;
