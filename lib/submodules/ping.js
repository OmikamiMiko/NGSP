'use strict'
const { spawn: _0x58a256 } = require('child_process')
const { EventEmitter: _0x437901 } = require('events')
class pingClass extends _0x437901 {
  constructor({
    utils: utilsInput,
    state: stateInput,
    defs: defsInput,
    mod: mobInput,
    client: clientInput,
  }) {
    super()
    let _0x2c90e4 = true
    this.min = this.max = this.avg = this.effSpread = 0
    this.history = []
    let _0x4f2713 = [3925, 3950, 3980, 4000, 4020, 4050]
    this.internalPingInterval = _0x4f2713[Math.floor(6 * Math.random())]
    let sendingPingTime = 0,
      pingTimer = null
    !clientInput && (_0x2c90e4 = false)
    stateInput.config.defaultPingValue > 0 &&
      stateInput.config.defaultPingValue < 500 &&
      (this.history.fill(stateInput.config.defaultPingValue),
      (this.avg = this.max = this.min = stateInput.config.defaultPingValue),
      (this.avg = 1.1099999999996726 * this.avg),
      (this.max = 1.199999999999818 * this.max))
    !mobInput.clientInterface && (stateInput.config.pingMethod = 'internal')
    const OnPingHistory = (pingValue) => {
        this.history.push(_0x2c90e4 ? pingValue : 6969)
        if (this.history.length > stateInput.config.pingHistoryMax) {
          this.history.shift()
        }
        const statsObject = utilsInput.getStatsFromArray(
          this.history,
          stateInput.quantileOne
        )
        this.min = statsObject.minValue
        this.avg = statsObject.avgValue
        this.max = statsObject.maxValue
        this.effSpread = statsObject.avgValue - statsObject.minValue
        statsObject.raw = pingValue
        this.emit('pingStats', statsObject)
      },
      OnPingCheckerStdOut = (stdOut) => {
        let pingValue = Number(stdOut)
        0 < pingValue && pingValue < 15000 && OnPingHistory(pingValue)
      },
      ExternalPing = () => {
        mobInput.hook('S_SPAWN_ME', 'event', () => {
          if (this.externalPingChecker) {
            return
          }
          this.externalPingChecker = _0x58a256(stateInput.pingHelperPath, [
            process.pid.toString(),
            stateInput.config.pingHelperTimeout.toString(),
            mobInput.dispatch.connection.serverConnection.remoteAddress,
            99,
          ])
          this.externalPingChecker.stdout.on('data', OnPingCheckerStdOut)
        })
        mobInput.hook('S_RETURN_TO_LOBBY', 'event', () => {
          if (!this.externalPingChecker) {
            return
          }
          this.externalPingChecker.stdout.off('data', OnPingCheckerStdOut)
          this.externalPingChecker.kill()
          this.externalPingChecker = null
        })
      },
      OnPingTimerInterval = () => {
        mobInput.toServer(...defsInput.getVersion('C_REQUEST_GAMESTAT_PING'))
        sendingPingTime = Date.now()
        pingTimer = mobInput.setTimeout(OnPingTimerInterval, this.internalPingInterval)
      },
      OnServerPingResponse = () => {
        let pingDelta = Date.now() - sendingPingTime
        return OnPingHistory(Number(pingDelta)), false
      },
      OnServerLoadToPosition = () => {
        mobInput.clearTimeout(pingTimer)
      },
      InternalPing = () => {
        mobInput.hook('S_SPAWN_ME', 'event', () => {
          OnServerLoadToPosition()
          pingTimer = mobInput.setTimeout(OnPingTimerInterval, this.internalPingInterval)
        })
        mobInput.hook('S_RESPONSE_GAMESTAT_PONG', 'event', OnServerPingResponse)
        mobInput.hook('S_LOAD_TOPO', 'event', OnServerLoadToPosition)
        mobInput.hook('S_RETURN_TO_LOBBY', 'event', OnServerLoadToPosition)
        mobInput.hook('C_REQUEST_GAMESTAT_PING', 'event', () => {
          switch (stateInput.config.ingameUIPing) {
            case 'min':
              mobInput.setTimeout(() => {
                mobInput.toClient(
                  ...defsInput.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.min)
              break
            case 'avg':
              mobInput.setTimeout(() => {
                mobInput.toClient(
                  ...defsInput.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.avg)
              break
            case 'fake':
              mobInput.toClient(
                ...defsInput.getVersion('S_RESPONSE_GAMESTAT_PONG')
              )
              break
            case 'none':
              break
            default:
              mobInput.setTimeout(() => {
                mobInput.toClient(
                  ...defsInput.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.min)
              break
          }
          return false
        })
      }
    switch (stateInput.config.pingMethod) {
      case 'internal':
        InternalPing()
        break
      case 'external':
        ExternalPing()
        break
      case 'hybrid':
        ExternalPing(), InternalPing()
        break
      case 'static':
        break
      default:
        InternalPing()
        break
    }
    this.destructor = () => {
      if (!this.externalPingChecker) {
        return
      }
      this.externalPingChecker.stdout.off('data', OnPingCheckerStdOut)
      this.externalPingChecker.kill()
      this.externalPingChecker = null
    }
  }
}
module.exports = pingClass
