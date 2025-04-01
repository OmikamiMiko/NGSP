'use strict'
class defClass {
  constructor({ state: stateInput, mod: modInput }) {
    this._mod = modInput
    this._state = stateInput
  }
  ['getVersion'](defName) {
    let defVersion =
      this._state.defsVersions[defName][this._mod.majorPatchVersion]
    return defVersion
      ? [defName, defVersion]
      : [defName, this._state.defsVersions[defName]['*']]
  }
  ['getDefsInfo']() {
    let defInfos = []
    Object.keys(this._state.defsVersions).forEach((defVersion) => {
      defInfos.push([defVersion, this.getVersion(defVersion)])
    })
    return defInfos
  }
}
module.exports = defClass
