const { execSync } = require('child_process');
const glob = require('glob');
const isWin = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isOsx = process.platform === 'darwin';
const defaultOutput = 'output.uha';
const uharcPath = `${__dirname}/bin/uharc.exe`

const getUnixPath = path => {
  if (isWin) {
    return path.replace(/\\/g, '/');
  }

  return path;
}

const getArgs = cfg => {
  let arr = [];

  if (!isWin) arr.push(uharcPath);
  for (key in cfg) arr.push(cfg[key]);
  
  return arr;
}

const getStdIo = () => {
  if (!isWin) {
    // TODO: Test if it still works for ubuntu.
    // I know it's ugly to leave stdin as inherit, but it's this or a lot of unwanted output.
    // It just hangs if handled the proper way. Probably some wine limitation.
    return { stdio: ['inherit', 'pipe', 'pipe'] };
  } else {
    return { stdio: ['ignore', 'pipe', 'pipe'] };
  }
}

const getWineCommand = () => {
  switch (true) { 
    case isWin: return uharcPath;
    // TODO check the viability and performance gain of adding a sqlite to back linux and osx up
    case isLinux: return execSync('command -v wine').toString('utf8').replace('\n', '');
    case isOsx: return `${execSync('brew --prefix wine').toString('utf8').replace('\n', '')}/bin/wine` ;
    default: break;
  }
}

const getCompressionMode = mode => {
  switch (mode) {
    case 'ALZ': return '-m3';
    case 'PPM': return '-mx';
    case 'LZP': return '-mz'
    default: break;
  }
}

const fileExists = path => {
  let files = glob.sync(path);

  return files.length > 0;
}

const getCompressCfg = config => {
  //let opt = isWin ? config.output : null;
  let opt = config.output;
  return {
    add: 'a',
    verbose: '-d2',
    compression: getCompressionMode(config.compressionMode),
    buffer: '-md32768',
    multimedia: config.multimediaCompression ? '-mm+' : '-mm-',
    headerEncryption: config.headerEncryption ? '-ph+' : '-ph-',
    clearFileArchiceAttr: config.clearFileArchiceAttr ? '-ac+' : '-ac-',
    yes: '-y+',
    p: '-pr',
    recursive: config.recursive ? '-r+' : '-r-',
    output: opt || defaultOutput,
    files: `.\\${config.files.replace(/\//g, '\\')}`
  };
}

const getExtractCfg = config => {
  return {
    extract: 'x',
    overwrite: '-o-',
    output: `-t${config.output}`,
    memory: '-vm+',
    input: `${config.files}`
  };
}

const isCompressionModeValid = config => {
  let cm = config.compressionMode.toUpperCase();

  if (typeof(cm) === 'undefined') return false;
  
  return (cm === 'LZP' || cm === 'PPM' || cm === 'ALZ');
}

module.exports = { 
  getUnixPath,
  getArgs,
  getStdIo,
  getWineCommand,
  fileExists,
  getCompressCfg,
  getExtractCfg,
  isCompressionModeValid
}