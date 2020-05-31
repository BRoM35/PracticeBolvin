const tests = require('./testRoutes');

module.exports = function(app, mongoose, Tests) {
  tests(app, mongoose, Tests);
};
