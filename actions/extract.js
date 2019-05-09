const { spawn } = require('child_process');
const { execSync } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const isWin = process.platform === 'win32';
const defaultOutput = 'output.uha';
const util = require('../utiilities.js')

const extract = config => {
  new Promise((resolve, reject) => {
    config.output = config.output;
    config.files = config.files;

    if (isWin) {
      config.files = config.files.replace(/\//g, '\\');
    }

    if (!util.fileExists(util.getUnixPath(config.files))) {
      throw(`ERROR: File not found ${config.files}`);
    }

    let stdErr = [];
    let stdOut = [];
    let cfg = util.getExtractCfg(config);

    const child = spawn(util.getWineCommand(), util.getArgs(cfg), util.getStdIo());

    child.stdout.on('data', data => {
      stdOut.push(data.toString('utf8'));
      console.log(data.toString('utf8'));
    });

    child.stderr.on('data', data => stdErr.push(data.toString('utf8')));

    child.on('close', (e) => {
      // we have to test if e !== 0 because even so the child process finished just fine
      // FIXME errors outputed by wine are added to stdErr and will end up creating a false positive
      if (e !== 0 && stdErr && stdErr.length) {
        reject(stdErr.join(''));
        return;
      }

      //TODO FIX THIS
      if (!isWin) {
        // Uharc via wine will consider full unix file path as a switch so we move it to the output folder
        execSync(`mv ${defaultOutput} ${config.output}`);
      }

      resolve('Extract finished');
    });
  })
  .catch(error => console.error(chalk.red(error)))
  .then(success => success && console.info(chalk.green(success)))
}

module.exports = extract