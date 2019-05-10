const compress = require('./actions/compress');
const extract = require('./actions/extract');
const chalk = require('chalk');

const uharc = config => {
  if (config.action === 'compress') {
    return compress(config);
  }
  
  if (config.action === 'extract') {
    return extract(config);
  }

  throw new Error(chalk.red('node-uharc: Invalid action'));
}

module.exports = uharc;