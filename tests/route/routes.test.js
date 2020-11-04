const request = require('supertest');
const app = require('../../back/app');

let user;
let server;

describe('Route tests', () => {

  beforeAll(async () => {
    user = await request.agent(app);
    server = await app.listen(3000);
  });

  test('The server allow CORS', (done) => {
    request(app).get('/fileArray').then((response) => {
      console.log(response.data);
      const headers = response.headers;
      expect(headers["access-control-allow-origin"]).toBe("*");
      done();
    });
  });

  test('The server allow CORS', async () => {
    const response = await request(app).post('/fileArray');
    const headers = response.headers;
    expect(headers["access-control-allow-origin"]).toBe("*");
  });
});
