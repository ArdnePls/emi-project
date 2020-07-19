const { createProxyMiddleware } = require('http-proxy-middleware');

const googleProxy = createProxyMiddleware({
    target: 'http://www.google.com',
    changeOrigin: true,
    pathRewrite: { '/proxy': '' },
});

module.exports = { googleProxy }