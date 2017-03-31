/**
 * @module ./external-ip/external-ip
 */

const http = require('http');

/**
 * returns a Promise with the external ip address.
 * @returns {Promise<string>} the external IP address
 */
module.exports.getIp = () => {
  return new Promise((resolve, reject) => {
    http
      .get('http://ipinfo.io/ip', res => {
        res.setEncoding('utf8');
        let ip = '';
        res.on('data', chunk => {
          ip += chunk;
        });
        res.on('end', () => {
          resolve(ip);
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
};
