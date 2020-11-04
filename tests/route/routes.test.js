const request = require('supertest');
const app = require('../../back/app');

let user;
let server;

describe('Route tests', () => {

  beforeAll(async () => {
    user = await request.agent(app);
    server = await app.listen(3000);
  });

  afterAll(async () => {
    await server.close();
  });


  test('GET index.html', (done) => {
    done();
  });

  test('GET 404', (done) => {
    done();
  });
});
