'use strict'
const _0x1187d3 = 10
class _0x69d903 {
  constructor({
    mod: _0x277fc9,
    ping: _0x3d4962,
    defs: _0x12d42b,
    state: _0x1edaf7,
    utils: _0x794b9,
  }) {
    let _0x576a66 = new Map()
    const _0x24de90 = (_0xda6c14, _0x11a663, _0x42441b) => {
        const { huntingZoneId: _0x470fa9, id: _0x5e5ac4 } = _0xda6c14
        !_0x1edaf7.napCache[_0x470fa9] && (_0x1edaf7.napCache[_0x470fa9] = {})
        !_0x1edaf7.napCache[_0x470fa9][_0x11a663] &&
          (_0x1edaf7.napCache[_0x470fa9][_0x11a663] = {})
        !_0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4] &&
          (_0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4] = {
            length: 0,
            history: [],
          })
        _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history.push(
          _0x42441b
        )
        _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history.length >
          _0x1187d3 &&
          _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history.shift()
        _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history.length >= 2
          ? (_0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].length =
              _0x794b9.getQuantile(
                _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history,
                0.5
              ))
          : (_0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].length =
              _0x1edaf7.napCache[_0x470fa9][_0x11a663][_0x5e5ac4].history[0])
      },
      _0xe21fad = (_0x3852a7, _0xc8f9aa, _0x1404c5) => {
        let _0x57f091 = _0x794b9.getSafe(_0x1edaf7.napCache, [
          _0x3852a7,
          _0xc8f9aa,
          _0x1404c5,
        ])
        if (!_0x57f091) {
          return 0
        }
        return _0x57f091.length
      },
      _0x1de46b = (_0x23f8fa) => {
        if (!_0x23f8fa.skill.npc) {
          return
        }
        let _0xb41842 = _0x576a66.get(_0x23f8fa.id)
        _0xb41842 && _0x23f8fa.stage > _0xb41842.stage
          ? _0x576a66.set(_0x23f8fa.id, {
              time: _0xb41842.time,
              speed: _0x23f8fa.speed,
              stage: _0x23f8fa.stage,
            })
          : _0x576a66.set(_0x23f8fa.id, {
              time: Date.now(),
              speed: _0x23f8fa.speed,
              stage: _0x23f8fa.stage,
            })
        if (!_0x1edaf7.config.advancedNpcsAttacks) {
          return
        }
        let _0x49acdc = 0
        _0x23f8fa.animSeq.forEach((_0x50f42d) => {
          _0x49acdc += _0x50f42d.duration
        })
        const _0x4719fc = _0xe21fad(
            _0x23f8fa.skill.huntingZoneId,
            _0x23f8fa.templateId,
            _0x23f8fa.skill.id
          ),
          _0x5c4936 = _0x49acdc !== 0 ? _0x49acdc : _0x4719fc
        if (_0x5c4936 > 0 && _0x5c4936 > _0x3d4962.avg) {
          let _0xee2051 =
              _0x5c4936 - (_0x3d4962.min + (_0x3d4962.avg - _0x3d4962.min) / 3),
            _0x5e854d = (_0x5c4936 / _0xee2051) * _0x23f8fa.speed,
            _0x176abb = (_0x5c4936 / _0xee2051) * _0x23f8fa.projectileSpeed
          return (
            (_0x23f8fa.speed = _0x5e854d),
            (_0x23f8fa.projectileSpeed = _0x176abb),
            true
          )
        }
      },
      _0x324efc = (_0xc0fef8) => {
        if (!_0xc0fef8.skill.npc) {
          return
        }
        let _0x2da0a5 = _0x576a66.get(_0xc0fef8.id)
        if (_0x2da0a5) {
          let _0x3089c1 = (Date.now() - _0x2da0a5.time) / _0x2da0a5.speed
          _0x576a66.delete(_0xc0fef8.id)
          if (_0xc0fef8.type != 0) {
            return
          }
          _0x24de90(_0xc0fef8.skill, _0xc0fef8.templateId, _0x3089c1)
        }
      },
      _0x1e6a98 = (_0x564f18) => {
        if (!_0x1edaf7.config.advancedNpcsAttacks) {
          return
        }
        return (
          (_0x564f18.time = Math.max(_0x564f18.time - _0x3d4962.min, 0)), true
        )
      }
    _0x277fc9.hook(
      ..._0x12d42b.getVersion('S_ACTION_STAGE'),
      {
        order: 999999,
        filter: { fake: false },
      },
      _0x1de46b
    )
    _0x277fc9.hook(
      ..._0x12d42b.getVersion('S_ACTION_END'),
      {
        order: 999999,
        filter: { fake: false },
      },
      _0x324efc
    )
    _0x277fc9.hook(
      ..._0x12d42b.getVersion('S_CREATURE_ROTATE'),
      {
        order: 999999,
        filter: { fake: false },
      },
      _0x1e6a98
    )
    _0x277fc9.hook('S_LOAD_TOPO', 'event', () => {
      _0x576a66.clear()
    })
  }
}
module.exports = _0x69d903
