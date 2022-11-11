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
}

module.exports = Druid;
