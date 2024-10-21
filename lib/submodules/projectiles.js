'use strict'
const _0x1caa01 = 220
class _0x1048b5 {
  constructor({
    mod: _0x2d161b,
    defs: _0x238589,
    state: _0xafe6bd,
    ping: _0x35eb9c,
  }) {
    _0x2d161b.hook(
      ..._0x238589.getVersion('S_START_USER_PROJECTILE'),
      {
        order: 999999,
        filter: { fake: false },
      },
      (_0x5c41bd) => {
        let _0x3aff7d = undefined
        if (
          _0x5c41bd.distance > 1 &&
          _0xafe6bd.config.enabled &&
          _0xafe6bd.config.advancedProjectiles
        ) {
          const _0x50f1e2 = _0x5c41bd.distance / _0x5c41bd.speed,
            _0x5b8ba0 = _0x50f1e2 - Math.min(_0x35eb9c.min, _0x1caa01) / 1000
          _0x5b8ba0 > 0 &&
            ((_0x5c41bd.speed = _0x5c41bd.distance / _0x5b8ba0),
            (_0x3aff7d = true))
        }
        return _0x3aff7d
      }
    )
  }
}
module.exports = _0x1048b5
