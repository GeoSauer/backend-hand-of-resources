const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('aliens routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET / should return a list of aliens', async () => {
    const resp = await request(app).get('/aliens');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "hostile": "false",
          "name": "Wrapsafe",
        },
        Object {
          "hostile": "true",
          "name": "Tampflex",
        },
        Object {
          "hostile": "true",
          "name": "Sub-Ex",
        },
        Object {
          "hostile": "true",
          "name": "Aerified",
        },
        Object {
          "hostile": "false",
          "name": "Tempsoft",
        },
      ]
    `);
  });

  test('GET /:id should return details on a specific alien', async () => {
    const resp = await request(app).get('/aliens/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstContact": "2022-02-02T07:00:00.000Z",
        "hostile": "false",
        "id": "1",
        "name": "Wrapsafe",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
