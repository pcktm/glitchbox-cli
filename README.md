glitchbox-cli
=============

A CLI to glitch video files with code

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/glitchbox-cli.svg)](https://npmjs.org/package/glitchbox-cli)
[![Downloads/week](https://img.shields.io/npm/dw/glitchbox-cli.svg)](https://npmjs.org/package/glitchbox-cli)
[![License](https://img.shields.io/npm/l/glitchbox-cli.svg)](https://github.com/pcktm/glitchbox-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
<!-- * [Commands](#commands) -->
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g glitchbox-cli

$ glitchbox .\00011.MTS .\testGlitchingFunction.js out.mp4 --noAudio
> Extract
    √ Load glitching script
    / Convert file to raw MPEG2
      Extract feature from file
    Glitch!
    Clean up

$ glitchbox (-v|--version|version)
glitchbox-cli/1.0.0 win32-x64 node-v12.16.1

$ glitchbox --help
USAGE
  $ glitchbox INPUT SCRIPT OUTPUT

ARGUMENTS
  INPUT   Input file
  SCRIPT  Script that will process the frames
  OUTPUT  Output destination

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version
  --debug,       output some debug info and do not remove the temporary folder
  --noAudio      omit audio extraction
  
...
```
<!-- usagestop -->
