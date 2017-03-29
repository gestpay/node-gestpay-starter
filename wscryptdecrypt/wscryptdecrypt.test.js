const expect = require('expect');

const WsCryptDecrypt = require('./wscryptdecrypt');
const properties = require('../properties');

describe('WsCryptEncrypt webservice', () => {

	it('should encrypt the request', (done) => {
		let wsCryptDecryptClient = new WsCryptDecrypt(true);

		// build shopTransactionId 
		let now = new Date();
		let shopTransactionId = `MYSHOP_${now.getFullYear()}_${now.getMonth()}_${now.getDate()}-${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}-${now.getMilliseconds()}`;

		let encryptRequest = {
			shopLogin: properties.shopLogin,
			uicCode: '242',
			amount: '82.21',
			shopTransactionId
		}

		wsCryptDecryptClient.encrypt(encryptRequest)
			.then((result) => {
				//console.log(result);
				expect(result).toInclude({
					'TransactionType': 'ENCRYPT',
					'TransactionResult': 'OK',
					'ErrorCode': '0'
				});
				expect(result.CryptDecryptString).toBeA('string').toNotBe(null);
				done();
			}).catch((err) => {
				expect(err).toBe(null);
				done();
			});
			
	});
});