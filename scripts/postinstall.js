const { spawnSync } = require('child_process');
const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';

const postinstall = () => {
    if (isLinux) {
        console.info('Running linux post install script');
        spawnSync('./linux-install.sh', [], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'inherit',
            encoding: 'utf-8'
        });
    } else if (isOsx) {
        console.info('Running osx post install script');
        let install = spawn(__dirname + '/mac-install.sh');

        install.stdout.on('data', function (data) {
            console.info(data.toString('utf8'));
        });

        install.stderr.on('data', function (data) {
            console.info(data.toString('utf8'));
        });

        install.on('exit', function (code) {
            console.info('node-uharc install finished');
        });
    }
}

postinstall();

module.exports = postinstall