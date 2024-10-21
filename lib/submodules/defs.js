'use strict'
class _0x5f065b {
  constructor({ state: _0x2fe31e, mod: _0x4bf18c }) {
    this['_mod'] = _0x4bf18c
    this['_state'] = _0x2fe31e
  }
  ['getVersion'](_0x3ecfec) {
    let _0x1bd176 =
      this['_state'].defsVersions[_0x3ecfec][this['_mod'].majorPatchVersion]
    return _0x1bd176
      ? [_0x3ecfec, _0x1bd176]
      : [_0x3ecfec, this['_state'].defsVersions[_0x3ecfec]['*']]
  }
  ['getDefsInfo']() {
    let _0x70eb6b = []
    Object.keys(this['_state'].defsVersions).forEach((_0x44ce23) => {
      _0x70eb6b.push([_0x44ce23, this.getVersion(_0x44ce23)])
    })
    return _0x70eb6b
  }
}
module.exports = _0x5f065b
