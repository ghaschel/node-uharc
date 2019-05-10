# node-uharc

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/node-uharc.svg)](https://badge.fury.io/js/node-uharc)

Node-uharc is a Node.JS wrapper for Uharc. It uses wine for Unix-based system compatibility.

# Installation
```sh
$ npm install node-uharc --save-dev
```
##### Linux
It will ask for sudo to install wine if it's not already installed.

##### OSX

It will ask for sudo to install HomeBrew.
- As default HomeBrew packages will never ask for sudo, but it will ask for Brew itself and to create a default wine folder that will break the installation if not existent (apparently High Sierra related)

# How to use

#### Compress

```
const nodeUharc = require('node-uharc');

nodeUharc({
  action: 'compress',
  files: './*', // files or folder to compress (wildcards are supported)
  output: './bin/opt.uha', // output file
  compressionMode: 'LZP', // LZP or ALZ or PPM
  headerEncryption: true, // archive header encryption
  recursive: true, //should include subfolders
  clearFileArchiceAttr: true, // clear file archive attr
  multimediaCompression: true  // enable multimedia detection and compression
})
```

#### Extract
```
nodeUharc({
  action: 'extract',
  files: './bin/opt.uha', // files or folder to extract (wildcards are supported)
  output: '../tst', // output folder  
})
```

## [Changelog](CHANGELOG.md)

License
----

Node-uhac - MIT
Uharc (Copyright (c) 1997-2005 by Uwe Herklotz) - Free for non-commercial use


### Notice
The only information I could find about Uharc license is that it's Free for non-commercial use.
