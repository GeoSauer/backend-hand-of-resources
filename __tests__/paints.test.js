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

  afterAll(() => {
    pool.end();
  });
});
