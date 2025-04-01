'use strict'
const utils = require('./utils'),
  { SkillID: SkillID } = require('tera-data-parser').types,
  deepMerge = require('deepmerge'),
  klona = require('klona/lite').klona,
  EventEmitter = require('events').EventEmitter,
  fs = require('fs')
class stateClass extends EventEmitter {
  constructor(_cctor) {
    super()
    this.setMaxListeners(0)
    this._mod = _cctor.mod
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
  async ['LoadData'](modInfo) {
    this._cacheFileName = modInfo.majorPatchVersion + '-napCacheData.json'
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
        effectsInfoPromise,
        effectsOverrideInfoPromise,
        skillsInfoPromise,
        movementsInfoPromise,
        itemsInfoPromise,
        denylistDataInfoPromise,
        skillOverridePromise,
        baseDataPromise,
        itemsOverridePromise,
        battleNotificationPromise,
        movementsTbaPromise,
        skillsTbaPromise,
        skillsOverrideTbaPromise,
      ] = await Promise.all([
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/effects.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/effects-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/skills.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/movements.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/items.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/denylistData.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/skills-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/baseData.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/items-override.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/battleNotifications.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/movements-tba.res'
        ),
        utils.loadBufferAsync(
          this.emuPath + '/' + modInfo.majorPatchVersion + '/skills-tba.res'
        ),
        utils.loadBufferAsync(
          this.emuPath +
            '/' +
            modInfo.majorPatchVersion +
            '/skills-override-tba.res'
        ),
      ]),
      [
        effectsinfo,
        effectsOverrideInfo,
        skillsInfo,
        movementsInfo,
        itemsInfo,
        denylistDataInfo,
        skillOverrides,
        baseDataInfo,
        itemsOverrideInfo,
        battleNotificationInfo,
        movementsTbaInfo,
        skillsTbaInfo,
        skillsOverrideTbaInfo,
      ] = await Promise.all([
        utils.getJsonWithUnpack(effectsInfoPromise),
        utils.getJsonWithUnpack(effectsOverrideInfoPromise),
        utils.getJsonWithUnpack(skillsInfoPromise),
        utils.getJsonWithUnpack(movementsInfoPromise),
        utils.getJsonWithUnpack(itemsInfoPromise),
        utils.getJsonWithUnpack(denylistDataInfoPromise),
        utils.getJsonWithUnpack(skillOverridePromise),
        utils.getJsonWithUnpack(baseDataPromise),
        utils.getJsonWithUnpack(itemsOverridePromise),
        utils.getJsonWithUnpack(battleNotificationPromise),
        utils.getJsonWithUnpack(movementsTbaPromise),
        utils.getJsonWithUnpack(skillsTbaPromise),
        utils.getJsonWithUnpack(skillsOverrideTbaPromise),
      ])
    effectsInfoPromise = null
    effectsOverrideInfoPromise = null
    skillsInfoPromise = null
    movementsInfoPromise = null
    itemsInfoPromise = null
    denylistDataInfoPromise = null
    skillOverridePromise = null
    baseDataPromise = null
    battleNotificationPromise = null
    skillsTbaPromise = null
    movementsTbaPromise = null
    skillsOverrideTbaPromise = null
    this.skills = skillOverrides
    this.skillsTba = skillsOverrideTbaInfo
    this.notifies = battleNotificationInfo
    this.sharedSkills = utils.getMapFromArray(denylistDataInfo.sharedSkills)
    this.blockedAbnormals = utils.getMapFromArray(denylistDataInfo.abnormals)
    this.forcefulSkillExclude = klona(denylistDataInfo.forceSkillExclude)
    denylistDataInfo = null
    this.items = deepMerge(itemsInfo, itemsOverrideInfo)
    effectsinfo = deepMerge(effectsinfo, effectsOverrideInfo)
    this.dcInfo = skillsInfo
    this.dcInfoTba = skillsTbaInfo
    this.movement = movementsInfo
    this.movementTba = movementsTbaInfo
    this.cc = effectsinfo.abnormals.cc
    this.ccKeys = Object.keys(this.cc)
    this.buffs = effectsinfo.abnormals.buffs
    this.buffKeys = Object.keys(this.buffs)
    this.slows = effectsinfo.abnormals.slows
    this.slowsKeys = Object.keys(this.slows)
    this.passives = effectsinfo.passives
    this.passivesKeys = Object.keys(this.passives).map(Number)
    this.aspdAbnList = effectsinfo.abnormals.customList
    this.talents = effectsinfo.talents
    this.polishing = effectsinfo.polishing
    this.doNotModify = effectsinfo.abnormals.doNotModify
    this.baseData = baseDataInfo || {}
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
  ['getSkillDataWithCache'](skillIDObject, templateId, job, race) {
    !(skillIDObject instanceof SkillID) && (skillIDObject = new SkillID(skillIDObject))
    if (skillIDObject.type !== 1) {
      return null
    }
    const skillIDID = skillIDObject.id
    let skillCache = this.skillsCache.get(skillIDID)
    if (skillCache) {
      console.log(`${skillIDID} resolved from cache`)
      return skillCache
    }
    else{
      console.log(`${skillIDID} didnt resolve from cache`)
    }
    let skillBase = utils.getSkillBase(skillIDID),
      skillLevel = utils.getSkillLevel(skillIDID),
      skillSub = utils.getSkillSub(skillIDID)
    if (this.sharedSkills[skillIDID]) {
      return this.skillsCache.set(skillIDID, null), null
    }
    if (
      !utils.getSafe(this.preset, [job, skillBase]) &&
      !utils.getSafe(this.preset, ['*', skillBase])
    ) {
      return this.skillsCache.set(skillIDID, null), null
    }
    //job is class
    //dcInfo loads from skills.json
    //skills loads from skills-overrides.json
    //skill base is the counter used in category id (like 1 in 1001, 2001, 3001 etc etc) OR the highest digits in the skill id; like '1' in 100131 (category id and skill base always match; unless miko fucks it up)
    //skill sub is the counter used for different skill branching PER LEVEL (like 0 in 100100, 30 in 100130, 31 in 100131; so it means all skills per category for each level must follow same id pattern for branching)
    //skill level is ... skill level (like 1 in 1001xx, 2 in 1002xx, 3 in 1003xx, and so on)
    //race and job comes in as arguments
    let getSafeSkillArray = [ 
      utils.getSafe(this.dcInfo, [templateId, skillIDObject.id]),
      utils.getSafe(this.skills, [job, '*']),
      utils.getSafe(this.skills, [job, '*', 'level', skillLevel]),
      utils.getSafe(this.skills, [job, '*', 'race', race]),
      utils.getSafe(this.skills, [job, '*', 'race', race, 'level', skillLevel, ]),
      utils.getSafe(this.skills, [job, skillBase, '*']),
      utils.getSafe(this.skills, [job, skillBase, '*', 'level', skillLevel, ]),
      utils.getSafe(this.skills, [job, skillBase, '*', 'race', race, ]),
      utils.getSafe(this.skills, [job, skillBase, '*', 'race', race, 'level', skillLevel, ]),
      utils.getSafe(this.skills, [job, skillBase, skillSub]),//9th element
      utils.getSafe(this.skills, [job, skillBase, skillSub, 'level', skillLevel, ]),
      utils.getSafe(this.skills, [job, skillBase, skillSub, 'race', race, ]),
      utils.getSafe(this.skills, [job, skillBase, skillSub, 'race', race, 'level', skillLevel, ]),
    ]
    if (getSafeSkillArray[9]) {
      const skillSomething = Object.assign({}, ...getSafeSkillArray)
      if (skillSomething.disabled) {
        return this.skillsCache.set(skillIDID, null), null
      }
      return (
        this.skillsCache.set(skillIDID, skillSomething),
        (skillCache = skillSomething),
        delete skillCache.race,
        delete skillCache.level,
        skillCache
      )
    }
    return this.skillsCache.set(skillIDID, null), null
  }
  ['clearSkillDataCache']() {
    this.skillsCache.clear()
  }
  ['getItemDataWithCache'](itemId) {
    let cachedItem = this.itemsCache.get(itemId)
    if (cachedItem) {
      return cachedItem
    }
    let itemsFromCache = [
      utils.getSafe(this.items, ['*']),
      utils.getSafe(this.items, [itemId]),
    ]
    if (itemsFromCache[0] || itemsFromCache[1]) {
      const resolvedItems = Object.assign({}, ...itemsFromCache)
      return this.itemsCache.set(itemId, resolvedItems), resolvedItems
    }
    return this.itemsCache.set(itemId, null), null
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
    } catch (ex) {}
  }
}
module.exports = stateClass
