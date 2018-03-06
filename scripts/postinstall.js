const { spawnSync } = require('child_process');

const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';

const postinstall = () => {
    if (isLinux) {
        spawnSync('./linux-install.sh', [], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'inherit',
            encoding: 'utf-8'
        });
    } else if (isOsx) {
        spawnSync('./mac-install.sh', [], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8'
        });
    }
}

postinstall();

module.exports = postinstall