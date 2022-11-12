const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('/cars should return a list of cars', async () => {
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

  afterAll(() => {
    pool.end();
  });
});
