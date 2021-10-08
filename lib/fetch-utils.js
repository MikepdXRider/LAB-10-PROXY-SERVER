function mungeReviewData(dataArr) {
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

  return dataArr.map(dataObj => {
    return {
      name: dataObj.name,
      image_url: dataObj.image_url,
      price: dataObj.price,
      rating: dataObj.rating,
      url: dataObj.url
    };
  });
}

function mungeWeatherData(dataArr) {
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

  return dataArr.map(dataObj => {
    return {
      forecast: dataObj.weather.description,
      time: dataObj.datetime
    };
  });
}

function mungeLocationData(dataArr) {
  return {
    formatted_query: dataArr.display_name,
    latitude: dataArr.lat,
    longitude: dataArr.lon
  };
}


module.exports = {
  mungeReviewData,
  mungeLocationData,
  mungeWeatherData
};