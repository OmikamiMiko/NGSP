'use strict'
class _0x2e82c3 {
  constructor({
    me: _0x1ebf9a,
    mod: _0x37e360,
    defs: _0x1c8422,
    state: _0x221528,
    area: _0x5b89fb,
  }) {
    const _0x28951a = (_0x1bbe7f) => {
        if (!_0x1ebf9a.isMe(_0x1bbe7f.target)) {
          const _0x55698b = _0x1bbe7f.reaction
          _0x55698b.enable &&
            !_0x55698b.air &&
            !_0x55698b.airChain &&
            _0x221528.config.additionalCombatFixes &&
            ((_0x221528.presetFixes.tryResyncNpcs &&
              _0x5b89fb.isMob(_0x1bbe7f.target)) ||
              (_0x221528.presetFixes.tryResyncPlayers &&
                _0x5b89fb.isPlayer(_0x1bbe7f.target))) &&
            _0x37e360.send(..._0x1c8422.getVersion('S_INSTANT_MOVE'), {
              gameId: _0x1bbe7f.target,
              loc: _0x1bbe7f.reaction.loc,
              w: _0x1bbe7f.reaction.w,
            })
        } else {
          if (
            _0x221528.presetFixes.fixFreezeAtPerfectBlock &&
            _0x221528.config.additionalCombatFixes &&
            _0x1bbe7f.superArmor
          ) {
            return (
              (_0x1bbe7f.superArmor = false), (_0x1bbe7f.superArmorId = 0), true
            )
          }
        }
      },
      _0x2d144d = (_0x128053) => {
        if (_0x1ebf9a.isMe(_0x128053.gameId)) {
          return
        }
        if (
          _0x221528.config.additionalCombatFixes &&
          _0x221528.presetFixes.tryResyncNpcs &&
          _0x5b89fb.isMob(_0x128053.gameId)
        ) {
          _0x37e360.send(..._0x1c8422.getVersion('S_INSTANT_MOVE'), {
            gameId: _0x128053.gameId,
            loc: _0x128053.loc,
            w: _0x128053.w,
          })
        }
      },
      _0xb13f76 = (_0x604592) => {
        if (
          _0x604592.stacks < 2 ||
          !_0x221528.config.additionalCombatFixes ||
          !(
            (_0x221528.presetFixes.fixDelayedBuffsNpcs &&
              _0x5b89fb.isMob(_0x604592.target)) ||
            (_0x1ebf9a.isMe(_0x604592.target) &&
              _0x221528.presetFixes.fixDelayedBuffsMe)
          )
        ) {
          return
        }
        _0x37e360.send(..._0x1c8422.getVersion('S_ABNORMALITY_END'), {
          target: _0x604592.target,
          id: _0x604592.id,
        })
        _0x37e360.send(..._0x1c8422.getVersion('S_ABNORMALITY_BEGIN'), {
          target: _0x604592.target,
          source: _0x604592.target,
          id: _0x604592.id,
          duration: _0x604592.duration,
          stacks: _0x604592.stacks,
        })
      }
    _0x37e360.hook(
      ..._0x1c8422.getVersion('S_EACH_SKILL_RESULT'),
      {
        order: 1000000,
        filter: { fake: false },
      },
      _0x28951a
    )
    _0x37e360.hook(
      ..._0x1c8422.getVersion('S_ACTION_END'),
      {
        order: 1000000,
        filter: { fake: false },
      },
      _0x2d144d
    )
    _0x37e360.hook(
      ..._0x1c8422.getVersion('S_ABNORMALITY_REFRESH'),
      {
        order: 99999999,
        filter: { fake: null },
      },
      _0xb13f76
    )
  }
}
module.exports = _0x2e82c3
