'use strict'
const utils = require('./utils'),
  { SkillID: SkillID } = require('tera-data-parser').types,
  deepMerge = require('deepmerge'),
  klona = require('klona/lite').klona,
  EventEmitter = require('events').EventEmitter,
  fs = require('fs')
class _0x15f45a extends EventEmitter {
  constructor(_0x2ade99) {
    super()
    this.setMaxListeners(0)
    this._mod = _0x2ade99.mod
    this.configPath = utils.getFullPath(
      __dirname,
      '../settings/settings.json'
    )
    this.customConfigPath = utils.getFullPath(__dirname, '../settings/')
    this.presetPath = utils.getFullPath(__dirname, '../settings/')
    this.logPath = utils.getFullPath(__dirname, '../logs/')
    this.cachePath = utils.getFullPath(__dirname, '../cache/')
    this.pingHelperPath = utils.getFullPath(
      __dirname,
      '../lib/io/NextGenPingTool.exe'
    )
    this.defsVersionsPath = utils.getFullPath(
      __dirname,
      '../data/internal/definitions.js'
    )
    this.configMapPath = utils.getFullPath(__dirname, '../data/internal/')
    this.emuPath = utils.getFullPath(__dirname, '../data/emu')
    this.zCorrectionDiff = 35
    this.XYCorrectionDiff = 85
    this.supportedLanguages = [
      'zh',
      'tr',
      'ru',
      'pl',
      'he',
      'es',
      'en',
      'ar',
      'de',
      'it',
      'ba',
    ]
    this.defsVersions = {}
    this.config = {}
    this.defaultConfig = {}
    this.preset = {}
    this.dcInfo = {}
    this.skills = {}
    this.polishing = {}
    this.sharedSkills = {}
    this.forcefulSkillExclude = {}
    this.blockedAbnormals = {}
    this.items = {}
    this.doNotModify = {}
    this.cc = {}
    this.zCorrectionBonus = 3
    this.distanceCorrectionBonus = 0
    this.ccKeys = []
    this.slows = {}
    this.slowsKeys = []
    this.passives = {}
    this.napCache = {}
    this.passivesKeys = []
    this.buffs = {}
    this.buffKeys = []
    this.talents = {}
    this.movement = {}
    this.qol = {}
    this.baseData = {}
    this.notifies = {}
    this.quantileOne = 0.08
    this.ccPushDurations = [
      436, 444, 400, 468, 432, 404, 184, 424, 460, 444, 440,
    ]
    this.classDisabled = false
    this.disabledByZone = false
    this.skillsCache = new Map()
    this.itemsCache = new Map()
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true })
    }
    !fs.existsSync(this.cachePath) &&
      fs.mkdirSync(this.cachePath, { recursive: true })
    this.LoadStaticData()
  }
  ['SwitchEnableStateWithEvent']() {
    this.config.enabled = !this.config.enabled
    this.emit('stateChanged', this.config.enabled)
  }
  ['LoadStaticData']() {
    this.config = utils.loadJson(this.configPath)
    this.config.pingMethod = this.config.pingMethod.toLowerCase()
    ;['external', 'hybrid'].includes(this.config.pingMethod) &&
      global.TeraProxy &&
      !global.TeraProxy.IsAdmin &&
      ((this.config.pingMethod = 'internal'),
      this._mod.log(
        'Started without administrator rights. Fallback to ingame ping check only.'
      ))
    this.config.customCommandPrefix = this.config.customCommandPrefix
      .toString()
      .toLowerCase()
      .replace(/[^\da-z]+/g, '')
    'static' == this.config.pingMethod &&
      this.config.defaultPingValue <= 0 &&
      ((this.config.pingMethod = 'internal'),
      this._mod.log(
        'Static ping method configured incorrectly. Fallback to ingame ping check only.'
      ))
    this.loadFinish = true
    this.defsVersions = utils.requireUncached(this.defsVersionsPath)
    this.presetFixes = utils.requireUncached(
      this.presetPath + '/combat.json'
    )
    let _0x3073d7 = utils.loadJson(this.configMapPath + '/strings.json')
    this.translation = {}
    this.supportedLanguages.forEach((_0x395fcc) => {
      this.translation[_0x395fcc] = _0x3073d7[_0x395fcc]
    })
  }
  ['ReloadConfig'](_0x512421 = null) {
    if (!_0x512421) {
      return (this.config = utils.loadJson(this.configPath)), true
    } else {
      let _0x59f55d = this.customConfigPath + '/' + _0x512421 + '.json'
      if (!utils.isExist(_0x59f55d)) {
        return false
      }
      this.config = utils.loadJson(_0x59f55d)
    }
  }
  async ['LoadData'](_0x4b4080) {
    this._cacheFileName = _0x4b4080.majorPatchVersion + '-napCacheData.json'
    let _0x5033df = await utils.loadJsonAsync(
      '' + this.cachePath + this._cacheFileName
    )
    _0x5033df && (this.napCache = _0x5033df)
    this.preset = utils.requireUncached(
      this.presetPath + '/emulation-tera.js'
    )
    this.presetTba = utils.requireUncached(
      this.presetPath + '/emulation-tba.js'
    )
    let [
        _0x2714c1,
        _0x1b1681,
        _0x25f266,
        _0x1b26f5,
        _0x2f6a49,
        _0x5046a0,
        skillOverridePromise,
        _0x4c2941,
        _0x566e65,
        _0x2879e2,
        _0x1ae3b7,
        _0xc91939,
        _0x1dd3a8,
      ] = await Promise.all([
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/effects.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/effects-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/skills.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/movements.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/items.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/denylistData.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/skills-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/baseData.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/items-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/battleNotifications.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/movements-tba.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + _0x4b4080.majorPatchVersion + '/skills-tba.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            _0x4b4080.majorPatchVersion +
            '/skills-override-tba.res'
        ),
      ]),
      [
        _0x2bf8b1,
        _0x43a9a4,
        _0x262d61,
        _0x49de12,
        _0x2c813e,
        _0x2a648e,
        skillOverrides,
        _rrrrrrrr,
        _0x2b8305,
        _0x93d2c0,
        _0x12dc6c,
        _0x4fb1b2,
        _0xc3a760,
      ] = await Promise.all([
        utils.getJsonWithUnpack(_0x2714c1),
        utils.getJsonWithUnpack(_0x1b1681),
        utils.getJsonWithUnpack(_0x25f266),
        utils.getJsonWithUnpack(_0x1b26f5),
        utils.getJsonWithUnpack(_0x2f6a49),
        utils.getJsonWithUnpack(_0x5046a0),
        utils.getJsonWithUnpack(skillOverridePromise),
        utils.getJsonWithUnpack(_0x4c2941),
        utils.getJsonWithUnpack(_0x566e65),
        utils.getJsonWithUnpack(_0x2879e2),
        utils.getJsonWithUnpack(_0x1ae3b7),
        utils.getJsonWithUnpack(_0xc91939),
        utils.getJsonWithUnpack(_0x1dd3a8),
      ])
    _0x2714c1 = null
    _0x1b1681 = null
    _0x25f266 = null
    _0x1b26f5 = null
    _0x2f6a49 = null
    _0x5046a0 = null
    skillOverridePromise = null
    _0x4c2941 = null
    _0x2879e2 = null
    _0xc91939 = null
    _0x1ae3b7 = null
    _0x1dd3a8 = null
    this.skills = skillOverrides
    this.skillsTba = _0xc3a760
    this.notifies = _0x93d2c0
    this.sharedSkills = utils.getMapFromArray(_0x2a648e.sharedSkills)
    this.blockedAbnormals = utils.getMapFromArray(_0x2a648e.abnormals)
    this.forcefulSkillExclude = klona(_0x2a648e.forceSkillExclude)
    _0x2a648e = null
    this.items = deepMerge(_0x2c813e, _0x2b8305)
    _0x2bf8b1 = deepMerge(_0x2bf8b1, _0x43a9a4)
    this.dcInfo = _0x262d61
    this.dcInfoTba = _0x4fb1b2
    this.movement = _0x49de12
    this.movementTba = _0x12dc6c
    this.cc = _0x2bf8b1.abnormals.cc
    this.ccKeys = Object.keys(this.cc)
    this.buffs = _0x2bf8b1.abnormals.buffs
    this.buffKeys = Object.keys(this.buffs)
    this.slows = _0x2bf8b1.abnormals.slows
    this.slowsKeys = Object.keys(this.slows)
    this.passives = _0x2bf8b1.passives
    this.passivesKeys = Object.keys(this.passives).map(Number)
    this.aspdAbnList = _0x2bf8b1.abnormals.customList
    this.talents = _0x2bf8b1.talents
    this.polishing = _0x2bf8b1.polishing
    this.doNotModify = _0x2bf8b1.abnormals.doNotModify
    this.baseData = _rrrrrrrr || {}
    ;(!this.preset[4][4] || !this.preset[4][33]) &&
      ((this.preset[4][4] = false), (this.preset[4][33] = false))
    !this.preset[9][43] && (this.preset[9][43] = true)
    this.config.defaultPingValue > 0 &&
      this.config.defaultPingValue <= 45 &&
      (this.quantileOne = 0.05)
    let _0x4e6a33 = []
    for (let skillProperty of Object.keys(this.skills)) {
      let propertyValue = this.skills[skillProperty],
        skillPropertyValueProperties = Object.keys(propertyValue)
      for (let skillPropertyValueProperty of skillPropertyValueProperties) {
        if (!this.preset[skillProperty] || !this.preset[skillProperty].enabled) {
          continue
        }
        this.preset[skillProperty][skillPropertyValueProperty] &&
          (utils.deepSearch(
            propertyValue[skillPropertyValueProperty],
            'addAbnormal',
            (_0x51d416) => Object.keys(_0x51d416),
            _0x4e6a33
          ),
          utils.deepSearch(
            propertyValue[skillPropertyValueProperty],
            'variation',
            (_0x3e32e1) => {
              let _0x53cd77 = []
              return (
                Object.values(_0x3e32e1).forEach((x) => {
                  'object' === typeof x &&
                    x.id &&
                    _0x53cd77.push(x.id)
                }),
                _0x53cd77
              )
            },
            _0x4e6a33
          ))
      }
    }
    Object.assign(
      this.blockedAbnormals,
      utils.getMapFromArray(utils.getFlatArray(_0x4e6a33))
    )
    _0x4e6a33 = null
  }
  ['SaveConfig']() {
    utils.saveJson(utils.sortObject(this.config), this.configPath)
  }
  ['getSkillDataWithCache'](_0x4c6702, _0x3539f5, _0x441a9f, _0x16b228) {
    !(_0x4c6702 instanceof SkillID) && (_0x4c6702 = new SkillID(_0x4c6702))
    if (_0x4c6702.type !== 1) {
      return null
    }
    const _0x46ca1e = _0x4c6702.id
    let _0xeaf291 = this.skillsCache.get(_0x46ca1e)
    if (_0xeaf291) {
      return _0xeaf291
    }
    let _0x18ccfa = utils.getSkillBase(_0x46ca1e),
      _0x562288 = utils.getSkillLevel(_0x46ca1e),
      _0x4de105 = utils.getSkillSub(_0x46ca1e)
    if (this.sharedSkills[_0x46ca1e]) {
      return this.skillsCache.set(_0x46ca1e, null), null
    }
    if (
      !utils.getSafe(this.preset, [_0x441a9f, _0x18ccfa]) &&
      !utils.getSafe(this.preset, ['*', _0x18ccfa])
    ) {
      return this.skillsCache.set(_0x46ca1e, null), null
    }
    let _0x83792b = [
      utils.getSafe(this.dcInfo, [_0x3539f5, _0x4c6702.id]),
      utils.getSafe(this.skills, [_0x441a9f, '*']),
      utils.getSafe(this.skills, [_0x441a9f, '*', 'level', _0x562288]),
      utils.getSafe(this.skills, [_0x441a9f, '*', 'race', _0x16b228]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        '*',
        'race',
        _0x16b228,
        'level',
        _0x562288,
      ]),
      utils.getSafe(this.skills, [_0x441a9f, _0x18ccfa, '*']),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        '*',
        'level',
        _0x562288,
      ]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        '*',
        'race',
        _0x16b228,
      ]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        '*',
        'race',
        _0x16b228,
        'level',
        _0x562288,
      ]),
      utils.getSafe(this.skills, [_0x441a9f, _0x18ccfa, _0x4de105]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        _0x4de105,
        'level',
        _0x562288,
      ]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        _0x4de105,
        'race',
        _0x16b228,
      ]),
      utils.getSafe(this.skills, [
        _0x441a9f,
        _0x18ccfa,
        _0x4de105,
        'race',
        _0x16b228,
        'level',
        _0x562288,
      ]),
    ]
    if (_0x83792b[9]) {
      const _0xfc0f7e = Object.assign({}, ..._0x83792b)
      if (_0xfc0f7e.disabled) {
        return this.skillsCache.set(_0x46ca1e, null), null
      }
      return (
        this.skillsCache.set(_0x46ca1e, _0xfc0f7e),
        (_0xeaf291 = _0xfc0f7e),
        delete _0xeaf291.race,
        delete _0xeaf291.level,
        _0xeaf291
      )
    }
    return this.skillsCache.set(_0x46ca1e, null), null
  }
  ['clearSkillDataCache']() {
    this.skillsCache.clear()
  }
  ['getItemDataWithCache'](_0x5a9daa) {
    let _0x512bc5 = this.itemsCache.get(_0x5a9daa)
    if (_0x512bc5) {
      return _0x512bc5
    }
    let _0x1d4a0b = [
      utils.getSafe(this.items, ['*']),
      utils.getSafe(this.items, [_0x5a9daa]),
    ]
    if (_0x1d4a0b[0] || _0x1d4a0b[1]) {
      const _0x3df246 = Object.assign({}, ..._0x1d4a0b)
      return this.itemsCache.set(_0x5a9daa, _0x3df246), _0x3df246
    }
    return this.itemsCache.set(_0x5a9daa, null), null
  }
  ['clearItemCache']() {
    this.itemsCache.clear()
  }
  ['destructor']() {
    try {
      utils.saveJson(
        this.napCache,
        this.cachePath + '/' + this._cacheFileName,
        true
      )
    } catch (_0x543b06) {}
  }
}
module.exports = _0x15f45a
