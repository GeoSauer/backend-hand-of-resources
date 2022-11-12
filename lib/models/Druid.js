const pool = require('../utils/pool');

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

  static async updateById(id, newAttributes) {
    const druid = await Druid.getById(id);
    if (!druid) return null;
    const updatedDruid = { ...druid, ...newAttributes };
    const { rows } = await pool.query(
      `
        UPDATE druids
        SET first_name = $2, last_name = $3, gender = $4
        WHERE id = $1
        RETURNING *;
        `,
      [id, updatedDruid.firstName, updatedDruid.lastName, updatedDruid.gender]
    );
    return new Druid(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE
        FROM druids
        WHERE id = $1
        RETURNING *;
        `,
      [id]
    );
    return new Druid(rows[0]);
  }
}

module.exports = Druid;
