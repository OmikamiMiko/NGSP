'use strict'
class _0x11dae6 {
  constructor({
    mod: _0x40c367,
    state: _0x367a4e,
    abn: _0x17a3f2,
    me: _0x292125,
    defs: _0x282af2,
  }) {
    let _0x348443 = []
    const _0x338951 = (_0xd061c3) => {
      _0x40c367.send(..._0x282af2.getVersion('S_CHAT'), {
        channel: 21,
        name: '',
        message: _0xd061c3,
      })
    }
    const _0x1e10c8 = () => {
      _0x348443.forEach((_0x23251d) => {
        _0x40c367.clearInterval(_0x23251d)
      })
    }
    function _0x4c3514(_0x316317) {
      _0x367a4e.notifies[_0x316317] &&
        Array.isArray(_0x367a4e.notifies[_0x316317]) &&
        _0x367a4e.notifies[_0x316317].forEach((_0x3871b7) => {
          _0x348443.push(
            _0x40c367.setInterval(() => {
              if (
                !_0x367a4e.config.notifications ||
                _0x292125.isTBA ||
                _0x367a4e.baseData.continents[_0x292125.zone] !== 'dungeon' ||
                !_0x292125.inCombat ||
                _0x17a3f2.hasIntersect(_0x3871b7.abnormies) ||
                (_0x3871b7.minLevel && _0x292125.level < _0x3871b7.minLevel)
              ) {
                return
              }
              _0x338951(_0x3871b7.message)
            }, _0x3871b7.checkInterval)
          )
        })
    }
    const _0x4e6b7d = () => {
      _0x4c3514(_0x292125.job)
      _0x4c3514('*')
    }
    _0x40c367.hook('S_RETURN_TO_LOBBY', 'event', () => {
      _0x1e10c8()
    })
    _0x40c367.hook(
      'S_LOGIN',
      'event',
      {
        order: Infinity,
        filter: { fake: false },
      },
      () => {
        _0x4e6b7d()
      }
    )
    _0x40c367.majorPatchVersion >= 99 &&
      _0x40c367.hook(
        'TTB_S_CHANGE_HERO',
        'event',
        {
          order: Infinity,
          filter: { fake: false },
        },
        () => {
          _0x4e6b7d()
        }
      )
  }
}
module.exports = _0x11dae6
