const pool = require('../utils/pool');

class Ranger {
  id;
  first_name;
  last_name;
  gender;
  companion;

  constructor({ id, first_name, last_name, gender, companion }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.companion = companion;
  }
  static async getAllRangers() {
    const { rows } = await pool.query(
      'SELECT id, first_name, last_name FROM rangers'
    );
    return rows.map((rangerRows) => new Ranger(rangerRows));
  }
}

module.exports = Ranger;
