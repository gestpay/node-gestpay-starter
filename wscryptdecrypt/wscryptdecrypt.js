const soap = require('soap');

module.exports = class WsCryptDecrypt {

	constructor(isTest) {
		this.url = 'https://ecommS2S.sella.it/gestpay/GestPayWS/WsCryptDecrypt.asmx?wsdl';
		let testUrl = 'https://testecomm.sella.it/gestpay/GestPayWS/WsCryptDecrypt.asmx?wsdl';

		if (isTest) {
			this.url = testUrl;
		}

	}

	_init() {
		return new Promise((resolve, reject) => {
			
			if (this.soapClient) resolve();

			const options = {
				connection: 'keep-alive'
			}

			soap.createClient(this.url, options, (err, client) => {
			
				if (err) throw reject(err);
				this.soapClient = client;
				resolve();
			});
		})
	}

	encrypt(encryptRequest) {
		return this._init().then(() => {
			return new Promise((resolve, reject) => {
				this.soapClient.Encrypt(encryptRequest, (err, result) => {
					if (err) reject(err);
					resolve(result.EncryptResult.GestPayCryptDecrypt);
				});
			});
		});
	}

}