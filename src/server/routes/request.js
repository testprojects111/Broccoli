const express = require('express');
const request = require('../api/controllers/request');

const requestRouter = express.Router({
  mergeParams: true,
});

requestRouter.post('/request', request.requestResult);

module.exports = requestRouter;
