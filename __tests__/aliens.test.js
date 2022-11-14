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

  afterAll(() => {
    pool.end();
  });
});
