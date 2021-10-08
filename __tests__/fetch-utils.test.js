require('dotenv').config();
const { mungeReviewData, mungeLocationData, mungeWeatherData } = require('../lib/fetch-utils.js');
const { testLocationData, testReviewData, testWeatherData } = require('../data/test-data.js');

describe('app routes', () => {
  describe('routes', () => {

    test('mungeLocationData get returns expected data', async() => {
      
      const actual = mungeLocationData(testLocationData);

      const expectation = {
        formatted_query: expect.any(String),
        latitude: expect.any(String),
        longitude: expect.any(String)
      };

      expect(actual).toEqual(expectation);
    });
    

    test('mungeWeatherData get returns expected data', async() => {
  
      const actual = mungeWeatherData(testWeatherData);
  
      const expectation = {
        forecast: expect.any(String),
        time: expect.any(String)
      };
  
      expect(actual).toEqual(expect.arrayContaining([expectation]));
    });


    test('mungeWeatherData get returns expected data', async() => {
  
      const actual = mungeReviewData(testReviewData);
  
      const expectation = {
        name: expect.any(String),
        image_url: expect.any(String),
        price: expect.any(String), 
        rating: expect.any(Number), 
        url: expect.any(String) 
      };
  
      expect(actual).toEqual(expect.arrayContaining([expectation]));
    });
  });
});