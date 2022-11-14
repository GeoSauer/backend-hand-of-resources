const pool = require('../utils/pool');

class Alien {
  id;
  name;
  firstContact;
  hostile;

  constructor({ id, name, first_contact, hostile }) {
    this.id = id;
    this.name = name;
    this.firstContact = first_contact;
    this.hostile = hostile;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, hostile FROM aliens;');
    return rows.map((alienRows) => new Alien(alienRows));
  }
}

module.exports = Alien;
