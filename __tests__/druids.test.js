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

  test('GET /druids/:id should return details on a specific druid', async () => {
    const resp = await request(app).get('/druids/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Melanelia Lichen",
        "gender": "Male",
        "id": "1",
        "lastName": "Parmeliaceae",
      }
    `);
  });

  test('POST /druids should create a new druid', async () => {
    const newDruid = {
      firstName: 'Hunter',
      lastName: 'Hunter',
      gender: 'Male',
    };
    const resp = await request(app).post('/druids').send(newDruid);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Hunter",
        "gender": "Male",
        "id": "6",
        "lastName": "Hunter",
      }
    `);
  });

  test('PUT /druids/:id should update an existing druid', async () => {
    const resp = await request(app).put('/druids/1').send({
      firstName: 'Bobby',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Bobby",
        "gender": "Male",
        "id": "1",
        "lastName": "Parmeliaceae",
      }
    `);
  });

  test('DELETE /druids/:id should delete a druid', async () => {
    const resp = await request(app).delete('/druids/1');
    expect(resp.status).toBe(200);
    const druidResp = await request(app).get('/druids/1');
    expect(druidResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
