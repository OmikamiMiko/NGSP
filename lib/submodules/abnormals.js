'use strict'
const _0x2134ab = 28,
  _0xa679bc = 2147483647
class _0x3df5bc {
  constructor({
    defs: _0x1f5dff,
    jitter: _0x367920,
    log: _0x485739,
    me: _0x4d25d4,
    mod: _0x730066,
    ping: _0x54aba7,
    state: _0x38a646,
    utils: _0x2e773b,
  }) {
    this['_mod'] = _0x730066
    this['_ping'] = _0x54aba7
    this['_def'] = _0x1f5dff
    this['_me'] = _0x4d25d4
    this['_state'] = _0x38a646
    this['_utils'] = _0x2e773b
    this['_logger'] = _0x485739
    this['_ping'] = _0x54aba7
    this['_jitter'] = _0x367920
    this.abnormies = {}
    const _0x3d0055 = () => {
        this.removeAll()
      },
      _0x5975b3 = (_0x39f4ea) => {
        if (!this['_me'].isMe(_0x39f4ea.gameId)) {
          return
        }
        !_0x39f4ea.alive && this.removeAll()
      },
      _0x24f0f4 = (_0x5671c8, _0x26e8f9) => {
        if (!this['_me'].isMe(_0x26e8f9.target)) {
          return
        }
        this['_state'].config.debugAbnormals &&
          this['_logger'].writeDebugMessage(
            this['_state'].blockedAbnormals[_0x26e8f9.id] === true
              ? '<X'
              : '<*',
            _0x5671c8,
            _0x26e8f9.id,
            _0x26e8f9.duration,
            _0x26e8f9.stacks
          )
        if (this['_state'].config.enabled) {
          if (this['_state'].blockedAbnormals[_0x26e8f9.id]) {
            return false
          }
          !this['_state'].doNotModify[_0x26e8f9.id] &&
            _0x26e8f9.duration <= _0xa679bc &&
            this['_state'].config.advancedAbnormals &&
            (_0x26e8f9.duration = BigInt(
              Math.round(
                Math.max(Number(_0x26e8f9.duration) - this['_ping'].min, 0)
              )
            ))
        }
        if (
          (this.exists(_0x26e8f9.id) && 'S_ABNORMALITY_BEGIN' === _0x5671c8) ||
          (!this.exists(_0x26e8f9.id) && 'S_ABNORMALITY_REFRESH' === _0x5671c8)
        ) {
          return (
            this.add(_0x26e8f9.id, _0x26e8f9.duration, _0x26e8f9.stacks), false
          )
        }
        return (
          this['_add'](_0x26e8f9.id, _0x26e8f9.duration, _0x26e8f9.stacks), true
        )
      },
      _0x5537dd = (_0x27a774) => {
        if (!this['_me'].isMe(_0x27a774.target)) {
          return
        }
        let _0x318a38 = false
        if (this['_state'].config.enabled) {
          if (this['_state'].blockedAbnormals[_0x27a774.id]) {
            _0x318a38 = !(
              this.exists(_0x27a774.id) &&
              BigInt(Date.now()) < this.abnormies[_0x27a774.id].endTimestamp &&
              this.abnormies[_0x27a774.id].ignoreAcceptTimestamp < Date.now()
            )
          } else {
            if (!this.exists(_0x27a774.id)) {
              _0x318a38 = true
            }
          }
        }
        if (this['_state'].config.debugAbnormals) {
          let _0x1347e9 =
            this['_state'].blockedAbnormals[_0x27a774.id] === true
              ? _0x318a38
                ? '<X'
                : '<R'
              : '<-'
          this['_logger'].writeDebugMessage(
            _0x1347e9,
            'S_ABNORMALITY_END',
            _0x27a774.id
          )
        }
        if (_0x318a38) {
          return false
        }
        this['_remove'](_0x27a774.id)
      }
    this['_mod'].hook(
      ...this['_def'].getVersion('S_ABNORMALITY_BEGIN'),
      { order: -50 },
      _0x24f0f4.bind(null, 'S_ABNORMALITY_BEGIN')
    )
    this['_mod'].hook(
      ...this['_def'].getVersion('S_ABNORMALITY_REFRESH'),
      { order: -50 },
      _0x24f0f4.bind(null, 'S_ABNORMALITY_REFRESH')
    )
    this['_mod'].hook(
      ...this['_def'].getVersion('S_ABNORMALITY_END'),
      { order: -50 },
      _0x5537dd
    )
    this['_mod'].hook(...this['_def'].getVersion('S_CREATURE_LIFE'), _0x5975b3)
    this['_mod'].hook('S_RETURN_TO_LOBBY', 'event', _0x3d0055)
  }
  ['exists'](_0x3fe9c8) {
    return !!this.abnormies[_0x3fe9c8]
  }
  ['getStacks'](_0x3c05b0) {
    return this.abnormies[_0x3c05b0] ? this.abnormies[_0x3c05b0].stacks : 0
  }
  ['inMap'](_0x4f7d33) {
    for (let _0x3b07d4 in this.abnormies) {
      if (_0x4f7d33[_0x3b07d4]) {
        return true
      }
    }
    return false
  }
  ['getIntersect'](_0x292716) {
    let _0x3c8824 = Array.isArray(_0x292716) ? _0x292716 : [_0x292716],
      _0x108384 = []
    for (let _0x80029 of _0x3c8824) {
      if (this.abnormies[_0x80029]) {
        _0x108384.push(_0x80029)
      }
    }
    return _0x108384
  }
  ['hasIntersect'](_0x21366c) {
    let _0x14bbc8 = Array.isArray(_0x21366c) ? _0x21366c : [_0x21366c]
    for (let _0x3ea040 of _0x14bbc8) {
      if (this.abnormies[_0x3ea040]) {
        return true
      }
    }
    return false
  }
  ['add'](_0x343384, _0x4862bc, _0x352ed7, _0x528114 = 0, _0x236a0f) {
    let _0x471397 =
      'bigint' === typeof _0x4862bc ? _0x4862bc : BigInt(Math.round(_0x4862bc))
    this.abnormies[_0x343384] &&
      'removePending' === this.abnormies[_0x343384].status &&
      (this['_mod'].clearTimeout(this.abnormies[_0x343384].removeTimer),
      this['_remove'](_0x343384))
    let _0x566de1 = null
    _0x236a0f
      ? (_0x566de1 = this['_def'].getVersion('S_ABNORMALITY_BEGIN'))
      : (_0x566de1 = this.abnormies[_0x343384]
          ? this['_def'].getVersion('S_ABNORMALITY_REFRESH')
          : this['_def'].getVersion('S_ABNORMALITY_BEGIN'))
    this['_mod'].setTimeout(() => {
      this['_state'].config.debugAbnormals &&
        this['_logger'].writeDebugMessage(
          '<*',
          _0x566de1[0],
          _0x343384,
          _0x471397,
          _0x352ed7
        )
      const _0x69301d = {
        id: _0x343384,
        duration: _0x471397,
      }
      _0x69301d.target = this['_me'].gameId
      _0x69301d.source = this['_me'].gameId
      _0x69301d.stacks = _0x352ed7
      this['_mod'].send(..._0x566de1, _0x69301d)
      this['_add'](_0x343384, _0x471397, _0x352ed7)
    }, _0x528114)
  }
  ['remove'](_0x5f040c, _0xb855c6 = 0) {
    if (!this.exists(_0x5f040c)) {
      return
    }
    this.abnormies[_0x5f040c].status = 'removePending'
    this.abnormies[_0x5f040c].removeTimer = this['_mod'].setTimeout(() => {
      if (this['_state'].config.debugAbnormals) {
        this['_logger'].writeDebugMessage('<* S_ABNORMALITY_END', _0x5f040c)
      }
      const _0x89abdd = { id: _0x5f040c }
      _0x89abdd.target = this['_me'].gameId
      this['_mod'].send(
        ...this['_def'].getVersion('S_ABNORMALITY_END'),
        _0x89abdd
      )
      this['_remove'](_0x5f040c)
    }, _0xb855c6)
  }
  ['removeAll']() {
    for (let _0x3759a1 in this.abnormies) {
      this['_mod'].clearTimeout(this.abnormies[_0x3759a1].removeTimer)
      this.remove(_0x3759a1)
    }
  }
  ['_add'](_0x55f2da, _0x363a29, _0x2ca52a) {
    !this.abnormies[_0x55f2da] && (this.abnormies[_0x55f2da] = {})
    this['_mod'].clearTimeout(this.abnormies[_0x55f2da].endTimer)
    this.abnormies[_0x55f2da].removeTimer = false
    this.abnormies[_0x55f2da].status = 'normal'
    this.abnormies[_0x55f2da].stacks = _0x2ca52a
    this.abnormies[_0x55f2da].duration = _0x363a29
    this.abnormies[_0x55f2da].startTimestamp = Date.now()
    this.abnormies[_0x55f2da].endTimestamp = BigInt(Date.now()) + _0x363a29
    this.abnormies[_0x55f2da].ignoreAcceptTimestamp =
      Date.now() +
      (this['_ping'].min + (this['_ping'].avg - this['_ping'].min) / 2) +
      this['_jitter'].minJitter +
      _0x2134ab
    this.abnormies[_0x55f2da].endTimer =
      _0x363a29 <= _0xa679bc
        ? this['_mod'].setTimeout(() => {
            this.remove(_0x55f2da)
          }, Number(_0x363a29))
        : true
  }
  ['_remove'](_0x1c4a6f) {
    if (!this.abnormies[_0x1c4a6f]) {
      return
    }
    this['_mod'].clearTimeout(this.abnormies[_0x1c4a6f].endTimer)
    if (this['_state'].config.enabled) {
      let _0x337246 = this['_state'].aspdAbnList[_0x1c4a6f]
      if (_0x337246) {
        switch (_0x337246.type) {
          case 24: {
            let _0x3ae7fb = _0x337246.method,
              _0x172bd5 = _0x337246.value,
              _0x4c4246 = this.abnormies[_0x1c4a6f].stacks || 1
            switch (_0x3ae7fb) {
              case 2:
                _0x172bd5 *= _0x4c4246
                break
              case 3:
                _0x172bd5 = (_0x172bd5 - 1) * _0x4c4246 + 1
                break
            }
            this['_me'].changeAspd(
              _0x172bd5,
              _0x3ae7fb,
              true,
              'Emulation: abnormal end'
            )
            break
          }
        }
      }
    }
    delete this.abnormies[_0x1c4a6f]
  }
}
module.exports = _0x3df5bc
