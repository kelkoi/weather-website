const request = require("request");
const chalk = require("chalk");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/5388fdd178706c884ca659a390169bf8/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        chalk.red.inverse("unable to connect to weather service"),
        undefined
      );
    } else if (body.error) {
      callback(chalk.red.inverse("unable to find location"), undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          "it's currently " +
          body.currently.temperature +
          " degrees out. There is a chance of " +
          body.currently.precipProbability +
          " % of rain."
      );
    }
  });
};
module.exports = forecast;
