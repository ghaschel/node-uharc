const nodeUharc = require('./uharc.js');

// nodeUharc({
//   action: 'compress',
//   files: './*', // files or folder to compress (wildcards are supported)
//   output: 'opt.uha', // output file
//   compressionMode: 'LZP', // LZP or ALZ or PPM
//   headerEncryption: true, // archive header encryption
//   recursive: true, //should include subfolders
//   clearFileArchiceAttr: true, // clear file archive attr
//   multimediaCompression: true  // enable multimedia detection and compression
// })

nodeUharc({
  action: 'extract',
  files: './opt.uha', // files or folder to compress (wildcards are supported)
  output: 'bin', // output folder  
})

//folder
//. = current folder
//.. not working 
