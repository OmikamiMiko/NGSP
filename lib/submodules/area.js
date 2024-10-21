'use strict'
const { Vec3: _0x37873f } = require('tera-data-parser').types
class _0x3b60ef {
  constructor({ mod: _0x5e12d4, defs: _0x4002ea, me: _0x12a318 }) {
    this.entities = new Map()
    const _0xeeee24 = new Map()
    _0xeeee24.set(713, [81301, 81359, 81305, 81307])
    const _0x511f53 = new Map()
    _0x511f53.set(467, [46704])
    _0x511f53.set(767, [46704])
    const _0x48841d = (_0x5eacec, _0x234f49) => {
        if (this.entities.has(_0x234f49.gameId)) {
          const _0x21d3cf = _0x234f49.loc.addN(_0x234f49.dest).scale(0.5)
          this.entities.set(_0x234f49.gameId, {
            type: _0x5eacec,
            loc: _0x21d3cf,
            w: _0x234f49.w,
          })
        }
      },
      _0x499d25 = (_0x425eab, _0x4e3b21) => {
        if (
          _0x425eab === 1 &&
          (_0x4e3b21.aggressive ||
            _0x4e3b21.relation == 12 ||
            (_0x4e3b21.relation == 10 && _0x4e3b21.spawnType == 1))
        ) {
          const _0x5b1195 = _0xeeee24.get(_0x4e3b21.huntingZoneId),
            _0xa1c1c3 = _0x511f53.get(_0x4e3b21.huntingZoneId)
          if (_0x5b1195 && _0x5b1195.indexOf(_0x4e3b21.templateId) !== -1) {
            this.entities.set(_0x4e3b21.gameId, {
              type: 3,
              loc: _0x4e3b21.loc,
              w: _0x4e3b21.w,
            })
          } else {
            if (_0xa1c1c3 && _0xa1c1c3.indexOf(_0x4e3b21.templateId) !== -1) {
              this.entities.set(_0x4e3b21.gameId, {
                type: 4,
                loc: _0x4e3b21.loc,
                w: _0x4e3b21.w,
              })
            } else {
              this.entities.set(_0x4e3b21.gameId, {
                type: _0x425eab,
                loc: _0x4e3b21.loc,
                w: _0x4e3b21.w,
              })
            }
          }
          _0x4e3b21.replaceId !== BigInt(0) &&
            this.entities.delete(_0x4e3b21.replaceId)
        } else {
          if (0 === _0x425eab) {
            for (
              let _0x473489 = 0;
              _0x473489 < _0x12a318.partyMembers.length;
              _0x473489++
            ) {
              if (
                _0x12a318.partyMembers[_0x473489].sid === _0x4e3b21.serverId &&
                _0x12a318.partyMembers[_0x473489].pid === _0x4e3b21.playerId
              ) {
                _0x12a318.partyMembers[_0x473489].gameId = _0x4e3b21.gameId
              }
            }
            this.entities.set(_0x4e3b21.gameId, {
              type: _0x425eab,
              loc: _0x4e3b21.loc,
              w: _0x4e3b21.w,
            })
          }
        }
      },
      _0x7581f8 = (_0x59a3e9) => {
        this.entities.delete(_0x59a3e9)
      },
      _0x5551b9 = (_0x16e98a) => {
        if (!this.entities.has(_0x16e98a.gameId)) {
          return
        }
        const _0x277d1d = this.entities.get(_0x16e98a.gameId)
        _0x277d1d.w = _0x16e98a.w
        this.entities.set(_0x16e98a.gameId, _0x277d1d)
      },
      _0x30d536 = (_0x1aaae5) => {
        if (!this.entities.has(_0x1aaae5.target)) {
          return
        }
        let _0x16762a = this.entities.get(_0x1aaae5.target)
        if (_0x16762a.loc && _0x1aaae5.reaction.enable) {
          let _0x5b15fe = 0
          for (let _0x5cb8f5 in _0x1aaae5.reaction.animSeq) {
            _0x5b15fe += _0x1aaae5.reaction.animSeq[_0x5cb8f5].distance
          }
          _0x5b15fe *= -1
          _0x16762a.loc.x += Math.cos(_0x16762a.w) * _0x5b15fe
          _0x16762a.loc.y += Math.sin(_0x16762a.w) * _0x5b15fe
          this.entities.set(_0x1aaae5.target, _0x16762a)
        }
      },
      _0x3fbe27 = (_0x43408d) => {
        if (!this.entities.has(_0x43408d.gameId)) {
          return
        }
        let _0x206c13 = this.entities.get(_0x43408d.gameId)
        _0x206c13.loc = _0x43408d.loc
        _0x206c13.w = _0x43408d.w
        if (_0x43408d.animSeq) {
          let _0x2b0e78 = 0
          for (let _0x461b8f in _0x43408d.animSeq) {
            _0x2b0e78 += _0x43408d.animSeq[_0x461b8f].distance
          }
          _0x206c13.loc.x += Math.cos(_0x206c13.w) * _0x2b0e78
          _0x206c13.loc.y += Math.sin(_0x206c13.w) * _0x2b0e78
        } else {
          _0x43408d.dest &&
            _0x43408d.dest.x != 0 &&
            _0x43408d.dest.y != 0 &&
            _0x43408d.dest.z != 0 &&
            (_0x206c13.loc = _0x43408d.loc.addN(_0x43408d.dest).scale(0.5))
        }
        this.entities.set(_0x43408d.gameId, _0x206c13)
      },
      _0x4f051b = (_0x4f876c) => {
        if (!this.entities.has(_0x4f876c.target)) {
          return
        }
        const _0x5bf32a = this.entities.get(_0x4f876c.target)
        _0x5bf32a.loc = _0x5bf32a.loc.add(
          new _0x37873f(_0x4f876c.distance, 0, 0).rotate(_0x5bf32a.w)
        )
        this.entities.set(_0x4f876c.target, _0x5bf32a)
      },
      _0x58c3a3 = (_0x2e2cfa) => {
        if (!this.entities.has(_0x2e2cfa.target)) {
          return
        }
        const _0x4a29aa = this.entities.get(_0x2e2cfa.target)
        _0x4a29aa.loc = _0x2e2cfa.loc
        this.entities.set(_0x2e2cfa.target, _0x4a29aa)
      },
      _0x15a8a2 = {
        order: -999999,
        filter: { fake: false },
      }
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_NPC_LOCATION'),
      _0x15a8a2,
      _0x48841d.bind(null, 1)
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_USER_LOCATION'),
      _0x15a8a2,
      _0x48841d.bind(null, 0)
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_SPAWN_NPC'),
      _0x15a8a2,
      _0x499d25.bind(null, 1)
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_SPAWN_USER'),
      _0x15a8a2,
      _0x499d25.bind(null, 0)
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_DESPAWN_NPC'),
      _0x15a8a2,
      _0x7581f8
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_DESPAWN_USER'),
      _0x15a8a2,
      _0x7581f8
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_CREATURE_ROTATE'),
      _0x15a8a2,
      _0x5551b9
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_EACH_SKILL_RESULT'),
      _0x15a8a2,
      _0x30d536
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_ACTION_STAGE'),
      _0x15a8a2,
      _0x3fbe27
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_ACTION_END'),
      _0x15a8a2,
      _0x3fbe27
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_STICK_TO_USER_START'),
      _0x15a8a2,
      _0x4f051b
    )
    _0x5e12d4.hook(
      ..._0x4002ea.getVersion('S_STICK_TO_USER_END'),
      _0x15a8a2,
      _0x58c3a3
    )
    _0x5e12d4.hook('S_LOAD_TOPO', 'event', () => {
      this.entities.clear()
    })
  }
  ['getTypeByGameId'](_0x54e789) {
    return this.entities.has(_0x54e789) ? this.entities.get(_0x54e789).type : -1
  }
  ['getLocation'](_0x42d8e3) {
    return this.entities.has(_0x42d8e3) ? this.entities.get(_0x42d8e3) : null
  }
  ['isMob'](_0x5d0166) {
    if (!this.entities.has(_0x5d0166)) {
      return false
    }
    let _0x347491 = this.entities.get(_0x5d0166)
    return _0x347491.type === 1 || _0x347491.type === 3 || _0x347491.type === 4
  }
  ['isPlayer'](_0x479216) {
    return (
      this.entities.has(_0x479216) && 0 === this.entities.get(_0x479216).type
    )
  }
}
module.exports = _0x3b60ef
