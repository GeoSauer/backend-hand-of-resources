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
}

module.exports = Car;
