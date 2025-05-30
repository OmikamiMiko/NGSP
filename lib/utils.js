'use strict'
const fs = require('fs'),
  path = require('path'),
  promises = require('fs').promises,
  util = require('util'),
  zlib = require('zlib'),
  inflateRawPromisified = util.promisify(zlib.inflateRaw),
  _0x25794d = (_0x3f3e00, _0xd977ee, _0x33e077 = false) => {
    let _0x2cb28c = Object.assign([], _0x3f3e00)
    _0x2cb28c = _0x33e077
      ? _0x2cb28c
      : _0x2cb28c.sort((_0x137483, _0x2beb39) => _0x137483 - _0x2beb39)
    if (_0xd977ee === 0) {
      return _0x2cb28c[0]
    } else {
      if (_0xd977ee === 1) {
        return _0x2cb28c[_0x2cb28c.length - 1]
      } else {
        let _0x190efe = _0x2cb28c.length * _0xd977ee
        return _0x190efe % 1
          ? _0x2cb28c[Math.floor(_0x190efe)]
          : _0x2cb28c.length % 2
          ? _0x2cb28c[_0x190efe]
          : (_0x2cb28c[_0x190efe - 1] + _0x2cb28c[_0x190efe]) / 2
      }
    }
  },
  _0x38f65d = (_0x2a38c8) =>
    _0x2a38c8.reduce(
      (_0x5ad486, _0xc9e1af) =>
        _0x5ad486.concat(
          Array.isArray(_0xc9e1af) ? _0x38f65d(_0xc9e1af) : _0xc9e1af
        ),
      []
    )
exports.getFlatArray = _0x38f65d
exports.getStatsFromArray = (
  _0x3b3aa8,
  _0xaed78a = 0.1,
  _0x57f6d6 = 0.5,
  _0x485deb = 0.9
) => ({
  minValue: _0x25794d(_0x3b3aa8, _0xaed78a),
  avgValue: _0x25794d(_0x3b3aa8, _0x57f6d6),
  maxValue: _0x25794d(_0x3b3aa8, _0x485deb),
})
exports.getMapFromArray = (_0x2c8440) => {
  let _0x42f0c0 = { _0x505701: true }
  _0x2c8440.forEach((_0x505701) => {})
  return _0x42f0c0
}
const _0x5954d8 = (_0x17ded2, _0x165769, _0x3264a3, _0x428a5) => {
  null != _0x17ded2 &&
    _0x17ded2 &&
    Object.prototype.hasOwnProperty.call(_0x17ded2, _0x165769) &&
    _0x428a5.push(_0x3264a3(_0x17ded2[_0x165769]))
  const _0x54c28b = Object.keys(_0x17ded2)
  for (let _0x312919 = 0; _0x312919 < _0x54c28b.length; _0x312919++) {
    'object' === typeof _0x17ded2[_0x54c28b[_0x312919]] &&
      _0x5954d8(_0x17ded2[_0x54c28b[_0x312919]], _0x165769, _0x3264a3, _0x428a5)
  }
}
exports.deepSearch = _0x5954d8
exports.arraysIntersect = (_0x411be7, _0x258e2a) => {
  let _0x20fa31 = []
  for (const _0x2a1cea of _0x411be7) {
    _0x258e2a.indexOf(_0x2a1cea) != -1 && _0x20fa31.push(_0x2a1cea)
  }
  return _0x20fa31
}
exports.isExist = (_0xfd99af) => fs.existsSync(_0xfd99af)
exports.arraysHasIntersect = (_0x5b1ddc, _0x36250f) => {
  let _0x5ab7c2 = Array.isArray(_0x5b1ddc) ? _0x5b1ddc : [_0x5b1ddc]
  for (const _0x7825af of _0x5ab7c2) {
    if (_0x36250f.indexOf(_0x7825af) != -1) {
      return true
    }
  }
  return false
}
exports.getSafe = (dictionary, filterProperties, lastParam = void 0) => {
  if (void 0 === dictionary || 0 === filterProperties.length) {
    return lastParam
  }
  let dictionaryClone = dictionary
  for (const filterProperty of filterProperties) {
    dictionaryClone = dictionaryClone[filterProperty]
    if (null == dictionaryClone) {
      return lastParam
    }
  }
  return dictionaryClone
}
exports.getQuantile = _0x25794d
exports.splitString = (str) => str.trim().toLowerCase().split(' ')
exports.loadJson = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (ex) {
    return null
  }
}
exports.requireUncached = (rq) => {
  delete require.cache[require.resolve(rq)]
  try {
    return require(rq)
  } catch (ex) {
    return false
  }
}
exports.safeRequire = (rq) => {
  try {
    return require(rq)
  } catch (ex) {
    return false
  }
}
exports.loadJsonAsync = async (filePath) => {
  let content = null
  try {
    content = await promises.readFile(filePath, 'utf8')
  } catch (_0x36de33) {}
  return content && (content = JSON.parse(content)), content
}
exports.getJsonWithUnpack = async (path) => {
  let content = null
  try {
    content = await inflateRawPromisified(path)
    content = content.toString()
  } catch (ex) {}
  return content && (content = JSON.parse(content)), content
}
exports.loadBufferAsync = async (filePath) => {
  let fileContent = null
  try {
    fileContent = await promises.readFile(filePath)
  } catch (_0x3b0098) {}
  return fileContent
}
exports.getFullPath = (_0x209757, _0xefa3ab) =>
  path.resolve(_0x209757, _0xefa3ab)
