const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const properties = require('./properties');
const GestpayService = require('./gestpay_service/GestpayService');
const externalIp = require('./external-ip/external-ip');

// This is the service we will use to talk with Gestpay
const gestpayService = new GestpayService();

externalIp.getIp().then(ip => {
  console.log(`The server's ip is ${ip}`);
});

//instantiation of express app
const app = express();

// We will use Handlebars as a template engine. This allows us to write
// normal code but we can inject some variables using double courly braces (e.g. {{ }}).
// these templates are in "/views", while in "/views/partials"" there are templates
// that are used by other templates.
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//configuration of middlewares.
//We use these to read POST parameters.
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

/**
 * This is the default route. It will render the homepage.
 */
app.get('/', (req, res) => {
  res.render('index.hbs');
});

/**
 * When the user goes to /pay , the system will call Gestpay to receive the
 * encryptedString, necessary for the payment. Then, it will render the page
 * "pay.hbs", passing the crypted informations. 
 */
app.post('/pay', (req, res) => {
  let item = req.body.item;
  let amount = req.body.price;
  console.log(`received request for ${item} with price ${amount}...`);
  let testEnv = properties.testEnv || true;
  let url = properties.testEnv ? 'https://sandbox.gestpay.net/pagam/pagam.aspx' : 'https://ecomm.sella.it/pagam/pagam.aspx'
  gestpayService.encrypt({
      item,
      amount
    })
    .then(cryptedString => {
      console.log('cryptedString: ' + JSON.stringify(cryptedString, null, 2));

      res.render('pay.hbs', {
        shopLogin: properties.shopLogin,
        cryptedString,
        item,
        amount,
        url
      });
    })
    .catch(err => {
      res.render('error.hbs', {
        error: JSON.stringify(err, null, 2)
      });
    });
});

/**
 * Once the user has payed on Gestpay page, Gestpay will redirect the user to
 * a page on your server. You must configure Gestpay Back office to return on
 * “/response". Gestpay Will send two parameters, a shopLogin and a cryptedString
 * with the result of the payment. We will decrypt this string and render the page
 * "response.hbs" with the decrypted data. 
 */
app.get('/response', (req, res) => {
  let shopLogin = req.query.a;
  let cryptedString = req.query.b;
  console.log(`received a GET /response, decrypting ...`);
  gestpayService
    .decrypt({
      shopLogin,
      cryptedString
    })
    .then(result => {
      console.log(result);
      resultJson = JSON.stringify(result, null, 2);
      res.render('response.hbs', {
        result,
        resultJson
      });
    })
    .catch(err => {
      res.render('error.hbs', {
        error: err
      });
    });
});

/**
 * Everything that is in "/public" will be served as is. 
 */
app.use(express.static(__dirname + '/public'));

/**
 * specify the port on which the app should run.
 * The port can be set via environment (like on Heroku) or
 * via properties.json file. Otherwise, 3000 is the default port.
 */
const port = process.env.PORT || properties.port || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});