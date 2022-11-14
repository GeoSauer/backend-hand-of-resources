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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM paints
      WHERE id = $1
      ;`,
      [id]
    );
    if (!rows[0]) return;
    return new Paint(rows[0]);
  }

  static async insert({ hex, looksLike, smellsLike }) {
    const { rows } = await pool.query(
      `
      INSERT INTO paints (hex, looks_like, smells_like)
      VALUES ($1, $2, $3)
      RETURNING *
      ;`,
      [hex, looksLike, smellsLike]
    );
    return new Paint(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const paint = await Paint.getById(id);
    if (!paint) return null;
    const updatedPaint = { ...paint, ...newAttributes };
    const { rows } = await pool.query(
      `
      UPDATE paints
      SET hex = $2, looks_like = $3, smells_like = $4
      WHERE id = $1
      RETURNING *
      ;`,
      [id, updatedPaint.hex, updatedPaint.looksLike, updatedPaint.smellsLike]
    );
    return new Paint(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE
      FROM paints
      WHERE id = $1
      RETURNING *
      ;`,
      [id]
    );
    return new Paint(rows[0]);
  }
}

module.exports = Paint;
