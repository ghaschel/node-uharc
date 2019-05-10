const { spawnSync } = require('child_process');
const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';

const postinstall = () => {
    if (isLinux) {
        console.info('Running linux post install script');  
        spawnSync(__dirname + '/linux-install.sh', [], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'inherit',
            encoding: 'utf-8'
        });
    } else if (isOsx) {
        console.info('Running osx post install script');
        spawnSync(__dirname + '/mac-install.sh', [], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'inherit',
            encoding: 'utf-8'
        });
    }
}

postinstall();

module.exports = postinstall