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


function mungeTrailData(trailDataArr) {
  const mungedTrailDataArr = trailDataArr.map(item => {
    return {
      name: item.name,
      location: item.city,
      length: String(item.distance),
      stars: String(item.rating),
      star_votes: String(item.ratings),
      summary: 'N/A',
      trail_url: item.url,
      conditions: 'N/A',
      condition_date: 'N/A',
      condition_time: 'N/A'
    };
  });
  mungedTrailDataArr.splice(7);
  return mungedTrailDataArr;
}


module.exports = {
  mungeReviewData,
  mungeLocationData,
  mungeWeatherData,
  mungeTrailData
};