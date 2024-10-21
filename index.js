'use strict'
const { existsSync: _0x34065f, readdirSync: _0x544ede } = require('fs'),
  _0xf609c8 = require('path'),
  _0x130614 = require('compare-versions')
const _0x38c30b = require('deepmerge'),
  _0x4c3170 = require('./lib/utils'),
  _0xb1c247 = require('./data/internal/settingsSchema'),
  _0x53fff3 = _0x4c3170.getFullPath(
    __dirname,
    './data/internal/settingsData.json'
  ),
  _0x3b6dab = _0x4c3170.getFullPath(__dirname, './settings/settings.json'),
  _0x3cd60e = _0x4c3170.getFullPath(__dirname, './lib/optional')
let _0x209df8 = [
  ['state', require('./lib/state.js')],
  ['log', require('./lib/io/logger.js')],
  ['defs', require('./lib/submodules/defs')],
  ['ping', require('./lib/submodules/ping.js')],
  ['me', require('./lib/submodules/player.js')],
  ['jitter', require('./lib/submodules/jitter.js')],
  ['area', require('./lib/submodules/area.js')],
  ['cd', require('./lib/submodules/cd.js')],
  ['abn', require('./lib/submodules/abnormals.js')],
  ['alarms', require('./lib/submodules/notifications.js')],
  ['fixes', require('./lib/submodules/fixes.js')],
  ['projectiles', require('./lib/submodules/projectiles.js')],
  ['nap', require('./lib/submodules/nap.js')],
  ['core', require('./lib/core.js')],
]
const _0x5e433b = {
    hotReload: 'Hot reaload is not supported.',
    noSettings:
      'Settings file not found. Generating new one with default values',
    updateFinish: 'Post-update job successfully finished.',
    validationStructureError:
      'Settings structure is wrong, correction applied.',
    compat1: 'Non Tera Toolbox runtime was detected.',
    compat2:
      'Some features can be missed or will be not able to work as intended.',
  },
  _0x552767 = {
    err0: 'Core start cancelled! Fix issues and restart runtime!',
    err2: "Runtime so old, can't use it. Bye!",
    err3: 'Runtime without majorPatchVersion support. Bye!',
    err5: 'Current patch version not supported. Bye!',
    err7: 'NodeJs version so old. Bye!',
  },
  _0x5018b9 = ['control', require('./lib/submodules/control.js')]
