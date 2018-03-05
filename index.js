const nodeUharc = require('./uharc.js');

nodeUharc({
    files: './compression/asdf/*.txt',
    output: 'output.uha',
    compressionMode: 'LZP',
    headerEncryption: true,
    recursive: true,
    clearFileArchiceAttr: true,
    multimediaCompression: true
});