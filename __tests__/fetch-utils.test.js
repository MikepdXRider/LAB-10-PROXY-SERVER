require('dotenv').config();
const { mungeReviewData, mungeLocationData, mungeWeatherData, mungeTrailData } = require('../lib/fetch-utils.js');
const { testLocationData, testReviewData, testWeatherData, testTrailData } = require('../data/test-data.js');

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


    test('mungeReviewData get returns expected data', async() => {
  
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


    test('mungeTrailData get returns expected data', async() => {
  
      const actual = mungeTrailData(testTrailData);
  
      const expectation = {
        name: expect.any(String),
        location: expect.any(String),
        length: expect.any(String),
        stars: expect.any(String),
        star_votes: expect.any(String),
        summary: expect.any(String),
        trail_url: expect.any(String),
        conditions: expect.any(String),
        condition_date: expect.any(String),
        condition_time: expect.any(String)
      };
  
      expect(actual).toEqual(expect.arrayContaining([expectation]));
    });
  });
});