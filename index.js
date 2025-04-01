'use strict'
const { existsSync: existsSync, readdirSync: readdirSync } = require('fs'),
  path = require('path'),
  compare_versions = require('compare-versions')
const deepmerge = require('deepmerge'),
  utils = require('./lib/utils'),
  settingsSchema = require('./data/internal/settingsSchema'),
  internalSettingsDataJsonFilePath = utils.getFullPath(
    __dirname,
    './data/internal/settingsData.json'
  ),
  settingsJsonFilePath = utils.getFullPath(__dirname, './settings/settings.json'),
  optionalLibFilePath = utils.getFullPath(__dirname, './lib/optional')
let requiredMods = [
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
const messages = {
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
  errors_1 = {
    err0: 'Core start cancelled! Fix issues and restart runtime!',
    err2: "Runtime so old, can't use it. Bye!",
    err3: 'Runtime without majorPatchVersion support. Bye!',
    err5: 'Current patch version not supported. Bye!',
    err7: 'NodeJs version so old. Bye!',
  },
  controlModInfo = ['control', require('./lib/submodules/control.js')]
class networkMod {
  constructor(mod) {
    try {
      if (mod.game.isIngame) {
        throw messages.hotReload
      }
    } catch (ex) {}
    const _mods1 = {
      utils: utils,
      mod: mod,
      configCheck: settingsSchema,
    }
    let _0x2e0f97 = 0,
      _0x450a66 = false,
      migrations = utils.loadJson(internalSettingsDataJsonFilePath).migration,
      _0x471b8b = true,
      defaultInternalSetting = utils.loadJson(internalSettingsDataJsonFilePath).default,
      settings = utils.loadJson(settingsJsonFilePath)
    ;(!settings || (settings && Object.keys(settings).length === 0)) &&
      (mod.log(messages.noSettings),
      (settings = deepmerge({}, defaultInternalSetting)),
      (_0x450a66 = true))
    const versions = Object.keys(migrations).filter((obj) =>
      compare_versions.compare(obj, settings.version, '>')
    )
    if (versions.length > 0) {
      _0x450a66 = true
      versions.sort(compare_versions)
      mod.log(
        'Post-update job started. Amount of steps: ' + versions.length
      )
      let _0x2cc808 = settings
      for (let _0x55c03c of versions) {
        let _0x2cfc81 = null
        migrations[_0x55c03c].configAdd &&
          (_0x2cfc81 = utils.compareFieldsInObjects(
            settings,
            migrations[_0x55c03c].configAdd
          ))
        _0x2cfc81 !== null && (_0x2cc808 = Object.assign(settings, _0x2cfc81))
        if (migrations[_0x55c03c].configRemove) {
          for (let _0x1caba1 of migrations[_0x55c03c].configRemove) {
            _0x2cc808[_0x1caba1] && delete _0x2cc808[_0x1caba1]
          }
        }
        if (migrations[_0x55c03c].removeFile) {
          let _0x5bab19 = migrations[_0x55c03c].removeFile
          _0x5bab19.forEach((_0x211430) =>
            utils.removeByPath(utils.getFullPath(__dirname, _0x211430))
          )
        }
        _0x2cc808.version = _0x55c03c
        settings = _0x2cc808
      }
      mod.log(messages.updateFinish)
    }
    let _0x90c11f = settingsSchema.check(settings),
      _0x235dd7 = false
    Object.keys(_0x90c11f).forEach((_0x4b3636) => {
      let _0x394ea3 = _0x90c11f[_0x4b3636]
      _0x394ea3.hasError &&
        ((settings[_0x4b3636] = defaultInternalSetting[_0x4b3636]),
        (_0x450a66 = true),
        (_0x235dd7 = true))
    })
    _0x235dd7 && mod.log(messages.validationStructureError)
    _0x450a66 && utils.saveJson(utils.sortObject(settings), settingsJsonFilePath)
    let _0x4d0a29 = utils.getFullPath(__dirname, './module.json')
    !existsSync(_0x4d0a29) && ((_0x2e0f97 = 6), (_0x471b8b = false))
    let _0x254186 = process.version.replace('v', '')
    compare_versions.compare(_0x254186, '12.3.1', '<') && (_0x2e0f97 = 7)
    if (mod.isProxyCompat) {
      mod.log(messages.compat1)
      mod.log(messages.compat2)
    }
    if (!require('tera-data-parser').types) {
      _0x2e0f97 = 2
    }
    if (!mod.majorPatchVersion) {
      _0x2e0f97 = 3
    }
    let _0x385829 = utils.loadJson(_0x4d0a29)
    !_0x471b8b && ((_0x471b8b = false), (_0x2e0f97 = 7))
    if (!Array.isArray(_0x385829.servers)) {
      _0x2e0f97 = 3
      _0x471b8b = false
    }
    0 == _0x385829.servers.length && ((_0x2e0f97 = 2), (_0x471b8b = false))
    !existsSync(
      utils.getFullPath(
        __dirname,
        './data/emu/' + mod.majorPatchVersion
      )
    ) && (_0x2e0f97 = 5)
    mod.majorPatchVersion > 101 && (_0x2e0f97 = 5)
    if (0 != _0x2e0f97) {
      mod.error(errors_1.err0)
      switch (_0x2e0f97) {
        case 2:
          mod.error(errors_1.err2)
          break
        case 3:
          mod.error(errors_1.err3)
          break
        case 5:
          mod.error(errors_1.err5)
          break
        case 7:
          mod.error(errors_1.err7)
          break
      }
      return
    }
    _mods1.client = _0x471b8b
    requiredMods.forEach((_0x1159f8) => {
      _mods1[_0x1159f8[0]] = new _0x1159f8[1](_mods1)
    })
    existsSync(optionalLibFilePath) &&
      readdirSync(optionalLibFilePath).forEach((_0x57a6f2) => {
        if (_0x57a6f2.indexOf('.js') !== -1 && _0x57a6f2.startsWith('plugin')) {
          try {
            let _0xa16b12 = require(path.join(optionalLibFilePath, _0x57a6f2))
            _mods1[_0x57a6f2.toLowerCase().replace('.js', '')] =
              new _0xa16b12(_mods1)
          } catch (_0x4ab77c) {}
        }
      })
    _mods1[controlModInfo[0]] = new controlModInfo[1](_mods1)
    _mods1.state.LoadData(mod)
    this.destructor = () => {
      Object.keys(_mods1)
        .filter(
          (mod) =>
            !['mod', 'utils', 'state', 'configCheck'].includes(mod)
        )
        .forEach((mod) => {
          if (typeof _mods1[mod].destructor === 'function') {
            _mods1[mod].destructor()
          }
        })
      _mods1.state.destructor()
    }
  }
}
exports.NetworkMod = networkMod
