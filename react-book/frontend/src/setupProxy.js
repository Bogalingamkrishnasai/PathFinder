const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(createProxyMiddleware(
    ['/api', '/pathfinder'],
    { target: 'http://localhost:3025', changeOrigin: true, ws: true },
  ));
};
