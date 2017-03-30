# node-gestpay-starter

In this project you'll see an example e-commerce that will pay through Gestpay Starter solution. 

## Prerequisites 

- NodeJS (4+)
- [ngrok](https://ngrok.com), if you want to launch this example locally on your development machine. 

## How to start 

- install the dependencies: `npm install`
- open file `properties.json` and set your `shopLogin`
- launch ngrok with `./ngrok http 3000`, where `3000` is the port configured in `properties.json`.It will return an address like `http://44bda365.ngrok.io` 
- Go in [Merchant Back Office](https://testecomm.sella.it/BackOffice) and, in _Configuration_, configure your server address: for example `http://44bda365.ngrok.io/response` in *URL for positive response*, *URL for negative response*. 
- launch the app with `npm start`

## Under the hood 
This example tries to be as simple as possible. Here is a list of npm packages used: 

- [Express](https://expressjs.com), a web framework. 
- [Handlebars](http://handlebarsjs.com), to render html templates 
- [Soap](https://www.npmjs.com/package/soap), a node package to interact with SOAP endpoints.  

## There's more

- `npm run watch`: will run the app but for every modification it will reload instantly. Useful during development; 
- `npm test`: will run all the tests
- `npm run test-watch`: if you change something, tests will re-run
- `npm run jsdoc`: you might like to have some documentation about the two modules used in this project, check it `out`. 

## Notable Files 

- `server.js` : contains all the express logic and configuration. 
- `gestpay_service/GestpayService.js`: used for communicating between server.js and wscryptdecrypt.js 
- `wscryptdecrypt/wscryptdectypt.js`: the low level file that will perform the soap calls to Gestpay. 
- `properties.json`: a file with some global properties. 

## A brief description of the user interaction

- The main entry point is `/`, where the user can choose a product to pay. 
- After clicking on _buy_ button, the server will ask Gestpay for an `encryptionString` and the user will redirect to `/pay`. 
- When the user clicks on _pay_, he will be redirected to Gestpay website to complete the payment. 
- When the payment is completed, Gestpay will call `/response`, our server will decrypt the `encryptionString` received, and the transaction status is showed to the user. 