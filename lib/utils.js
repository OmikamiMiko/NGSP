'use strict'
const _0x4ab8d3 = require('fs'),
  _0x394726 = require('path'),
  _0x263ff3 = require('fs').promises,
  _0x296695 = require('util'),
  _0x5abe6d = require('zlib'),
  _0x26c491 = _0x296695.promisify(_0x5abe6d.inflateRaw),
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
exports.isExist = (_0xfd99af) => _0x4ab8d3.existsSync(_0xfd99af)
exports.arraysHasIntersect = (_0x5b1ddc, _0x36250f) => {
  let _0x5ab7c2 = Array.isArray(_0x5b1ddc) ? _0x5b1ddc : [_0x5b1ddc]
  for (const _0x7825af of _0x5ab7c2) {
    if (_0x36250f.indexOf(_0x7825af) != -1) {
      return true
    }
  }
  return false
}
exports.getSafe = (_0x9c1b4b, _0x53a66b, _0x3e46d2 = void 0) => {
  if (void 0 === _0x9c1b4b || 0 === _0x53a66b.length) {
    return _0x3e46d2
  }
  let _0x3bde49 = _0x9c1b4b
  for (const _0x1652e9 of _0x53a66b) {
    _0x3bde49 = _0x3bde49[_0x1652e9]
    if (null == _0x3bde49) {
      return _0x3e46d2
    }
  }
  return _0x3bde49
}
exports.getQuantile = _0x25794d
exports.splitString = (_0x5a937a) => _0x5a937a.trim().toLowerCase().split(' ')
exports.loadJson = (_0x1d88da) => {
  try {
    return JSON.parse(_0x4ab8d3.readFileSync(_0x1d88da, 'utf8'))
  } catch (_0xbb2d86) {
    return null
  }
}
exports.requireUncached = (_0x4dc7b0) => {
  delete require.cache[require.resolve(_0x4dc7b0)]
  try {
    return require(_0x4dc7b0)
  } catch (_0x38a3c3) {
    return false
  }
}
exports.safeRequire = (_0x2091b3) => {
  try {
    return require(_0x2091b3)
  } catch (_0x19fa89) {
    return false
  }
}
exports.loadJsonAsync = async (_0x361527) => {
  let _0x5cef1e = null
  try {
    _0x5cef1e = await _0x263ff3.readFile(_0x361527, 'utf8')
  } catch (_0x36de33) {}
  return _0x5cef1e && (_0x5cef1e = JSON.parse(_0x5cef1e)), _0x5cef1e
}
exports.getJsonWithUnpack = async (_0x31dd65) => {
  let _0x43573d = null
  try {
    _0x43573d = await _0x26c491(_0x31dd65)
    _0x43573d = _0x43573d.toString()
  } catch (_0x5abce8) {}
  return _0x43573d && (_0x43573d = JSON.parse(_0x43573d)), _0x43573d
}
exports.loadBufferAsync = async (_0x3bdf97) => {
  let _0x21d421 = null
  try {
    _0x21d421 = await _0x263ff3.readFile(_0x3bdf97)
  } catch (_0x3b0098) {}
  return _0x21d421
}
exports.getFullPath = (_0x209757, _0xefa3ab) =>
  _0x394726.resolve(_0x209757, _0xefa3ab)
exports.saveJson = (_0x5e7c71, _0x394d18, _0xc567d0 = false) => {
  try {
    !_0xc567d0
      ? _0x4ab8d3.writeFileSync(
          _0x394d18,
          JSON.stringify(_0x5e7c71, null, '\t')
        )
      : _0x4ab8d3.writeFileSync(_0x394d18, JSON.stringify(_0x5e7c71))
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
exports.removeFileSync = (_0x47536b) => {
  _0x4ab8d3.unlinkSync(_0x47536b)
}
exports.removeByPath = (_0x269044) => {
  try {
    if (_0x4ab8d3.lstatSync(_0x269044).isDirectory()) {
      for (let _0x568e71 of _0x4ab8d3.readdirSync(_0x269044)) {
        _0x4ab8d3.unlinkSync(_0x568e71)
      }
      _0x4ab8d3.rmdirSync(_0x269044)
    } else {
      _0x4ab8d3.unlinkSync(_0x269044)
    }
  } catch (_0x44370e) {
    return null
  }
}
exports.degrees = (_0x906f2a) =>
  Math.round(57.29578000000038 * _0x906f2a) + '\xB0'
exports.decimal = (_0x1d6b97, _0x27b312) => _0x1d6b97.toFixed(_0x27b312)
exports.getSkillBase = (_0x5d870d) => Math.floor(_0x5d870d / 10000)
exports.getSkillLevel = (_0x5171e5) => (Math.floor(_0x5171e5 / 100) % 100) - 1
exports.getSkillSub = (_0x334738) => _0x334738 % 100
exports.getRaceFromTemplateId = (_0x46d015) =>
  Math.floor((_0x46d015 - 10101) / 100)
exports.getJobFromTemplateId = (_0x52d382) => (_0x52d382 - 10101) % 100
exports.convertToTypeOf = (_0x12a824, _0x2d3c37) => {
  let _0x1997f5 = undefined
  switch (_0x12a824) {
    case 'string':
      return String(_0x2d3c37)
    case 'number':
      _0x1997f5 = Number(_0x2d3c37)
      if (Number.isNaN(_0x1997f5)) {
        return
      } else {
        return _0x1997f5
      }
    case 'boolean':
      return 'true' == _0x2d3c37
    default:
      return
  }
}
class _0x4c373a extends Error {
  constructor(_0x4a9250) {
    super(_0x4a9250)
    this.name = this.constructor.name
    Error.stackTraceLimit = -1
    Error.captureStackTrace(this, this.constructor)
  }
}
exports.NGSPError = _0x4c373a