exports.saveJson = (_0x5e7c71, _0x394d18, _0xc567d0 = false) => {
  try {
    !_0xc567d0
      ? fs.writeFileSync(
          _0x394d18,
          JSON.stringify(_0x5e7c71, null, '\t')
        )
      : fs.writeFileSync(_0x394d18, JSON.stringify(_0x5e7c71))
  } catch (_0x36561c) {
    return false
  }
}
exports.compareFieldInObjects = (_0x11db73, _0x16000d, _0x5f3eb3) =>
  _0x11db73[_0x5f3eb3] === _0x16000d[_0x5f3eb3]
exports.sortObject = (_0x19c36f) => {
  return Object.keys(_0x19c36f)
    .sort()
    .reduce((_0x142a74, _0x1b07f5) => {
      return (_0x142a74[_0x1b07f5] = _0x19c36f[_0x1b07f5]), _0x142a74
    }, {})
}
exports.compareFieldsInObjects = (_0x162cc8, _0x1ed9d0) => {
  let _0x4b8695 = {}
  for (let [_0x41d825, _0x9545ce] of Object.entries(_0x1ed9d0)) {
    ;(!_0x162cc8[_0x41d825] || _0x162cc8[_0x41d825] !== _0x9545ce) &&
      (_0x4b8695[_0x41d825] = _0x9545ce)
  }
  return Object.keys(_0x4b8695).length > 0 ? _0x4b8695 : null
}
exports.removeFileSync = (filePath) => {
  fs.unlinkSync(filePath)
}
exports.removeByPath = (path) => {
  try {
    if (fs.lstatSync(path).isDirectory()) {
      for (let _0x568e71 of fs.readdirSync(path)) {
        fs.unlinkSync(_0x568e71)
      }
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  } catch (_0x44370e) {
    return null
  }
}
exports.degrees = (radians) =>
  Math.round(57.29578000000038 * radians) + '\xB0'
exports.decimal = (_0x1d6b97, _0x27b312) => _0x1d6b97.toFixed(_0x27b312)
exports.getSkillBase = (skillId) => Math.floor(skillId / 10000)
exports.getSkillLevel = (skillID) => (Math.floor(skillID / 100) % 100) - 1
exports.getSkillSub = (SkillID) => SkillID % 100
exports.getRaceFromTemplateId = (templateID) =>
  Math.floor((templateID - 10101) / 100)
exports.getJobFromTemplateId = (templateID) => (templateID - 10101) % 100
exports.convertToTypeOf = (type, value) => {
  let _undefined = undefined
  switch (type) {
    case 'string':
      return String(value)
    case 'number':
      _undefined = Number(value)
      if (Number.isNaN(_undefined)) {
        return
      } else {
        return _undefined
      }
    case 'boolean':
      return 'true' == value
    default:
      return
  }
}
class ngspError extends Error {
  constructor(_0x4a9250) {
    super(_0x4a9250)
    this.name = this.constructor.name
    Error.stackTraceLimit = -1
    Error.captureStackTrace(this, this.constructor)
  }
}
exports.NGSPError = ngspError
