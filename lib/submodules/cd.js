'use strict'
class cooldownClass {
  constructor({
    mod: modObject,
    state: stateObject,
    ping: pingObject,
    defs: defsObject,
    log: logObject,
    utils: utilsObject,
    client: clientObject,
  }) {
    this._utils = utilsObject
    this.cooldowns = new Map()
    this.itemsCooldowns = new Map()
    const OnServerSkillCoolTime = (packet) => {
        let _0x317574 = undefined
        stateObject.config.debugCooldowns &&
          logObject.writeDebugMessage(
            '<* S_COOLTIME_SKILL ' +
              packet.skill.id +
              ' ' +
              Math.max(0, packet.cooldown - pingObject.min) +
              ' (' +
              packet.cooldown +
              ')'
          )
        stateObject.config.enabled &&
          stateObject.config.advancedCooldowns &&
          (!stateObject.loadFinish || !clientObject
            ? (packet.cooldown = Math.max(
                0,
                packet.cooldown + 2 * pingObject.max
              ))
            : (packet.cooldown = Math.max(
                0,
                packet.cooldown - pingObject.min
              )),
          (_0x317574 = true))
        return (
          this.cooldowns.set(
            packet.skill.id,
            Date.now() + packet.cooldown
          ),
          _0x317574
        )
      },
      OnServerItemCoolTime = (packet) => {
        stateObject.items[packet.item] &&
          this.itemsCooldowns.set(
            packet.item,
            Date.now() + 1000 * packet.cooldown
          )
        stateObject.config.debugCooldowns &&
          logObject.writeLogMessage(
            '<- S_START_COOLTIME_ITEM ' +
              packet.item +
              ' (' +
              packet.cooldown +
              ')'
          )
      },
      hookInfo = {
        order: -10,
        filter: { fake: false },
      }
    modObject.hook(
      ...defsObject.getVersion('S_START_COOLTIME_SKILL'),
      hookInfo,
      OnServerSkillCoolTime
    )
    modObject.hook(
      ...defsObject.getVersion('S_DECREASE_COOLTIME_SKILL'),
      hookInfo,
      OnServerSkillCoolTime
    )
    modObject.hook(
      ...defsObject.getVersion('S_START_COOLTIME_ITEM'),
      hookInfo,
      OnServerItemCoolTime
    )
    modObject.hook('S_LOGIN', 'event', () => {
      this.cooldowns.clear()
      this.itemsCooldowns.clear()
    })
    modObject.majorPatchVersion >= 99 &&
      modObject.hook('TTB_S_CHANGE_HERO', 'event', () => {
        this.cooldowns.clear()
        this.itemsCooldowns.clear()
      })
  }
  ['setItemCd'](itemId, cd) {
    this.itemsCooldowns.set(itemId, cd)
  }
  ['itemInCd'](itemId) {
    return (
      this.itemsCooldowns.has(itemId) &&
      Date.now() <= this.itemsCooldowns.get(itemId)
    )
  }
  ['skillIdInCd'](skillId) {
    return (
      this.cooldowns.has(skillId) &&
      Date.now() < this.cooldowns.get(skillId)
    )
  }
  ['skillBaseInCd'](skillBaseId) {
    for (const _0x175e0a of this.cooldowns.keys()) {
      const _0x5720cf = this.cooldowns.get(_0x175e0a)
      if (
        skillBaseId == this._utils.getSkillBase(_0x175e0a) &&
        _0x5720cf > Date.now()
      ) {
        return true
      }
    }
    return false
  }
  ['resetCd'](skillId) {
    for (const _0x57a16f of this.cooldowns.keys()) {
      skillId == this._utils.getSkillBase(_0x57a16f) &&
        this.cooldowns.delete(_0x57a16f)
    }
  }
}
module.exports = cooldownClass
