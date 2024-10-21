'use strict'
class _0x1a73d6 {
  constructor({
    mod: _0x379655,
    me: _0x3d54c7,
    defs: _0x149c43,
    ping: _0x10d238,
    utils: _0x1a3374,
    state: _0x585347,
  }) {
    this._utils = _0x1a3374
    this._state = _0x585347
    this.jittercompEndTime = -1
    this.startedSkillBase = -1
    this.startedSkillTime = 0
    this.awaitFirstStage = false
    this.lastEmulatedStageTime = 0
    this.lastEmulatedStage = -1
    this.lastEmulatedSkillId = -1
    this.delayNext = 0
    this.avgJitter = 0
    this.maxJitter = 0
    this.minJitter = 0
    this.jitterHistory = []
    this._state.on('stateChanged', () => {
      this.cleanup()
    })
    const _0x43cdeb = (_0x5c7fde) => {
        if (
          !this._state.config.enabled ||
          !_0x3d54c7.isMe(_0x5c7fde.gameId) ||
          this._state.sharedSkills[_0x5c7fde.skill.id]
        ) {
          return
        }
        _0x5c7fde.stage === 0 &&
          ((this.awaitFirstStage = true),
          (this.jittercompEndTime = -1),
          (this.startedSkillBase = this._utils.getSkillBase(
            _0x5c7fde.skill.id
          )),
          (this.startedSkillTime = Date.now()))
        this.lastEmulatedStageTime = Date.now()
        this.lastEmulatedStage = _0x5c7fde.stage
        this.lastEmulatedSkillId = _0x5c7fde.skill.id
      },
      _0x4f662a = (_0x368ab8) => {
        if (
          !this._state.config.enabled ||
          !_0x3d54c7.isMe(_0x368ab8.gameId) ||
          this._state.sharedSkills[_0x368ab8.skill.id]
        ) {
          return
        }
        let _0x374db3 = -1
        this.lastServerStage = _0x368ab8.stage
        this.awaitFirstStage &&
        _0x368ab8.stage == 0 &&
        this._utils.getSkillBase(_0x368ab8.skill.id) == this.startedSkillBase
          ? ((this.awaitFirstStage = false),
            (_0x374db3 = Date.now() - this.startedSkillTime - _0x10d238.min))
          : _0x368ab8.stage == this.lastEmulatedStage &&
            _0x368ab8.skill.id == this.lastEmulatedSkillId
          ? (_0x374db3 =
              Date.now() - this.lastEmulatedStageTime - _0x10d238.min)
          : this.cleanup()
        if (_0x374db3 > 0) {
          _0x374db3 = Math.round(_0x374db3)
          this.jitterHistory.push(_0x374db3)
          if (
            this.jitterHistory.length > this._state.config.jitterHistoryMax
          ) {
            this.jitterHistory.shift()
          }
          this.delayNext += _0x374db3
          const {
            avgValue: _0x15ce35,
            maxValue: _0x3d935b,
            minValue: _0x2232a5,
          } = this._utils.getStatsFromArray(
            this.jitterHistory,
            0.0500000000001819
          )
          this.minJitter = _0x2232a5
          this.avgJitter = _0x15ce35
          this.maxJitter = _0x3d935b
        }
      },
      _0x556115 = (_0x3bbc12) => {
        if (
          !this._state.config.enabled ||
          !_0x3d54c7.isMe(_0x3bbc12.gameId) ||
          this._state.sharedSkills[_0x3bbc12.skill.id]
        ) {
          return
        }
        if (_0x3bbc12.type >= 99) {
          this.cleanup()
        } else {
          ;(_0x3bbc12.type == 0 ||
            _0x3bbc12.type == 1 ||
            _0x3bbc12.type == 10 ||
            _0x3bbc12.type == 51) &&
            (this.jittercompEndTime = Date.now() + this.delayNext)
        }
      }
    _0x379655.hook(
      ..._0x149c43.getVersion('S_ACTION_STAGE'),
      {
        order: -7,
        filter: { fake: true },
      },
      _0x43cdeb
    )
    _0x379655.hook(
      ..._0x149c43.getVersion('S_ACTION_STAGE'),
      {
        order: -99,
        filter: { fake: false },
      },
      _0x4f662a
    )
    _0x379655.hook(
      ..._0x149c43.getVersion('S_ACTION_END'),
      {
        order: -7,
        filter: { fake: true },
      },
      _0x556115
    )
  }
  ['cleanup']() {
    this.delayNext = 0
    this.jittercompEndTime = -1
    this.lastEmulatedSkillId = -1
    this.lastEmulatedStage = -1
    this.lastServerStage = -1
    this.awaitFirstStage = false
  }
  ['consumeDelay']() {
    let _0x4ddb88 = [0, 0]
    this.jittercompEndTime > 0
      ? (_0x4ddb88[0] =
          Date.now() < this.jittercompEndTime
            ? Math.max(0, this.jittercompEndTime - Date.now())
            : 0)
      : (_0x4ddb88[0] = this.delayNext)
    this.lastEmulatedStage > this.lastServerStage &&
      (_0x4ddb88[1] =
        this.lastEmulatedStage >= 1
          ? Math.abs(this.avgJitter)
          : Math.abs(this.minJitter))
    const { lastEmulatedStage: _0xe72dd7, lastServerStage: _0x547fd9 } = this
    return (
      this.cleanup(),
      {
        lastEmulatedStage: _0xe72dd7,
        lastServerStage: _0x547fd9,
        gatheredJitter: _0x4ddb88[0],
        predictedJitter: _0x4ddb88[1],
      }
    )
  }
  ['getState']() {
    return this.delayNext
  }
  ['getMaxState']() {
    return this.maxJitter
  }
}
module.exports = _0x1a73d6
