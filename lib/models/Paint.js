const pool = require('../utils/pool');

class Paint {
  id;
  hex;
  looksLike;
  smellsLike;

  constructor({ id, hex, looks_like, smells_like }) {
    this.id = id;
    this.hex = hex;
    this.looksLike = looks_like;
    this.smellsLike = smells_like;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, looks_like FROM paints;');
    return rows.map((paintRows) => new Paint(paintRows));
  }
}

module.exports = Paint;
