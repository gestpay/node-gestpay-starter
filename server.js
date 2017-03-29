const express = require('express');
const hbs = require('hbs');
const  bodyParser = require('body-parser');

const port = process.env.PORT || 3000 ;  

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
	let price = req.body.price;
	console.log(`received request for ${item} with price ${price}...`)
	// TODO perform soap request ...
	// TODO redirect encrypt variable to template ... 
});

//TODO create response app

app.use(express.static(__dirname+'/public'));

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});