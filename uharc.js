const { spawn } = require('child_process');
const { execSync } = require('child_process');
const glob = require('glob');
const chalk = require('chalk');
const path = require('path');

const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';
const defaultOutput = 'output.uha';
const uharcPath = './bin/uharc.exe'

const uharc = config => (
    new Promise((resolve, reject) => {
        if (!isCompressionModeValid(config)) throw('ERROR: Invalid compression mode ' + config.compressionMode);
        if (!fileExists(config.files)) throw('ERROR: File not found ' + config.files);

        if (
            typeof(config.output) !== 'undefined' &&
            path.dirname(config.output) !== ''
        ) {
            if (path.dirname(config.output) === '.') config.output += '/' + defaultOutput;
            if (!fileExists(path.dirname(config.output))) throw('ERROR: Target directory not found ' + config.output);
        }

        let stdErr = [];
        let stdOut = [];
        let cfg = getCfg(config);

        const child = spawn(getWineCommand(), getArgs(cfg), getStdIo());

        child.stdout.on('data', (data) => {
            stdOut.push(data.toString('utf8'));
        });

        child.stderr.on('data', (data) => {
            stdErr.push(data.toString('utf8'));
        });

        child.on('close', (e) => {
            // we have to test if e !== 0 because
            // even so the child process finished just fine
            // FIXME errors outputed by wine are added
            // to stdErr and will end up creating a false positive
            if (e !== 0 && stdErr && stdErr.length) {
                reject(stdErr.join(''));
                return;
            }
            
            resolve('Compression finished');
        });
    }).catch((error) => {
        console.error(chalk.red(error));
    }).then((success, error) => {
        if (success) console.info(chalk.green(success));
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
    if (!isWin) {
        // @TODO: Test if it still works for ubuntu.
        // I know it's ugly to leave stdin as inherit,
        // but it's this or a lot of unwanted output.
        // It just hangs if handled the proper way.
        // Probably some wine limitation.
        return { stdio: ['inherit', 'pipe', 'pipe'] };
    } else {
        return { stdio: ['ignore', 'pipe', 'pipe'] };
    }
}

function getWineCommand() {
    switch (true) {
        case isWin: {
            return uharcPath;
        }

        case isLinux: {
            // @TODO check the viability and performance gain of adding a sqlite to back this up
            return execSync('command -v wine').toString('utf8').replace('\n', '');
        }

        case isOsx: {
            // @TODO check the viability and performance gain of adding a sqlite to back this up
            return execSync('brew --prefix wine').toString('utf8').replace('\n', '') + '/bin/wine';
        }

        default: {
            break;
        }
    }
}

function getCompressionMode(mode) {
    switch (mode) {
        case 'ALZ': {
            return '-m3';
        }

        case 'PPM': {
            return '-mx';
        }

        case 'LZP': {
            return '-mz'
        }

        default: {
            break;
        }
    }
}

function fileExists(files) {
    let exists = false;
    let path = __dirname + '/' + files;
    
    files = glob.sync(path);

    return files.length > 0;
}

function getCfg(config) {
    return {
        add: 'a',
        verbose: '-d0',
        compression: getCompressionMode(config.compressionMode),
        buffer: '-md32768',
        multimedia: config.multimediaCompression ? '-mm+' : '-mm-',
        headerEncryption: config.headerEncryption ? '-ph+' : '-ph-',
        clearFileArchiceAttr: config.clearFileArchiceAttr ? '-ac+' : '-ac-',
        yes: '-y+',
        recursive: config.recursive ? '-r+' : '-r-',
        output: config.output || 'output.uha',
        files: __dirname + '/' + config.files
    };
}

function isCompressionModeValid(config) {
    let cm = config.compressionMode;

    if (typeof(cm) === 'undefined') return false;
    if (cm !== 'LZP' || cm !== 'PPM' || cm !== 'ALZ') return false;

    return true;
}

module.exports = uharc;