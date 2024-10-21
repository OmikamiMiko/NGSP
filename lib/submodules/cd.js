'use strict'
class _0x12f03e {
  constructor({
    mod: _0x3c445f,
    state: _0x10367f,
    ping: _0x58699b,
    defs: _0x403732,
    log: _0x5a8286,
    utils: _0x10c142,
    client: _0x5ab94e,
  }) {
    this._utils = _0x10c142
    this.cooldowns = new Map()
    this.itemsCooldowns = new Map()
    const _0x28f28b = (_0x43b44f) => {
        let _0x317574 = undefined
        _0x10367f.config.debugCooldowns &&
          _0x5a8286.writeDebugMessage(
            '<* S_COOLTIME_SKILL ' +
              _0x43b44f.skill.id +
              ' ' +
              Math.max(0, _0x43b44f.cooldown - _0x58699b.min) +
              ' (' +
              _0x43b44f.cooldown +
              ')'
          )
        _0x10367f.config.enabled &&
          _0x10367f.config.advancedCooldowns &&
          (!_0x10367f.loadFinish || !_0x5ab94e
            ? (_0x43b44f.cooldown = Math.max(
                0,
                _0x43b44f.cooldown + 2 * _0x58699b.max
              ))
            : (_0x43b44f.cooldown = Math.max(
                0,
                _0x43b44f.cooldown - _0x58699b.min
              )),
          (_0x317574 = true))
        return (
          this.cooldowns.set(
            _0x43b44f.skill.id,
            Date.now() + _0x43b44f.cooldown
          ),
          _0x317574
        )
      },
      _0x3fe396 = (_0x468ad9) => {
        _0x10367f.items[_0x468ad9.item] &&
          this.itemsCooldowns.set(
            _0x468ad9.item,
            Date.now() + 1000 * _0x468ad9.cooldown
          )
        _0x10367f.config.debugCooldowns &&
          _0x5a8286.writeLogMessage(
            '<- S_START_COOLTIME_ITEM ' +
              _0x468ad9.item +
              ' (' +
              _0x468ad9.cooldown +
              ')'
          )
      },
      _0xa46df3 = {
        order: -10,
        filter: { fake: false },
      }
    _0x3c445f.hook(
      ..._0x403732.getVersion('S_START_COOLTIME_SKILL'),
      _0xa46df3,
      _0x28f28b
    )
    _0x3c445f.hook(
      ..._0x403732.getVersion('S_DECREASE_COOLTIME_SKILL'),
      _0xa46df3,
      _0x28f28b
    )
    _0x3c445f.hook(
      ..._0x403732.getVersion('S_START_COOLTIME_ITEM'),
      _0xa46df3,
      _0x3fe396
    )
    _0x3c445f.hook('S_LOGIN', 'event', () => {
      this.cooldowns.clear()
      this.itemsCooldowns.clear()
    })
    _0x3c445f.majorPatchVersion >= 99 &&
      _0x3c445f.hook('TTB_S_CHANGE_HERO', 'event', () => {
        this.cooldowns.clear()
        this.itemsCooldowns.clear()
      })
  }
  ['setItemCd'](_0x5a82ca, _0x50e083) {
    this.itemsCooldowns.set(_0x5a82ca, _0x50e083)
  }
  ['itemInCd'](_0x3cb015) {
    return (
      this.itemsCooldowns.has(_0x3cb015) &&
      Date.now() <= this.itemsCooldowns.get(_0x3cb015)
    )
  }
  ['skillIdInCd'](_0x2d9b7b) {
    return (
      this.cooldowns.has(_0x2d9b7b) &&
      Date.now() < this.cooldowns.get(_0x2d9b7b)
    )
  }
  ['skillBaseInCd'](_0xc13bca) {
    for (const _0x175e0a of this.cooldowns.keys()) {
      const _0x5720cf = this.cooldowns.get(_0x175e0a)
      if (
        _0xc13bca == this._utils.getSkillBase(_0x175e0a) &&
        _0x5720cf > Date.now()
      ) {
        return true
      }
    }
    return false
  }
  ['resetCd'](_0x1a8d69) {
    for (const _0x57a16f of this.cooldowns.keys()) {
      _0x1a8d69 == this._utils.getSkillBase(_0x57a16f) &&
        this.cooldowns.delete(_0x57a16f)
    }
  }
}
module.exports = _0x12f03e
