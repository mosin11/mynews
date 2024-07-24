const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rss',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your backend server
      changeOrigin: true,
      pathRewrite: {
        '^/rss': '', // Remove /rss prefix when forwarding to backend
      },
    })
  );
};
