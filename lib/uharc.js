const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';
const uharcPath = __dirname + '/../bin/uharc.exe';

const uharc = config => (
    new Promise((resolve, reject) => {
        let stdErr = [];
        let stdOut = [];
        let cfg = {
            add: 'a',
            verbose: '-d2',
            compression: '-m3',
            buffer: '-md32768',
            multimedia: '-mm+',
            yes: '-y+',
            output: 'u.uha',
            files: __dirname + '/../bin/*.*'
        }

        console.log(cfg);

        const child = spawn(getWineCommand(), getArgs(cfg), getStdIo());

        //@TODO: try to find a way to fix this, we need stdout and stderr
        if (!isLinux) {
            child.stdout.on('data', (data) => {
                stdOut.push(data.toString('utf8'));
            });
    
            child.stderr.on('data', (data) => {
                console.log(data);
                stdErr.push(data.toString('utf8'));
            });    
        }

        

        child.on('close', (e) => {
            if (stdErr && stdErr.length) {
                reject(stdOut.join(''));
                return;
            }

            console.log(e);

            setTimeout(() => {
                resolve(stdOut.join());
            }, 6000);
        });
    })
);

function getArgs(cfg) {
    let arr = [];

    if (!isWin) {
        arr.push(uharcPath);
    }

    for (key in cfg) {
        arr.push(cfg[key]);
    }

    return arr;
}

function getStdIo() {
    if (isOsx) {
        return { stdio: ['ignore', 'pipe', 'pipe'] };
    } else if (isLinux) {
        // @TODO: avaliar os casos de ignore e inherit. caso err em inherit, fix-mes do wine aparecem
        return { stdio: ['ignore', 'inherit', 'ignore'] };
    } else {
        return { stdio: ['ignore', 'inherit', 'inherit'] };
    }
}

function getWineCommand() {
    switch (true) {
        case isWin: {
            return 'uharc.exe';
        }

        case isLinux: {
            return 'wine';
        }

        case isOsx: {
            // @TODO: Get wine path on install
            // or update bash variables on instal
            return '/usr/local/Cellar/wine/3.0/bin/wine';
        }

        default: {
            break;
        }
    }
}

module.exports = uharc;