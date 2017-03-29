const expect = require('expect');

const GestpayService = require('./GestpayService');

describe('GestpayService', () => {

	let gestpayService = new GestpayService(); 

	it('should request a cryptedString to Gestpay', (done) => {

		gestpayService.encrypt({
			amount: '12'
		}).then((cryptedString) => {
			expect(cryptedString).toBeA('string');
			expect(cryptedString.length).toBeGreaterThan(20);
			done();
		}).catch((err) => {
			expect(err).toBe(null);
			done();
		})

	})

});