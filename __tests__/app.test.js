require('dotenv').config();

// const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
// const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    // let token;
  
    // beforeAll(async () => {
    //   execSync('npm run setup-db');
  
    //   await client.connect();
    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });
      
    //   token = signInData.body.token; // eslint-disable-line
    // }, 10000);
  
    // afterAll(done => {
    //   return client.end(done);
    // });

    test('location get returns expected data', async() => {

      const expectation = {
        formatted_query: expect.any(String),
        latitude: expect.any(String),
        longitude: expect.any(String)
      };

      const data = await fakeRequest(app)
        .get('/location?search=portland')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    
    test('weather get returns expected data', async() => {

      const expectation = {
        forecast: expect.any(String),
        time: expect.any(String)
      };

      const data = await fakeRequest(app)
        .get('/weather?latitude=45.5202471&longitude=-122.6741949')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining([expectation]));
    });

    test('reviews get returns expected data', async() => {

      const expectation = {
        name: expect.any(String),
        image_url: expect.any(String),
        price: expect.any(String), 
        rating: expect.any(Number), 
        url: expect.any(String) 
      };

      const data = await fakeRequest(app)
        .get('/reviews?latitude=45.5202471&longitude=-122.6741949')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining([expectation]));
    });
  });
});
