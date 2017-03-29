const WsCryptDecrypt = require('../wscryptdecrypt/wscryptdecrypt');
const properties = require('../properties');

module.exports = class GestpayService {

	constructor() {
		this.wsCryptDecrypt = new WsCryptDecrypt(properties.testEnv);
	}

	encrypt(itemToPay) {

		// build shopTransactionId 
		let now = new Date();
		let shopTransactionId = `MYSHOP_${now.getFullYear()}_${now.getMonth()}_${now.getDate()}-${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}-${now.getMilliseconds()}`;

		return new Promise((resolve, reject) => {
			this.wsCryptDecrypt.encrypt({
				shopLogin: properties.shopLogin,
				uicCode: '242',
				amount: itemToPay.amount,
				shopTransactionId
			}).then((encryptResponse) => {
				resolve(encryptResponse.CryptDecryptString);
			}).catch((err) => {
				reject(err);
			});
		});
	}
}