class _0x179db2 {
  constructor(_0x409e97) {
    try {
      if (_0x409e97.game.isIngame) {
        throw _0x5e433b.hotReload
      }
    } catch (_0x2ee473) {}
    const _0x2f90b2 = {
      utils: _0x4c3170,
      mod: _0x409e97,
      configCheck: _0xb1c247,
    }
    let _0x2e0f97 = 0,
      _0x450a66 = false,
      _0x5814a7 = _0x4c3170.loadJson(_0x53fff3).migration,
      _0x471b8b = true,
      _0x33e4e2 = _0x4c3170.loadJson(_0x53fff3).default,
      _0x6bcf3 = _0x4c3170.loadJson(_0x3b6dab)
    ;(!_0x6bcf3 || (_0x6bcf3 && Object.keys(_0x6bcf3).length === 0)) &&
      (_0x409e97.log(_0x5e433b.noSettings),
      (_0x6bcf3 = _0x38c30b({}, _0x33e4e2)),
      (_0x450a66 = true))
    const _0x4dc073 = Object.keys(_0x5814a7).filter((_0x34dd5e) =>
      _0x130614.compare(_0x34dd5e, _0x6bcf3.version, '>')
    )
    if (_0x4dc073.length > 0) {
      _0x450a66 = true
      _0x4dc073.sort(_0x130614)
      _0x409e97.log(
        'Post-update job started. Amount of steps: ' + _0x4dc073.length
      )
      let _0x2cc808 = _0x6bcf3
      for (let _0x55c03c of _0x4dc073) {
        let _0x2cfc81 = null
        _0x5814a7[_0x55c03c].configAdd &&
          (_0x2cfc81 = _0x4c3170.compareFieldsInObjects(
            _0x6bcf3,
            _0x5814a7[_0x55c03c].configAdd
          ))
        _0x2cfc81 !== null && (_0x2cc808 = Object.assign(_0x6bcf3, _0x2cfc81))
        if (_0x5814a7[_0x55c03c].configRemove) {
          for (let _0x1caba1 of _0x5814a7[_0x55c03c].configRemove) {
            _0x2cc808[_0x1caba1] && delete _0x2cc808[_0x1caba1]
          }
        }
        if (_0x5814a7[_0x55c03c].removeFile) {
          let _0x5bab19 = _0x5814a7[_0x55c03c].removeFile
          _0x5bab19.forEach((_0x211430) =>
            _0x4c3170.removeByPath(_0x4c3170.getFullPath(__dirname, _0x211430))
          )
        }
        _0x2cc808.version = _0x55c03c
        _0x6bcf3 = _0x2cc808
      }
      _0x409e97.log(_0x5e433b.updateFinish)
    }
    let _0x90c11f = _0xb1c247.check(_0x6bcf3),
      _0x235dd7 = false
    Object.keys(_0x90c11f).forEach((_0x4b3636) => {
      let _0x394ea3 = _0x90c11f[_0x4b3636]
      _0x394ea3.hasError &&
        ((_0x6bcf3[_0x4b3636] = _0x33e4e2[_0x4b3636]),
        (_0x450a66 = true),
        (_0x235dd7 = true))
    })
    _0x235dd7 && _0x409e97.log(_0x5e433b.validationStructureError)
    _0x450a66 && _0x4c3170.saveJson(_0x4c3170.sortObject(_0x6bcf3), _0x3b6dab)
    let _0x4d0a29 = _0x4c3170.getFullPath(__dirname, './module.json')
    !_0x34065f(_0x4d0a29) && ((_0x2e0f97 = 6), (_0x471b8b = false))
    let _0x254186 = process.version.replace('v', '')
    _0x130614.compare(_0x254186, '12.3.1', '<') && (_0x2e0f97 = 7)
    if (_0x409e97.isProxyCompat) {
      _0x409e97.log(_0x5e433b.compat1)
      _0x409e97.log(_0x5e433b.compat2)
    }
    if (!require('tera-data-parser').types) {
      _0x2e0f97 = 2
    }
    if (!_0x409e97.majorPatchVersion) {
      _0x2e0f97 = 3
    }
    let _0x385829 = _0x4c3170.loadJson(_0x4d0a29)
    !_0x471b8b && ((_0x471b8b = false), (_0x2e0f97 = 7))
    if (!Array.isArray(_0x385829.servers)) {
      _0x2e0f97 = 3
      _0x471b8b = false
    }
    0 == _0x385829.servers.length && ((_0x2e0f97 = 2), (_0x471b8b = false))
    !_0x34065f(
      _0x4c3170.getFullPath(
        __dirname,
        './data/emu/' + _0x409e97.majorPatchVersion
      )
    ) && (_0x2e0f97 = 5)
    _0x409e97.majorPatchVersion > 101 && (_0x2e0f97 = 5)
    if (0 != _0x2e0f97) {
      _0x409e97.error(_0x552767.err0)
      switch (_0x2e0f97) {
        case 2:
          _0x409e97.error(_0x552767.err2)
          break
        case 3:
          _0x409e97.error(_0x552767.err3)
          break
        case 5:
          _0x409e97.error(_0x552767.err5)
          break
        case 7:
          _0x409e97.error(_0x552767.err7)
          break
      }
      return
    }
    _0x2f90b2.client = _0x471b8b
    _0x209df8.forEach((_0x1159f8) => {
      _0x2f90b2[_0x1159f8[0]] = new _0x1159f8[1](_0x2f90b2)
    })
    _0x34065f(_0x3cd60e) &&
      _0x544ede(_0x3cd60e).forEach((_0x57a6f2) => {
        if (_0x57a6f2.indexOf('.js') !== -1 && _0x57a6f2.startsWith('plugin')) {
          try {
            let _0xa16b12 = require(_0xf609c8.join(_0x3cd60e, _0x57a6f2))
            _0x2f90b2[_0x57a6f2.toLowerCase().replace('.js', '')] =
              new _0xa16b12(_0x2f90b2)
          } catch (_0x4ab77c) {}
        }
      })
    _0x2f90b2[_0x5018b9[0]] = new _0x5018b9[1](_0x2f90b2)
    _0x2f90b2.state.LoadData(_0x409e97)
    this.destructor = () => {
      Object.keys(_0x2f90b2)
        .filter(
          (_0x1613a7) =>
            !['mod', 'utils', 'state', 'configCheck'].includes(_0x1613a7)
        )
        .forEach((_0x33734f) => {
          if (typeof _0x2f90b2[_0x33734f].destructor === 'function') {
            _0x2f90b2[_0x33734f].destructor()
          }
        })
      _0x2f90b2.state.destructor()
    }
  }
}
exports.NetworkMod = _0x179db2
