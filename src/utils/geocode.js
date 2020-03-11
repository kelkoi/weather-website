const request = require("request");
const chalk = require("chalk");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZWxrb2toYW91bGEiLCJhIjoiY2s3YzJibDZ2MDludjNmcGF2ZGV4cHBneSJ9.28f-HBRZhTejdhpE_TXO2A&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        chalk.red.inverse("unable to connect to Geocode service"),
        undefined
      );
    } else if (body.message || body.features.length === 0) {
      callback(chalk.red.inverse("unable to find location"), undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};
module.exports = geocode;
