const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET /rangers should return a list of rangers', async () => {
    const resp = await request(app).get('/rangers');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "first_name": "Liv",
          "id": "1",
          "last_name": "Onagraceae",
        },
        Object {
          "first_name": "Joshia",
          "id": "2",
          "last_name": "Solanaceae",
        },
        Object {
          "first_name": "Elfie",
          "id": "3",
          "last_name": "Lichinaceae",
        },
        Object {
          "first_name": "Margy",
          "id": "4",
          "last_name": "Hydrocharitaceae",
        },
        Object {
          "first_name": "Ted",
          "id": "5",
          "last_name": "Solanaceae",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
