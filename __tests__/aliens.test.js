const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('aliens routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('GET /aliens should return a list of aliens', async () => {
    const resp = await request(app).get('/aliens');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "hostile": "false",
          "id": "1",
          "name": "Wrapsafe",
        },
        Object {
          "hostile": "true",
          "id": "2",
          "name": "Tampflex",
        },
        Object {
          "hostile": "true",
          "id": "3",
          "name": "Sub-Ex",
        },
        Object {
          "hostile": "true",
          "id": "4",
          "name": "Aerified",
        },
        Object {
          "hostile": "false",
          "id": "5",
          "name": "Tempsoft",
        },
      ]
    `);
  });

  test('GET /aliens/:id should return details on a specific alien', async () => {
    const resp = await request(app).get('/aliens/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstContact": "2/2/2022",
        "hostile": "false",
        "id": "1",
        "name": "Wrapsafe",
      }
    `);
  });

  test('POST /aliens should create a new alien', async () => {
    const newAlien = {
      name: 'Swiggity',
      firstContact: '4/20/2020',
      hostile: 'True',
    };
    const resp = await request(app).post('/aliens').send(newAlien);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstContact": "4/20/2020",
        "hostile": "True",
        "id": "6",
        "name": "Swiggity",
      }
    `);
  });

  test('PUT /aliens/:id should update an existing alien', async () => {
    const resp = await request(app).put('/aliens/1').send({
      hostile: 'True',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstContact": "2/2/2022",
        "hostile": "True",
        "id": "1",
        "name": "Wrapsafe",
      }
    `);
  });

  test('DELETE /aliens/:id should delete an alien', async () => {
    const resp = await request(app).delete('/aliens/1');
    expect(resp.status).toBe(200);
    const alienResp = await request(app).get('/aliens/1');
    expect(alienResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
