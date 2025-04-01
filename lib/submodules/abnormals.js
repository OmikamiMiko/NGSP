'use strict'
const _28 = 28,
  maxInt = 2147483647
class abnormalClass {
  constructor({
    defs: defsObject,
    jitter: jitterObject,
    log: logObject,
    me: meObject,
    mod: modObject,
    ping: pingObject,
    state: stateObject,
    utils: utilsObject,
  }) {
    this._mod = modObject
    this._ping = pingObject
    this._def = defsObject
    this._me = meObject
    this._state = stateObject
    this._utils = utilsObject
    this._logger = logObject
    this._ping = pingObject
    this._jitter = jitterObject
    this.abnormies = {}
    const clear = () => {
        this.removeAll()
      },
      OnServerCreatureLife = (packet) => {
        if (!this._me.isMe(packet.gameId)) {
          return
        }
        !packet.alive && this.removeAll()
      },
      OnServerAbnormalityBeginOrRefresh = (opCode, abnormalityPacket) => {
        if (!this._me.isMe(abnormalityPacket.target)) {
          return
        }
        this._state.config.debugAbnormals &&
          this._logger.writeDebugMessage(
            this._state.blockedAbnormals[abnormalityPacket.id] === true
              ? '<X'
              : '<*',
            opCode,
            abnormalityPacket.id,
            abnormalityPacket.duration,
            abnormalityPacket.stacks
          )
        if (this._state.config.enabled) {
          if (this._state.blockedAbnormals[abnormalityPacket.id]) {
            return false
          }
          !this._state.doNotModify[abnormalityPacket.id] &&
            abnormalityPacket.duration <= maxInt &&
            this._state.config.advancedAbnormals &&
            (abnormalityPacket.duration = BigInt(
              Math.round(
                Math.max(Number(abnormalityPacket.duration) - this._ping.min, 0)
              )
            ))
        }
        if (
          (this.exists(abnormalityPacket.id) && 'S_ABNORMALITY_BEGIN' === opCode) ||
          (!this.exists(abnormalityPacket.id) && 'S_ABNORMALITY_REFRESH' === opCode)
        ) {
          return (
            this.add(abnormalityPacket.id, abnormalityPacket.duration, abnormalityPacket.stacks), false
          )
        }
        return (
          this._add(abnormalityPacket.id, abnormalityPacket.duration, abnormalityPacket.stacks), true
        )
      },
      OnServerAbnormalityEnd = (packet) => {
        if (!this._me.isMe(packet.target)) {
          return
        }
        let isAbnormEndBlocked = false
        if (this._state.config.enabled) {
          if (this._state.blockedAbnormals[packet.id]) {
            isAbnormEndBlocked = !(
              this.exists(packet.id) &&
              BigInt(Date.now()) < this.abnormies[packet.id].endTimestamp &&
              this.abnormies[packet.id].ignoreAcceptTimestamp < Date.now()
            )
          } else {
            if (!this.exists(packet.id)) {
              isAbnormEndBlocked = true
            }
          }
        }
        if (this._state.config.debugAbnormals) {
          let message =
            this._state.blockedAbnormals[packet.id] === true
              ? isAbnormEndBlocked
                ? '<X'
                : '<R'
              : '<-'
          this._logger.writeDebugMessage(
            message,
            'S_ABNORMALITY_END',
            packet.id
          )
        }
        if (isAbnormEndBlocked) {
          return false
        }
        this._remove(packet.id)
      }
    this._mod.hook(
      ...this._def.getVersion('S_ABNORMALITY_BEGIN'),
      { order: -50 },
      OnServerAbnormalityBeginOrRefresh.bind(null, 'S_ABNORMALITY_BEGIN')
    )
    this._mod.hook(
      ...this._def.getVersion('S_ABNORMALITY_REFRESH'),
      { order: -50 },
      OnServerAbnormalityBeginOrRefresh.bind(null, 'S_ABNORMALITY_REFRESH')
    )
    this._mod.hook(
      ...this._def.getVersion('S_ABNORMALITY_END'),
      { order: -50 },
      OnServerAbnormalityEnd
    )
    this._mod.hook(...this._def.getVersion('S_CREATURE_LIFE'), OnServerCreatureLife)
    this._mod.hook('S_RETURN_TO_LOBBY', 'event', clear)
  }
  ['exists'](abnormId) {
    return !!this.abnormies[abnormId]
  }
  ['getStacks'](abnormId) {
    return this.abnormies[abnormId] ? this.abnormies[abnormId].stacks : 0
  }
  ['inMap'](abnormId) {
    for (let abnorm in this.abnormies) {
      if (abnormId[abnorm]) {
        return true
      }
    }
    return false
  }
  ['getIntersect'](input) {
    let arrayObject = Array.isArray(input) ? input : [input],
      result = []
    for (let obj of arrayObject) {
      if (this.abnormies[obj]) {
        result.push(obj)
      }
    }
    return result
  }
  ['hasIntersect'](input) {
    let inputArray = Array.isArray(input) ? input : [input]
    for (let obj of inputArray) {
      if (this.abnormies[obj]) {
        return true
      }
    }
    return false
  }
  ['add'](abnormId, duration, stacks, delay = 0, isAbnormalityBegun) {
    let durationInt =
      'bigint' === typeof duration ? duration : BigInt(Math.round(duration))
    this.abnormies[abnormId] &&
      'removePending' === this.abnormies[abnormId].status &&
      (this._mod.clearTimeout(this.abnormies[abnormId].removeTimer),
      this._remove(abnormId))
    let serverAbnormalityBeginDef = null
    isAbnormalityBegun
      ? (serverAbnormalityBeginDef = this._def.getVersion('S_ABNORMALITY_BEGIN'))
      : (serverAbnormalityBeginDef = this.abnormies[abnormId]
          ? this._def.getVersion('S_ABNORMALITY_REFRESH')
          : this._def.getVersion('S_ABNORMALITY_BEGIN'))
    this._mod.setTimeout(() => {
      this._state.config.debugAbnormals &&
        this._logger.writeDebugMessage(
          '<*',
          serverAbnormalityBeginDef[0],
          abnormId,
          durationInt,
          stacks
        )
      const fakeAbnormPacket = {
        id: abnormId,
        duration: durationInt,
      }
      fakeAbnormPacket.target = this._me.gameId
      fakeAbnormPacket.source = this._me.gameId
      fakeAbnormPacket.stacks = stacks
      this._mod.send(...serverAbnormalityBeginDef, fakeAbnormPacket)
      this._add(abnormId, durationInt, stacks)
    }, delay)
  }
  ['remove'](abnormId, delay = 0) {
    if (!this.exists(abnormId)) {
      return
    }
    this.abnormies[abnormId].status = 'removePending'
    this.abnormies[abnormId].removeTimer = this._mod.setTimeout(() => {
      if (this._state.config.debugAbnormals) {
        this._logger.writeDebugMessage('<* S_ABNORMALITY_END', abnormId)
      }
      const abnormPacket = { id: abnormId }
      abnormPacket.target = this._me.gameId
      this._mod.send(
        ...this._def.getVersion('S_ABNORMALITY_END'),
        abnormPacket
      )
      this._remove(abnormId)
    }, delay)
  }
  ['removeAll']() {
    for (let abnorm in this.abnormies) {
      this._mod.clearTimeout(this.abnormies[abnorm].removeTimer)
      this.remove(abnorm)
    }
  }
  ['_add'](abnormId, duration, stacks) {
    !this.abnormies[abnormId] && (this.abnormies[abnormId] = {})
    this._mod.clearTimeout(this.abnormies[abnormId].endTimer)
    this.abnormies[abnormId].removeTimer = false
    this.abnormies[abnormId].status = 'normal'
    this.abnormies[abnormId].stacks = stacks
    this.abnormies[abnormId].duration = duration
    this.abnormies[abnormId].startTimestamp = Date.now()
    this.abnormies[abnormId].endTimestamp = BigInt(Date.now()) + duration
    this.abnormies[abnormId].ignoreAcceptTimestamp =
      Date.now() +
      (this._ping.min + (this._ping.avg - this._ping.min) / 2) +
      this._jitter.minJitter +
      _28
    this.abnormies[abnormId].endTimer =
      duration <= maxInt
        ? this._mod.setTimeout(() => {
            this.remove(abnormId)
          }, Number(duration))
        : true
  }
  ['_remove'](abnorm) {
    if (!this.abnormies[abnorm]) {
      return
    }
    this._mod.clearTimeout(this.abnormies[abnorm].endTimer)
    if (this._state.config.enabled) {
      let aspdAbnorm = this._state.aspdAbnList[abnorm]
      if (aspdAbnorm) {
        switch (aspdAbnorm.type) {
          case 24: {
            let abnormMethod = aspdAbnorm.method,
              abnormValue = aspdAbnorm.value,
              abnormStacks = this.abnormies[abnorm].stacks || 1
            switch (abnormMethod) {
              case 2:
                abnormValue *= abnormStacks
                break
              case 3:
                abnormValue = (abnormValue - 1) * abnormStacks + 1
                break
            }
            this._me.changeAspd(
              abnormValue,
              abnormMethod,
              true,
              'Emulation: abnormal end'
            )
            break
          }
        }
      }
    }
    delete this.abnormies[abnorm]
  }
}
module.exports = abnormalClass
