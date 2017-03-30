const expect = require('expect');

const GestpayService = require('./GestpayService');

describe('GestpayService', () => {
  let gestpayService = new GestpayService();

  it('should request a cryptedString to Gestpay', () => {
    return gestpayService
      .encrypt({
        amount: '12'
      })
      .then(cryptedString => {
        expect(cryptedString).toBeA('string');
        expect(cryptedString.length).toBeGreaterThan(20);
      });
  });

  it('should Decrypt the string (with a mock)', () => {
    expect.spyOn(gestpayService, 'decrypt').andReturn(
      Promise.resolve({
        TransactionType: 'DECRYPT'
      })
    );

    return gestpayService
      .decrypt({
        cryptedString: 'abcdefghijklmno'
      })
      .then(result => {
        expect(result).toBeAn('object').toInclude({
          TransactionType: 'DECRYPT'
        });
      });

    gestpayService.decrypt.restore();
  });
});
