const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('druid routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET /druids should return a list of druids', async () => {
    const resp = await request(app).get('/druids');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Melanelia Lichen",
          "id": "1",
          "lastName": "Parmeliaceae",
        },
        Object {
          "firstName": "Didier's Tulip",
          "id": "2",
          "lastName": "Liliaceae",
        },
        Object {
          "firstName": "Flowers' Rim Lichen",
          "id": "3",
          "lastName": "Lecanoraceae",
        },
        Object {
          "firstName": "Big Blackberry",
          "id": "4",
          "lastName": "Rosaceae",
        },
        Object {
          "firstName": "Broadleaved Pepperweed",
          "id": "5",
          "lastName": "Brassicaceae",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
