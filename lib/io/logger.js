const _0x2681ca = require('fs'),
  _0x1757de = require('path'),
  _0x285f2c = require('console')
class _0x295678 {
  constructor({ mod: _0x3431fc, state: _0x183832 }) {
    this['_mod'] = _0x3431fc
    this['_stateRef'] = _0x183832
    this['_formatOptions'] = {
      depth: 8,
      colors: false,
      compact: true,
      breakLength: Infinity,
    }
    this.writeDebugToStd = true
    this['_streamRef'] = null
    this.consoleForStream = null
    this['_localeOpts'] = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
  }
  ['writeLogMessage'](...logParams) {
    this['_mod'].log(...logParams)
  }
  ['writeWarningMessage'](...logParams) {
    this['_mod'].log('WARNING!', ...logParams)
  }
  ['writeErrorMessage'](...logParams) {
    this['_mod'].log('ERROR!', ...logParams)
  }
  ['writeDebugMessage'](..._0x5387e0) {
    const _0x45b0a4 =
      '[' + (Date.now() % 100000).toString().padStart(5, '0') + ']'
    !this.consoleForStream && this['_pipeToFile']()
    this.writeDebugToStd && this['_mod'].log(_0x45b0a4, ..._0x5387e0)
    this.consoleForStream.log(_0x45b0a4, ..._0x5387e0)
  }
  ['_pipeToFile']() {
    this['_streamRef'] = _0x2681ca.createWriteStream(
      _0x1757de.join(
        this['_stateRef'].logPath,
        'debug-' +
          new Date()
            .toLocaleDateString('de-DE', this['_localeOpts'])
            .replace(/\./g, '-')
            .replace(',', '')
            .replace(' ', '--')
            .replace(/:/g, '-') +
          '.log'
      )
    )
    const _0xb0996 = {
      stdout: this['_streamRef'],
      stderr: this['_streamRef'],
      inspectOptions: this['_formatOptions'],
    }
    this.consoleForStream = new _0x285f2c.Console(_0xb0996)
  }
  ['endPipeToFile']() {
    if (!this.consoleForStream) {
      return
    }
    this.consoleForStream = null
    this['_streamRef'].end()
    this['_streamRef'].destroy()
  }
  ['destructor']() {
    this.endPipeToFile()
  }
}
module.exports = _0x295678
