const pool = require('../utils/pool');

class Ranger {
  id;
  first_name;
  last_name;
  gender;
  familiar;

  constructor({ id, first_name, last_name, gender, familiar }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.familiar = familiar;
  }
  static async getAllRangers() {
    const { rows } = await pool.query('SELECT * FROM rangers');
    return rows.map((rangerRows) => new Ranger(rangerRows));
  }
}

module.exports = Ranger;
