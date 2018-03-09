const proxy = require('http-proxy-middleware');
const express = require('express');
const path = require('path');
let app = express()

app.use(
  '/currency-api',
  proxy({
    "target": 'https://api.coinmarketcap.com/v1/ticker/',
    "pathRewrite": { '^/currency-api': '' },
    "changeOrigin": true,
    "secure": false,
    // SHAME: pretty sure these headers aren't needed anymore
    "headers": {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3600',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    // SHAME: Forgot the source of this code
    "bypass": function (req, res, proxyOptions) {
      if (req.method === 'OPTIONS') {

        res.statusCode = 200
        return true // I don't know the purpose of this line, but indeed it works
      }
    }
  })
)

app.use('/', express.static(path.join(process.env.PWD, 'dist')));

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});
