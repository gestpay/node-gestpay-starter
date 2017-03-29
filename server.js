const express = require('express');
const hbs = require('hbs');
const  bodyParser = require('body-parser');

const properties = require('./properties');
const GestpayService = require('./gestpay_service/GestpayService');

const port = process.env.PORT || 3000 ;  
const gestpayService = new GestpayService();

const app = express();

//configuration of handlebars 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//configuration of middlewares
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (req, res) => {
	res.render('index.hbs'); 
}); 

app.post('/pay', (req, res) => {
	let item = req.body.item;
	let amount = req.body.price;
	console.log(`received request for ${item} with price ${amount}...`)
	gestpayService.encrypt({
		item, 
		amount
	}).then((cryptedString) => {
		res.render('pay.hbs', {
			shopLogin: properties.shopLogin,
			cryptedString, 
			item,
			amount
		})
	}).catch((err) => {
		res.render('error.hbs', {
			error: err
		});
	});
});

app.get('/response', (req, res) => {
	let shopLogin = req.params.a; 
	let cryptedString = req.params.b; 
	console.log(`received a GET /response ...`);

	
});

app.use(express.static(__dirname+'/public'));

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});
