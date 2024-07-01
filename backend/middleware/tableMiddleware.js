const bodyParser = require("body-parser");

const setupBodyParser = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = setupBodyParser;
