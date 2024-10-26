'use strict'
class _0x3af3c6 {
  constructor(cctorArgument) {
    const {
      mod: mod,
      defs: defs,
      utils: utils,
      state: state,
      log: log,
      client: client,
    } = cctorArgument
    this.logReference = cctorArgument.log
    this.stateReference = cctorArgument.state
    let first_property = null,
      someList = []
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
    const OnServerSkillList = (packet) => {
        this.passives.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        for (let skill of packet.skills) {
          let skillID = Number(skill.id)
          if (!skill.active) {
            this.passives.add(skillID)
          }
        }
      },
      OnServerLogin = (packet) => {
        this.gameId = client
          ? packet.gameId
          : packet.gameId + BigInt(1)
        this.templateId = packet.templateId
        this.race = utils.getRaceFromTemplateId(this.templateId)
        this.job = utils.getJobFromTemplateId(this.templateId)
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
        this.awookenedLevel = packet.awakeningLevel
        this.level = packet.level
      },
      _0x1eb2fc = (argument) => {
        this.gameId = client
          ? argument.gameId
          : argument.gameId + BigInt(1)
        this.templateId = argument.templateId
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
      OnServerUserLevelUp = (packet) => {
        if (packet.gameId !== this.gameId) {
          return
        }
        this.level = packet.level
      },
      OnServerUserStatus = (packet) => {
        if (packet.gameId !== this.gameId) {
          return
        }
        this.inCombat = packet.status === 1
      },
      OnServerPlayerStateUpdate = (packet) => {
        this.attackSpeed = packet.attackSpeed
        this.attackSpeedBonus = packet.attackSpeedBonus
        this.currentStamina = packet.stamina
        this.totalRunSpeed = packet.runSpeed + packet.runSpeedBonus
        this.totalWalkSpeed = packet.walkSpeed + packet.walkSpeedBonus
        this.__recalculateAspd('Server')
      },
      OnServerItemList = (packet) => {
        first_property = packet.first
          ? packet
          : first_property.items.concat(packet.items)
        if (!packet.more) {
          if (first_property.container == 14) {
            someList = []
            first_property.items.forEach((x) => {
              someList.push(x)
            })
          } else {
            if (first_property.container == 0) {
              this.items.clear()
              first_property.items.forEach((x) => {
                this.items.add(x.id)
              })
            }
          }
          if (packet.lastInBatch) {
            this.equippedWeapon = someList.some(
              (_0x32529f) => _0x32529f.slot == 1
            )
            let someItem = someList.find((x) => x.slot == 3)
            if (someItem) {
              let _0x537223 = []
              const _0xa76607 = someItem.passivitySets[someItem.passivitySet]
              if (_0xa76607) {
                for (let passivity of _0xa76607.passivities) {
                  passivity.id !== 0 && _0x537223.push(passivity.id)
                }
              }
              this.bodyRolls = _0x537223
            }
            let _0x565023 = someList.find((x) => x.slot == 20)
            _0x565023 && this.items.add(_0x565023.id)
          }
          first_property = null
        }
      },
      OnServerPlayerChangeStamina = (packet) => {
        this.currentStamina = packet.current
      },
      OnServerPartyMemberList = (packet) => {
        this.partyMembers = []
        packet.members.forEach((ptMember) => {
          !(ptMember.gameId === this.gameId) &&
            this.partyMembers.push({
              gameId: ptMember.gameId,
              pid: ptMember.playerId,
              sid: ptMember.serverId,
            })
        })
      },
      OnServerLeavePartyMember = (packet) => {
        this.partyMembers = this.partyMembers.filter(
          (ptMember) =>
            ptMember.pid !== packet.playerId &&
            ptMember.sid !== packet.playerId
        )
      },
      OnServerLeaveParty = () => {
        this.partyMembers = []
      },
      OnServerCrestInfo = (packet) => {
        this.currentGlyphs.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        state.config.debugGlyphs &&
          log.writeDebugMessage('<- S_CREST_INFO ' + packet.crests)
        for (let crest of packet.crests) {
          crest.enable
            ? this.currentGlyphs.add(crest.id)
            : this.currentGlyphs.delete(crest.id)
        }
      },
      OnServerCrestApply = (glyph) => {
        if (!this.stateReference.loadFinish) {
          return
        }
        state.config.debugGlyphs &&
          log.writeDebugMessage(
            '<- S_CREST_APPLY ' + glyph.id + ' status: ' + glyph.enable
          )
        glyph.enable
          ? this.currentGlyphs.add(glyph.id)
          : this.currentGlyphs.delete(glyph.id)
      },
      OnServerMountVehicleEx = (packet) => {
        packet.target === this.gameId && (this.vehicleEx = packet.vehicle)
      },
      OnServerUnmountVehicleEx = (packet) => {
        packet.target === this.gameId && (this.vehicleEx = null)
      },
      OnServerMountVehicle = (packet) => {
        packet.gameId === this.gameId && (this.mounted = true)
      },
      OnServerUnmountVehicle = (packet) => {
        packet.gameId === this.gameId && (this.mounted = false)
      },
      OnServerSkillCategory = (packet) => {
        this.categories.set(packet.category, packet.enabled)
      },
      OnServerRPSkillPolishingList = (packet) => {
        this.polishing.clear()
        this.polishingLevelEffects.clear()
        if (!this.stateReference.loadFinish) {
          return
        }
        state.config.debugPolishing &&
          log.writeDebugMessage(
            '<- S_RP_SKILL_POLISHING_LIST',
            packet.optionEffects
          )
        for (let optionEffect of packet.optionEffects) {
          optionEffect.active
            ? this.polishing.add(optionEffect.id)
            : this.polishing.delete(optionEffect.id)
        }
        for (let levelEffect of packet.levelEffects) {
          this.polishingLevelEffects.set(levelEffect.group, levelEffect.id)
        }
      },
      OnServerLearnEPPerk = (packet) => {
        if (!packet.successful) {
          return
        }
        for (let perk of packet.perks) {
          this.talents.has(perk.id) && this.talents.delete(perk.id)
          this.talents.set(perk.id, perk.level)
        }
      }
    const OnServerLoadEPInfo = (packet) => {
        state.config.debugTalents &&
          log.writeDebugMessage('<- S_LOAD_EP_INFO', packet.perks)
        if (!this.stateReference.loadFinish) {
          return
        }
        this.talents.clear()
        for (let perk of packet.perks) {
          this.talents.set(perk.id, perk.level)
        }
      },
      _0x50a604 = (_0x344402) => {
        state.config.debugTalents &&
          log.writeDebugMessage('<- TTB_S_LOAD_EP_PAGE', _0x344402.perks)
        if (!this.stateReference.loadFinish) {
          return
        }
        this.talents.clear()
        for (let perk of _0x344402.perks) {
          this.talents.set(perk.id, perk.level)
        }
      },
      OnServerReturnToLobby = () => {
        this.talents.clear()
      },
      OnServerRequestContract = (packet) => {
        53 === packet.type && (this.inGacha = true)
      },
      OnServerCancelContract = (packet) => {
        if (packet.type === 53) {
          this.inGacha = false
        }
      }
    mod.hook(...defs.getVersion('S_SKILL_LIST'), OnServerSkillList)
    mod.hook(...defs.getVersion('S_SKILL_CATEGORY'), OnServerSkillCategory)
    mod.hook(
      ...defs.getVersion('S_LOGIN'),
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerLogin
    )
    mod.majorPatchVersion >= 99 &&
      mod.hook(
        ...defs.getVersion('TTB_S_CHANGE_HERO'),
        {
          order: -10,
          filter: { fake: false },
        },
        _0x1eb2fc
      )
    mod.hook(
      ...defs.getVersion('S_USER_LEVELUP'),
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerUserLevelUp
    )
    mod.hook(...defs.getVersion('S_USER_STATUS'), OnServerUserStatus)
    mod.hook(
      ...defs.getVersion('S_ITEMLIST'),
      {
        order: -10000000000,
        filter: { fake: false },
      },
      OnServerItemList
    )
    mod.hook(
      ...defs.getVersion('S_PLAYER_STAT_UPDATE'),
      {
        order: -Infinity,
        filter: { fake: null },
      },
      OnServerPlayerStateUpdate
    )
    mod.hook(
      ...defs.getVersion('S_PLAYER_CHANGE_STAMINA'),
      OnServerPlayerChangeStamina
    )
    mod.hook(
      ...defs.getVersion('S_PARTY_MEMBER_LIST'),
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerPartyMemberList
    )
    mod.hook(
      ...defs.getVersion('S_LEAVE_PARTY_MEMBER'),
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerLeavePartyMember
    )
    mod.hook(
      ...defs.getVersion('S_BAN_PARTY_MEMBER'),
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerLeavePartyMember
    )
    mod.hook(...defs.getVersion('S_CREST_INFO'), OnServerCrestInfo)
    mod.hook(...defs.getVersion('S_CREST_APPLY'), OnServerCrestApply)
    mod.hook(
      ...defs.getVersion('S_MOUNT_VEHICLE_EX'),
      {
        order: -10,
        filter: { fake: null },
      },
      OnServerMountVehicleEx
    )
    mod.hook(
      ...defs.getVersion('S_UNMOUNT_VEHICLE_EX'),
      {
        order: -10,
        filter: { fake: null },
      },
      OnServerUnmountVehicleEx
    )
    mod.hook(
      ...defs.getVersion('S_MOUNT_VEHICLE'),
      {
        order: -10,
        filter: { fake: null },
      },
      OnServerMountVehicle
    )
    mod.hook(
      ...defs.getVersion('S_UNMOUNT_VEHICLE'),
      {
        order: -10,
        filter: { fake: null },
      },
      OnServerUnmountVehicle
    )
    mod.hook(
      ...defs.getVersion('S_RP_SKILL_POLISHING_LIST'),
      OnServerRPSkillPolishingList
    )
    mod.hook(...defs.getVersion('S_LEARN_EP_PERK'), OnServerLearnEPPerk)
    mod.hook(...defs.getVersion('S_LOAD_EP_INFO'), OnServerLoadEPInfo)
    mod.majorPatchVersion >= 97 &&
      mod.hook(...defs.getVersion('TTB_S_LOAD_EP_PAGE'), _0x50a604)
    mod.majorPatchVersion >= 93 &&
      (mod.hook(
        ...defs.getVersion('S_REQUEST_CONTRACT'),
        {
          order: -10000000000,
          filter: { fake: false },
        },
        OnServerRequestContract
      ),
      mod.hook(
        ...defs.getVersion('S_CANCEL_CONTRACT'),
        {
          order: -10000000000,
          filter: { fake: false },
        },
        OnServerCancelContract
      ))
    mod.hook('S_RETURN_TO_LOBBY', 'event', OnServerReturnToLobby)
    mod.hook('S_RESET_EP_PERK', 'event', OnServerReturnToLobby)
    mod.hook(
      'S_LEAVE_PARTY',
      'event',
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerLeaveParty
    )
    mod.hook(
      'S_BAN_PARTY',
      'event',
      {
        order: -10,
        filter: { fake: false },
      },
      OnServerLeaveParty
    )
    mod.hook(
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
    mod.majorPatchVersion >= 99 &&
      mod.hook(
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
    mod.hook(
      ...defs.getVersion('S_LOAD_TOPO'),
      {
        order: -10,
        filter: { fake: false },
      },
      (packet) => {
        this.vehicleEx = null
        this.mounted = false
        this.zone = packet.zone
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
  ['isMe'](gameId) {
    return (
      this.gameId === gameId ||
      (this.vehicleEx && this.vehicleEx === gameId)
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
