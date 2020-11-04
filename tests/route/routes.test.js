const request = require('supertest');
const app = require('../../back/app');
const fs = require('fs');

let user;
let server;

const testFiles = ['test.pdf','test.txt'];

describe('Route tests', () => {

  beforeAll(async () => {
    user = await request.agent(app);
    server = await app.listen(3000);
  });

  beforeEach(async () => {
    fs.mkdirSync('drive');
    testFiles.forEach((fileName) => {
      fs.writeFileSync('drive/' + fileName,'');
    });
  });

  afterEach(async () =>{
    fs.rmdirSync('drive',{recursive : true});
  });

  test('The server allow CORS', async () => {
    const response = await request(app).get('/');
    const headers = response.headers;
    expect(headers["access-control-allow-origin"]).toBe("*");
    expect(headers["access-control-allow-methods"]).toBe("GET, HEAD, OPTIONS, POST, PUT, DELETE");
    expect(headers["access-control-allow-headers"]).toBe("Origin, X-Requested-With, Content-Type, Accept, Authorization");
  });

  test('server responds filearay', async () => {
    const response = await request(app).get('/fileArray');
    var files = response.body;
    expect(files).toEqual(testFiles);
  });

  test('delete file', async () => {
    var response = await request(app).delete('/fileDelete').query({fileName : testFiles[0]});
    let files = fs.readdirSync('./drive');
    expect(files).toEqual([testFiles[1]]);
  });
});
