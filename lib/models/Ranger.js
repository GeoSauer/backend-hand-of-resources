const pool = require('../utils/pool');

class Ranger {
  id;
  first_name;
  last_name;
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
    return new Ranger(rows[0]);
  }

  static async insertRanger({ firstName, lastName, gender, companion }) {
    const { rows } = await pool.query(
      `
        INSERT INTO rangers (first_name, last_name, gender, companion)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
      [firstName, lastName, gender, companion]
    );
    return new Ranger(rows[0]);
  }
}

module.exports = Ranger;
