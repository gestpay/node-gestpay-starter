const expect = require('expect');

const externalIp = require('./external-ip');

describe('external-ip', () => {
  it('should retrieve the external IP', () => {
    return externalIp.getIp().then(ip => {
      expect(ip).toBeA('string').toBeTruthy();
    });
  });
});
