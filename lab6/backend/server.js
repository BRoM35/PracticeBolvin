const express        = require('express');
const mongoose =      require("mongoose");
const Schema =        mongoose.Schema;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 3001;
const Tests = require('./app/models/test')(mongoose);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(db.url,  {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err, database) => {
  if (err) return console.log(err);

  require('./app/routes')(
    app,
    mongoose,
    Tests
  );

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
