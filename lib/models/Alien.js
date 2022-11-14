const pool = require('../utils/pool');
const { insert } = require('./Druid.js');

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
    const { rows } = await pool.query('SELECT id, name, hostile FROM aliens;');
    return rows.map((alienRows) => new Alien(alienRows));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM aliens
      WHERE id = $1
      ;`,
      [id]
    );
    if (!rows[0]) return;
    return new Alien(rows[0]);
  }

  static async insert({ name, firstContact, hostile }) {
    const { rows } = await pool.query(
      `
      INSERT INTO aliens (name, first_contact, hostile)
      VALUES ($1, $2, $3)
      RETURNING *
      ;`,
      [name, firstContact, hostile]
    );
    return new Alien(rows[0]);
  }
}

module.exports = Alien;
