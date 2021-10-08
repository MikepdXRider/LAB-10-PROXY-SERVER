function mungeReviewData(responseObj) {
// REDUCE METHOD
//   return responseObj.body.businesses.reduce((acc, curr) => {
//     const newWeatherObj = {
//       name: curr.name,
//       image_url: curr.image_url,
//       price: curr.price,
//       rating: curr.rating,
//       url: curr.url
//     };
//     return [...acc, newWeatherObj];
//   }, []);

  return responseObj.body.businesses.map(dataObj => {
    return {
      name: dataObj.name,
      image_url: dataObj.image_url,
      price: dataObj.price,
      rating: dataObj.rating,
      url: dataObj.url
    };
  });
}

function mungeWeatherData(responseObj) {
// REDUCE METHOD
//   const mungedDataObj = responseObj.body.data.reduce((acc, curr) => {
//     const newWeatherObj = {
//       forecast: curr.weather.description,
//       time: curr.datetime
//     };
//     return [...acc, newWeatherObj];
//   }, []);
//   mungedDataObj.splice(7);
//   return mungedDataObj;

  return responseObj.body.data.map(dataObj => {
    return {
      forecast: dataObj.weather.description,
      time: dataObj.datetime
    };
  });
}

function mungeLocationData(responseObj) {
  return {
    formatted_query: responseObj.body[0].display_name,
    latitude: responseObj.body[0].lat,
    longitude: responseObj.body[0].lon
  };
}

module.exports = {
  mungeReviewData,
  mungeLocationData,
  mungeWeatherData
};