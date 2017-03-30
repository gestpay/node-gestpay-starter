const soap = require('soap');

class WsCryptDecrypt {
  /**
 * 
 * @param {boolean} isTest if true, it will send the requests towards the test environment. 
 */

  constructor(isTest) {
    this.url = 'https://ecommS2S.sella.it/gestpay/GestPayWS/WsCryptDecrypt.asmx?wsdl';
    let testUrl = 'https://testecomm.sella.it/gestpay/GestPayWS/WsCryptDecrypt.asmx?wsdl';

    if (isTest) {
      this.url = testUrl;
    }
  }

  /**
 * private method that will instantiate the soapClient. This method must be called
 * in every operation, as the first operation.
 * @returns {Promise<undefined>} a promise with nothing, just to say that the client has been instantiated. 
 */

  _init() {
    return new Promise((resolve, reject) => {
      if (this.soapClient) resolve();

      const options = {
        connection: 'keep-alive'
      };

      soap.createClient(this.url, options, (err, client) => {
        if (err) throw reject(err);
        this.soapClient = client;
        resolve();
      });
    });
  }

  /**
 * 
 * @param {object} encryptRequest
 * @param {string} encryptRequest.shopLogin the shop code
 * @param {string} encryptRequest.uicCode the uic code (currency)
 * @param {string} encryptRequest.amount the amount of the transaction
 * @param {string} encryptRequest.shopTransactionId a transaction id defined by the merchant
 * @returns {Promise.object} returns an object representing the response
 */

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

  /**
	 * returns the informations about the status of the transaction.
	 * @param {object} decryptRequest 
	 * @param {string} decryptRequest.shopLogin the shop code
	 * @param {string} decryptRequest.CryptedString a string to decrypt
	 */

  decrypt(decryptRequest) {
    return this._init().then(() => {
      return new Promise((resolve, reject) => {
        this.soapClient.Decrypt(decryptRequest, (err, result) => {
          if (err) reject(err);
          resolve(result.DecryptResult.GestPayCryptDecrypt);
        });
      });
    });
  }
}

module.exports = WsCryptDecrypt;
