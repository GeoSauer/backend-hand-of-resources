const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET /cars should return a list of cars', async () => {
    const resp = await request(app).get('/cars');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "make": "GMC",
          "model": "Rally Wagon 1500",
        },
        Object {
          "id": "2",
          "make": "BMW",
          "model": "1 Series",
        },
        Object {
          "id": "3",
          "make": "BMW",
          "model": "1 Series",
        },
        Object {
          "id": "4",
          "make": "Subaru",
          "model": "Leone",
        },
        Object {
          "id": "5",
          "make": "Cadillac",
          "model": "DeVille",
        },
      ]
    `);
  });

  test('GET /cars:id should return details on a specific car', async () => {
    const resp = await request(app).get('/cars/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "make": "GMC",
        "model": "Rally Wagon 1500",
        "vin": "WAUDH48H47K452914",
        "year": "1992",
      }
    `);
  });

  test('POST /cars should create new car', async () => {
    const newCar = {
      make: 'Chevrolet',
      model: 'Colorado',
      vin: 'WCUDG42H47K452416',
      year: '2023',
    };
    const resp = await request(app).post('/cars').send(newCar);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "6",
        "make": "Chevrolet",
        "model": "Colorado",
        "vin": "WCUDG42H47K452416",
        "year": "2023",
      }
    `);
  });

  test('PUT /cars/:id should update an existing car', async () => {
    const resp = await request(app).put('/cars/1').send({
      model: 'Power Wagon 1500',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "make": "GMC",
        "model": "Power Wagon 1500",
        "vin": "WAUDH48H47K452914",
        "year": "1992",
      }
    `);
  });

  test.only('DELETE /cars/:id should delete a car', async () => {
    const resp = await request(app).delete('/cars/1');
    expect(resp.status).toBe(200);
    const carResp = await request(app).get('/cars/1');
    expect(carResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
