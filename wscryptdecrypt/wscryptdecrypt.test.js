const expect = require('expect');

const WsCryptDecrypt = require('./wscryptdecrypt');
const properties = require('../properties');

describe('WsCryptEncrypt webservice', () => {
  it('should encrypt the request', () => {
    let wsCryptDecryptClient = new WsCryptDecrypt(true);

    // build shopTransactionId
    let now = new Date();
    let shopTransactionId = `MYSHOP_${now.getFullYear()}_${now.getMonth()}_${now.getDate()}-${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}-${now.getMilliseconds()}`;

    let encryptRequest = {
      shopLogin: properties.shopLogin,
      uicCode: '242',
      amount: '82.21',
      shopTransactionId
    };

    return wsCryptDecryptClient.encrypt(encryptRequest).then(result => {
      //console.log(result);
      expect(result).toInclude({
        TransactionType: 'ENCRYPT',
        TransactionResult: 'OK',
        ErrorCode: '0'
      });
      expect(result.CryptDecryptString).toBeA('string').toNotBe(null);
    });
  });

  /**
	 * This test serves only to check that the connection with Gestpay is OK.
	 * It's impossible to retrieve a Gestpay DecryptedString that's valid forever.
	 */
  it('should fail with wrong decrypt string', () => {
    let wsCryptDecryptClient = new WsCryptDecrypt(true);
    return wsCryptDecryptClient
      .decrypt({
        shopLogin: properties.shopLogin,
        CryptedString: 'abcdefivgngj'
      })
      .then(result => {
        expect(result).toBeA('object').toInclude({
          TransactionType: 'DECRYPT',
          TransactionResult: 'KO',
          ErrorCode: '1141'
        });
      });
  });
});
