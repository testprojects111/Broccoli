const path = require('path');
const express = require('express');
const adaro = require('adaro');
const bodyParser = require('body-parser');
const compression = require('compression');

const eStatic = express.static;
const app = express();
const request = require('./routes/request');

app.use(compression());
app.use(bodyParser.json());
app.use('/', request);
const staticDir = path.join(__dirname, '../../public');
app.use('/', eStatic(staticDir, {
  index: false,
  maxAge: '1d',
  redirect: false,
}));
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', adaro.dust({
  cache: true,
}));
app.set('view engine', 'dust');
app.get('/', (req, res) => {
  res.render('app');
});
app.listen(3002, () => console.log('running on port 3002')); // eslint-disable-line no-console
