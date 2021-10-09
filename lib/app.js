const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const { mungeTrailData, mungeLocationData, mungeReviewData, mungeWeatherData } = require('./fetch-utils.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


const authRoutes = createAuthRoutes();


// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);


// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);


// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});


// Location GET request
app.get('/location', async(req, res) => {
  try {
    const cityNameQuery = req.query.search;
    
    const responseObj = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${cityNameQuery}&format=json`);
    
    const locationDataObj = responseObj.body[0];

    const mungedDataObj = mungeLocationData(locationDataObj);

    res.json(mungedDataObj);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.get('/weather', async(req, res) => {
  try {

    const longitudeQuery = req.query.longitude;
    const latitudeQuery = req.query.latitude;
    
    const responseObj = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitudeQuery}&lon=${longitudeQuery}&key=${process.env.WEATHER_KEY}`);
    
    const weatherDataArr = responseObj.body.data;

    const mungedDataObj = mungeWeatherData(weatherDataArr);

    res.json(mungedDataObj);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.get('/trails', async(req, res) => {
  try {

    const longitudeQuery = req.query.longitude;
    const latitudeQuery = req.query.latitude;
    
    // eslint-disable-next-line quotes
    const responseObj = await request.get(`https://prescriptiontrails.org/api/filter/?by=coord&lat=${latitudeQuery}&lng=${longitudeQuery}&offset=0&count=50`);
    
    const trailDataArr = responseObj.body.trails;

    const mungedDataArr = mungeTrailData(trailDataArr);

    res.json(mungedDataArr);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.get('/reviews', async(req, res) => {
  try {

    const longitudeQuery = req.query.longitude;
    const latitudeQuery = req.query.latitude;
    
    // eslint-disable-next-line quotes
    const responseObj = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitudeQuery}&longitude=${longitudeQuery}`).set('Authorization', `Bearer ${process.env.YELP_KEY}`);
    
    const businessDataArr = responseObj.body.businesses;

    const mungedDataObj = mungeReviewData(businessDataArr);

    res.json(mungedDataObj);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


// ❓ What is this?
app.use(require('./middleware/error'));

module.exports = app;


