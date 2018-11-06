const request = require('request');

const requestResult = (req, res) => {
  const { body: { name, email } } = req;
  const options = {
    method: 'POST',
    url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    body: JSON.stringify({ name, email }),
    timeout: 10000,
  };
  request(options, (err, httpResponse, body) => {
    const statusCode = httpResponse && httpResponse.statusCode || 400;
    res.status(statusCode).send(body || {errorMessage: 'Timeout'});
  });
};

module.exports = {
  requestResult,
};
