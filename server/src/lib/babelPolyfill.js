// load babelPolyfill in case of it not finded in global env
if (!global._babelPolyfill) {
  require('babel-polyfill'); // eslint-disable-line
}
