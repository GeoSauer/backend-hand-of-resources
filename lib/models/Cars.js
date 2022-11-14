const pool = require('../utils/pool');

class Car {
  id;
  make;
  model;
  year;
  vin;

  constructor({ id, make, model, year, vin }) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.vin = vin;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, make, model FROM cars;');
    return rows.map((carRows) => new Car(carRows));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM cars
        WHERE id = $1
        ;`,
      [id]
    );
    if (!rows[0]) return;
    return new Car(rows[0]);
  }

  //   static async insert({ make, model, year, vin }) {
  //     const { rows } = await pool.query(
  //       `
  //         INSERT INTO cars (make, model, year, vin)
  //         VALUES ($1, $2, $3, $4)
  //         RETURNING *
  //         ;`,
  //       [make, model, year, vin]
  //     );
  //     return new Car(rows[0]);
  //   }
}

module.exports = Car;
