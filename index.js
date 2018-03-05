const nodeUharc = require('./uharc.js');

nodeUharc({
    files: 'bin/',
    output: 'scripts/output.uha',
    compressionMode: 'LZP',
    headerEncryption: true,
    recursive: true,
    clearFileArchiceAttr: true,
    multimediaCompression: true
})