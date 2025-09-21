const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
app.use(morgan('dev'));

// Example proxy pool
const proxies = JSON.parse(fs.readFileSync('proxy_pool.json'));
let current = 0;

function getNextProxy() {
  current = (current + 1) % proxies.length;
  return proxies[current];
}

app.use('/proxy', (req, res, next) => {
  const target = getNextProxy();
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 HistoryProxy');
    }
  })(req, res, next);
});

app.listen(8080, () => console.log('Server running on port 8080'));
