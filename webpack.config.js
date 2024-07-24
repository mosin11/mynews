// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "timers": require.resolve("timers-browserify"),
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
    }
  },
  // Other configurations...
};
