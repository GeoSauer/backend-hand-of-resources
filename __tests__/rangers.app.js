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
          "familiar": "Roseat flamingo",
          "first_name": "Liv",
          "gender": "Female",
          "id": "1",
          "last_name": "Onagraceae",
        },
        Object {
          "familiar": "Indian leopard",
          "first_name": "Joshia",
          "gender": "Male",
          "id": "2",
          "last_name": "Solanaceae",
        },
        Object {
          "familiar": "Cardinal, red-capped",
          "first_name": "Elfie",
          "gender": "Genderqueer",
          "id": "3",
          "last_name": "Lichinaceae",
        },
        Object {
          "familiar": "Fox, crab-eating",
          "first_name": "Margy",
          "gender": "Female",
          "id": "4",
          "last_name": "Hydrocharitaceae",
        },
        Object {
          "familiar": "Porcupine, tree",
          "first_name": "Ted",
          "gender": "Male",
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
