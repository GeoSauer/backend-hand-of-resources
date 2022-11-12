const pool = require('../utils/pool');
const { insertRanger } = require('./Ranger.js');
const Ranger = require('./Ranger.js');

class Druid {
  id;
  firstName;
  lastName;
  gender;

  constructor({ id, first_name, last_name, gender }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.gender = gender;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT id, first_name, last_name FROM druids'
    );
    return rows.map((druidRows) => new Druid(druidRows));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM druids
        WHERE id = $1
        ;`,
      [id]
    );
    if (!rows[0]) return;
    return new Druid(rows[0]);
  }

  static async insert({ firstName, lastName, gender }) {
    const { rows } = await pool.query(
      `
          INSERT INTO druids (first_name, last_name, gender)
          VALUES ($1, $2, $3)
          RETURNING *;
          `,
      [firstName, lastName, gender]
    );
    return new Druid(rows[0]);
  }
}

module.exports = Druid;
