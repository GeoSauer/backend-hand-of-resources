const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('paints routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET /paints should return a list of paints', async () => {
    const resp = await request(app).get('/paints');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "looksLike": "Goldenrod",
        },
        Object {
          "id": "2",
          "looksLike": "Aquamarine",
        },
        Object {
          "id": "3",
          "looksLike": "Red",
        },
        Object {
          "id": "4",
          "looksLike": "Pink",
        },
        Object {
          "id": "5",
          "looksLike": "Fuscia",
        },
      ]
    `);
  });

  test('GET /paints/:id should return details on a specific paint', async () => {
    const resp = await request(app).get('/paints/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "hex": "#df9d1e",
        "id": "1",
        "looksLike": "Goldenrod",
        "smellsLike": "Bandarlampung",
      }
    `);
  });
  afterAll(() => {
    pool.end();
  });
});
