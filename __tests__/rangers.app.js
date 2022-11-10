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
          "firstName": "Liv",
          "id": "1",
          "lastName": "Onagraceae",
        },
        Object {
          "firstName": "Joshia",
          "id": "2",
          "lastName": "Solanaceae",
        },
        Object {
          "firstName": "Elfie",
          "id": "3",
          "lastName": "Lichinaceae",
        },
        Object {
          "firstName": "Margy",
          "id": "4",
          "lastName": "Hydrocharitaceae",
        },
        Object {
          "firstName": "Ted",
          "id": "5",
          "lastName": "Solanaceae",
        },
      ]
    `);
  });

  test('GET /rangers/1 should return details on a specific ranger', async () => {
    const resp = await request(app).get('/rangers/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      firstName: 'Liv',
      lastName: 'Onagraceae',
      gender: 'Female',
      companion: 'Roseat flamingo',
    });
  });

  test('POST /rangers should create a new ranger', async () => {
    const newRanger = {
      firstName: 'Olbric',
      lastName: 'Cucurbitaceae',
      gender: 'genderqueer',
      companion: 'hedgehog',
    };
    const resp = await request(app).post('/rangers').send(newRanger);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newRanger,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
