require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  describe('routes', () => {
    
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
