'use strict'
class _0x3af3c6 {
  constructor(_0x1d26e8) {
    const {
      mod: _0x2be4ac,
      defs: _0x35e583,
      utils: _0x504ae6,
      state: _0x26fcf2,
      log: _0x571573,
      client: _0x1e0e7b,
    } = _0x1d26e8
    this.logReference = _0x1d26e8.log
    this.stateReference = _0x1d26e8.state
    let _0x4644ee = null,
      _0x1fac78 = []
    this.isTBA = false
    this.level = 1
    this.gameId = null
    this.templateId = -1
    this.race = -1
    this.job = -1
    this.mounted = true
    this.vehicleEx = null
    this.attackSpeed = 1
    this.attackSpeedBonus = 0
    this.stamina = 0
    this.partyMembers = []
    this.currentGlyphs = new Set()
    this.currentStamina = null
    this.lowStaminaSystemMessage = null
    this.aspd = 0
    this.passives = new Set()
    this.items = new Set()
    this.inCombat = false
    this.equippedWeapon = false
    this.bodyRolls = []
    this.categories = new Map()
    this.polishing = new Set()
    this.polishingLevelEffects = new Map()
    this.talents = new Map()
    this.totalRunSpeed = 0
    this.totalWalkSpeed = 0
    this.awookenedLevel = 0
    this.inGacha = false
    const _0x4e9ce5 = (_0x18357f) => {
        this.passives.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        for (let _0x3df981 of _0x18357f.skills) {
          let _0x404022 = Number(_0x3df981.id)
          if (!_0x3df981.active) {
            this.passives.add(_0x404022)
          }
        }
      },
      _0x1326fe = (_0x272ba2) => {
        this.gameId = _0x1e0e7b
          ? _0x272ba2.gameId
          : _0x272ba2.gameId + BigInt(1)
        this.templateId = _0x272ba2.templateId
        this.race = _0x504ae6.getRaceFromTemplateId(this.templateId)
        this.job = _0x504ae6.getJobFromTemplateId(this.templateId)
        this.passives.clear()
        this.partyMembers = []
        this.currentGlyphs.clear()
        this.polishing.clear()
        this.items.clear()
        this.bodyRolls = []
        this.categories.clear()
        this.inGacha = false
        switch (this.job) {
          case 9:
            this.lowStaminaSystemMessage = 'SMT_BATTLE_SKILL_FAIL_LOW_ARCANE'
            break
          case 10:
            this.lowStaminaSystemMessage = 'SMT_BATTLE_SKILL_FAIL_LOW_FURY'
            break
          case 11:
            this.lowStaminaSystemMessage = 'SMT_BATTLE_SKILL_FAIL_LOW_CHAKRA'
            break
          case 12:
            this.lowStaminaSystemMessage =
              'SMT_BATTLE_SKILL_FAIL_LOW_MOON_LIGHT'
            break
          default:
            this.lowStaminaSystemMessage = 'SMT_BATTLE_SKILL_FAIL_LOW_STAMINA'
            break
        }
        this.awookenedLevel = _0x272ba2.awakeningLevel
        this.level = _0x272ba2.level
      },
      _0x1eb2fc = (_0x9169f1) => {
        this.gameId = _0x1e0e7b
          ? _0x9169f1.gameId
          : _0x9169f1.gameId + BigInt(1)
        this.templateId = _0x9169f1.templateId
        this.race = -1
        this.job = -1
        this.passives.clear()
        this.partyMembers = []
        this.currentGlyphs.clear()
        this.polishing.clear()
        this.items.clear()
        this.bodyRolls = []
        this.categories.clear()
        this.inGacha = false
        this.awookenedLevel = 0
      },
      _0x45259b = (_0x38164e) => {
        if (_0x38164e.gameId !== this.gameId) {
          return
        }
        this.level = _0x38164e.level
      },
      _0xb8ffe4 = (_0x3723fa) => {
        if (_0x3723fa.gameId !== this.gameId) {
          return
        }
        this.inCombat = _0x3723fa.status === 1
      },
      _0x32f36a = (_0x53fdb4) => {
        this.attackSpeed = _0x53fdb4.attackSpeed
        this.attackSpeedBonus = _0x53fdb4.attackSpeedBonus
        this.currentStamina = _0x53fdb4.stamina
        this.totalRunSpeed = _0x53fdb4.runSpeed + _0x53fdb4.runSpeedBonus
        this.totalWalkSpeed = _0x53fdb4.walkSpeed + _0x53fdb4.walkSpeedBonus
        this.__recalculateAspd('Server')
      },
      _0x489fd5 = (_0x343fd6) => {
        _0x4644ee = _0x343fd6.first
          ? _0x343fd6
          : _0x4644ee.items.concat(_0x343fd6.items)
        if (!_0x343fd6.more) {
          if (_0x4644ee.container == 14) {
            _0x1fac78 = []
            _0x4644ee.items.forEach((_0x3cedaa) => {
              _0x1fac78.push(_0x3cedaa)
            })
          } else {
            if (_0x4644ee.container == 0) {
              this.items.clear()
              _0x4644ee.items.forEach((_0x1f1935) => {
                this.items.add(_0x1f1935.id)
              })
            }
          }
          if (_0x343fd6.lastInBatch) {
            this.equippedWeapon = _0x1fac78.some(
              (_0x32529f) => _0x32529f.slot == 1
            )
            let _0x4e0424 = _0x1fac78.find((_0x331619) => _0x331619.slot == 3)
            if (_0x4e0424) {
              let _0x537223 = []
              const _0xa76607 = _0x4e0424.passivitySets[_0x4e0424.passivitySet]
              if (_0xa76607) {
                for (let _0x21e1a6 of _0xa76607.passivities) {
                  _0x21e1a6.id !== 0 && _0x537223.push(_0x21e1a6.id)
                }
              }
              this.bodyRolls = _0x537223
            }
            let _0x565023 = _0x1fac78.find((_0x3dae1f) => _0x3dae1f.slot == 20)
            _0x565023 && this.items.add(_0x565023.id)
          }
          _0x4644ee = null
        }
      },
      _0x86da40 = (_0xb80b6b) => {
        this.currentStamina = _0xb80b6b.current
      },
      _0x2444f2 = (_0x272796) => {
        this.partyMembers = []
        _0x272796.members.forEach((_0x178041) => {
          !(_0x178041.gameId === this.gameId) &&
            this.partyMembers.push({
              gameId: _0x178041.gameId,
              pid: _0x178041.playerId,
              sid: _0x178041.serverId,
            })
        })
      },
      _0x4bf865 = (_0x2dccd0) => {
        this.partyMembers = this.partyMembers.filter(
          (_0x4936a3) =>
            _0x4936a3.pid !== _0x2dccd0.playerId &&
            _0x4936a3.sid !== _0x2dccd0.playerId
        )
      },
      _0x44ccef = () => {
        this.partyMembers = []
      },
      _0x2726cc = (_0x1205a5) => {
        this.currentGlyphs.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        _0x26fcf2.config.debugGlyphs &&
          _0x571573.writeDebugMessage('<- S_CREST_INFO ' + _0x1205a5.crests)
        for (let _0x2e6e2c of _0x1205a5.crests) {
          _0x2e6e2c.enable
            ? this.currentGlyphs.add(_0x2e6e2c.id)
            : this.currentGlyphs.delete(_0x2e6e2c.id)
        }
      },
      _0x2461b9 = (_0x5b6192) => {
        if (!this.stateReference.loadFinish) {
          return
        }
        _0x26fcf2.config.debugGlyphs &&
          _0x571573.writeDebugMessage(
            '<- S_CREST_APPLY ' + _0x5b6192.id + ' status: ' + _0x5b6192.enable
          )
        _0x5b6192.enable
          ? this.currentGlyphs.add(_0x5b6192.id)
          : this.currentGlyphs.delete(_0x5b6192.id)
      },
      _0x276adb = (_0x1d6df5) => {
        _0x1d6df5.target === this.gameId && (this.vehicleEx = _0x1d6df5.vehicle)
      },
      _0xe93817 = (_0x344350) => {
        _0x344350.target === this.gameId && (this.vehicleEx = null)
      },
      _0x48c38e = (_0x2f0d2d) => {
        _0x2f0d2d.gameId === this.gameId && (this.mounted = true)
      },
      _0x512c41 = (_0x39c9ee) => {
        _0x39c9ee.gameId === this.gameId && (this.mounted = false)
      },
      _0x4a032d = (_0x32aad6) => {
        this.categories.set(_0x32aad6.category, _0x32aad6.enabled)
      },
      _0x151585 = (_0x459ef3) => {
        this.polishing.clear()
        this.polishingLevelEffects.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        _0x26fcf2.config.debugPolishing &&
          _0x571573.writeDebugMessage(
            '<- S_RP_SKILL_POLISHING_LIST',
            _0x459ef3.optionEffects
          )
        for (let _0x406dc5 of _0x459ef3.optionEffects) {
          _0x406dc5.active
            ? this.polishing.add(_0x406dc5.id)
            : this.polishing.delete(_0x406dc5.id)
        }
        for (let _0x55c6ea of _0x459ef3.levelEffects) {
          this.polishingLevelEffects.set(_0x55c6ea.group, _0x55c6ea.id)
        }
      },
      _0x1c7c85 = (_0x2e4904) => {
        if (!_0x2e4904.successful) {
          return
        }
        for (let _0x3e2f9a of _0x2e4904.perks) {
          this.talents.has(_0x3e2f9a.id) && this.talents.delete(_0x3e2f9a.id)
          this.talents.set(_0x3e2f9a.id, _0x3e2f9a.level)
        }
      }
    const _0x3e1601 = (_0x17b3bd) => {
        _0x26fcf2.config.debugTalents &&
          _0x571573.writeDebugMessage('<- S_LOAD_EP_INFO', _0x17b3bd.perks)
        if (!this.stateReference.loadFinish) {
          return
        }
        this.talents.clear()
        for (let _0x491fc3 of _0x17b3bd.perks) {
          this.talents.set(_0x491fc3.id, _0x491fc3.level)
        }
      },
      _0x50a604 = (_0x344402) => {
        _0x26fcf2.config.debugTalents &&
          _0x571573.writeDebugMessage('<- TTB_S_LOAD_EP_PAGE', _0x344402.perks)
        if (!this.stateReference.loadFinish) {
          return
        }
        this.talents.clear()
        for (let _0x297ba3 of _0x344402.perks) {
          this.talents.set(_0x297ba3.id, _0x297ba3.level)
        }
      },
      _0x5dc04f = () => {
        this.talents.clear()
      },
      _0x2c70a2 = (_0x387939) => {
        53 === _0x387939.type && (this.inGacha = true)
      },
      _0x52b3fa = (_0x51cc48) => {
        if (_0x51cc48.type === 53) {
          this.inGacha = false
        }
      }
    _0x2be4ac.hook(..._0x35e583.getVersion('S_SKILL_LIST'), _0x4e9ce5)
    _0x2be4ac.hook(..._0x35e583.getVersion('S_SKILL_CATEGORY'), _0x4a032d)
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_LOGIN'),
      {
        order: -10,
        filter: { fake: false },
      },
      _0x1326fe
    )
    _0x2be4ac.majorPatchVersion >= 99 &&
      _0x2be4ac.hook(
        ..._0x35e583.getVersion('TTB_S_CHANGE_HERO'),
        {
          order: -10,
          filter: { fake: false },
        },
        _0x1eb2fc
      )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_USER_LEVELUP'),
      {
        order: -10,
        filter: { fake: false },
      },
      _0x45259b
    )
    _0x2be4ac.hook(..._0x35e583.getVersion('S_USER_STATUS'), _0xb8ffe4)
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_ITEMLIST'),
      {
        order: -10000000000,
        filter: { fake: false },
      },
      _0x489fd5
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_PLAYER_STAT_UPDATE'),
      {
        order: -Infinity,
        filter: { fake: null },
      },
      _0x32f36a
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_PLAYER_CHANGE_STAMINA'),
      _0x86da40
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_PARTY_MEMBER_LIST'),
      {
        order: -10,
        filter: { fake: false },
      },
      _0x2444f2
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_LEAVE_PARTY_MEMBER'),
      {
        order: -10,
        filter: { fake: false },
      },
      _0x4bf865
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_BAN_PARTY_MEMBER'),
      {
        order: -10,
        filter: { fake: false },
      },
      _0x4bf865
    )
    _0x2be4ac.hook(..._0x35e583.getVersion('S_CREST_INFO'), _0x2726cc)
    _0x2be4ac.hook(..._0x35e583.getVersion('S_CREST_APPLY'), _0x2461b9)
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_MOUNT_VEHICLE_EX'),
      {
        order: -10,
        filter: { fake: null },
      },
      _0x276adb
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_UNMOUNT_VEHICLE_EX'),
      {
        order: -10,
        filter: { fake: null },
      },
      _0xe93817
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_MOUNT_VEHICLE'),
      {
        order: -10,
        filter: { fake: null },
      },
      _0x48c38e
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_UNMOUNT_VEHICLE'),
      {
        order: -10,
        filter: { fake: null },
      },
      _0x512c41
    )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_RP_SKILL_POLISHING_LIST'),
      _0x151585
    )
    _0x2be4ac.hook(..._0x35e583.getVersion('S_LEARN_EP_PERK'), _0x1c7c85)
    _0x2be4ac.hook(..._0x35e583.getVersion('S_LOAD_EP_INFO'), _0x3e1601)
    _0x2be4ac.majorPatchVersion >= 97 &&
      _0x2be4ac.hook(..._0x35e583.getVersion('TTB_S_LOAD_EP_PAGE'), _0x50a604)
    _0x2be4ac.majorPatchVersion >= 93 &&
      (_0x2be4ac.hook(
        ..._0x35e583.getVersion('S_REQUEST_CONTRACT'),
        {
          order: -10000000000,
          filter: { fake: false },
        },
        _0x2c70a2
      ),
      _0x2be4ac.hook(
        ..._0x35e583.getVersion('S_CANCEL_CONTRACT'),
        {
          order: -10000000000,
          filter: { fake: false },
        },
        _0x52b3fa
      ))
    _0x2be4ac.hook('S_RETURN_TO_LOBBY', 'event', _0x5dc04f)
    _0x2be4ac.hook('S_RESET_EP_PERK', 'event', _0x5dc04f)
    _0x2be4ac.hook(
      'S_LEAVE_PARTY',
      'event',
      {
        order: -10,
        filter: { fake: false },
      },
      _0x44ccef
    )
    _0x2be4ac.hook(
      'S_BAN_PARTY',
      'event',
      {
        order: -10,
        filter: { fake: false },
      },
      _0x44ccef
    )
    _0x2be4ac.hook(
      'S_SELECT_USER',
      'event',
      {
        order: -10,
        filter: { fake: false },
      },
      () => {
        this.isTBA = false
      }
    )
    _0x2be4ac.majorPatchVersion >= 99 &&
      _0x2be4ac.hook(
        'S_TBA_SELECT_USER',
        'event',
        {
          order: -10,
          filter: { fake: false },
        },
        () => {
          this.isTBA = true
        }
      )
    _0x2be4ac.hook(
      ..._0x35e583.getVersion('S_LOAD_TOPO'),
      {
        order: -10,
        filter: { fake: false },
      },
      (_0x3db9fd) => {
        this.vehicleEx = null
        this.mounted = false
        this.zone = _0x3db9fd.zone
      }
    )
  }
  ['__recalculateAspd'](_0x56062a = 'unk') {
    let _0x33cfac = [120, 100, 110, 90, 110, 120, 105, 105]
    this.aspd =
      (this.attackSpeed + this.attackSpeedBonus) /
      (this.job >= 8 ? 100 : _0x33cfac[this.job])
    this.stateReference.config.debugAspd &&
      this.logReference.writeDebugMessage(
        '<I> ASPD_CHANGE ' +
          (this.job >= 8 ? 100 : this.attackSpeed) +
          ' ' +
          this.attackSpeedBonus +
          ' (' +
          this.aspd +
          ') [' +
          _0x56062a +
          ']'
      )
  }
  ['isMe'](_0x555bc5) {
    return (
      this.gameId === _0x555bc5 ||
      (this.vehicleEx && this.vehicleEx === _0x555bc5)
    )
  }
  ['myChar']() {
    return this.vehicleEx ? this.vehicleEx : this.gameId
  }
  ['changeAspd'](_0x3e38d1, _0x4be464, _0x70e0a = false, _0x58bf55) {
    switch (_0x4be464) {
      case 2:
        this.attackSpeedBonus = _0x70e0a
          ? this.attackSpeedBonus - _0x3e38d1
          : this.attackSpeedBonus + _0x3e38d1
        break
      case 3:
        this.attackSpeedBonus = _0x70e0a
          ? this.attackSpeedBonus -
            (Math.round(this.attackSpeed * _0x3e38d1) - this.attackSpeed)
          : this.attackSpeedBonus +
            (Math.round(this.attackSpeed * _0x3e38d1) - this.attackSpeed)
        break
    }
    this.__recalculateAspd(_0x58bf55)
  }
  ['isPartyMember'](_0x339d8f) {
    for (let _0x27b07a = 0; _0x27b07a < this.partyMembers.length; _0x27b07a++) {
      if (this.partyMembers[_0x27b07a].gameId === _0x339d8f) {
        return true
      }
    }
    return false
  }
  ['getPolishingEffectByGroup'](_0x1cefed) {
    return this.polishingLevelEffects.get(_0x1cefed)
  }
  ['isPolishingExist'](_0xd38740) {
    return this.polishing.has(_0xd38740)
  }
  ['isPolishingEffectExist'](_0x593dc0) {
    return this.polishingLevelEffects.has(_0x593dc0)
  }
  ['isTalentExist'](_0x405799) {
    return this.talents.has(_0x405799)
  }
  ['getTalentLevel'](_0x595f76) {
    return this.talents.get(_0x595f76)
  }
  ['isGlyphExists'](_0x5a024) {
    return this.currentGlyphs.has(Number(_0x5a024))
  }
  ['isItemFromInventory'](_0x572b30) {
    return this.items.has(_0x572b30)
  }
  ['isCategoriesEnabled'](_0x1ec5d3) {
    for (const _0x263a8d of _0x1ec5d3) {
      if (
        this.categories.has(Number(_0x263a8d)) &&
        !this.categories.get(Number(_0x263a8d))
      ) {
        return false
      }
    }
    return true
  }
}
module.exports = _0x3af3c6
