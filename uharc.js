const compress = require('./actions/compress');
const extract = require('./actions/extract');

const uharc = config => {
  if (config.action === 'compress') {
    compress(config);
  }
  
  if (config.action === 'extract') {
    extract(config);
  }
}

module.exports = uharc;