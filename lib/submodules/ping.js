'use strict'
const { spawn: _0x58a256 } = require('child_process')
const { EventEmitter: _0x437901 } = require('events')
class _0x34d31b extends _0x437901 {
  constructor({
    utils: _0x2438a4,
    state: _0x41d704,
    defs: _0x29fcce,
    mod: _0x24def8,
    client: _0x16334c,
  }) {
    super()
    let _0x2c90e4 = true
    this.min = this.max = this.avg = this.effSpread = 0
    this.history = []
    let _0x4f2713 = [3925, 3950, 3980, 4000, 4020, 4050]
    this.internalPingInterval = _0x4f2713[Math.floor(6 * Math.random())]
    let _0x2b422b = 0,
      _0x283674 = null
    !_0x16334c && (_0x2c90e4 = false)
    _0x41d704.config.defaultPingValue > 0 &&
      _0x41d704.config.defaultPingValue < 500 &&
      (this.history.fill(_0x41d704.config.defaultPingValue),
      (this.avg = this.max = this.min = _0x41d704.config.defaultPingValue),
      (this.avg = 1.1099999999996726 * this.avg),
      (this.max = 1.199999999999818 * this.max))
    !_0x24def8.clientInterface && (_0x41d704.config.pingMethod = 'internal')
    const _0x15ef83 = (_0x3e5523) => {
        this.history.push(_0x2c90e4 ? _0x3e5523 : 6969)
        if (this.history.length > _0x41d704.config.pingHistoryMax) {
          this.history.shift()
        }
        const _0x4e21cd = _0x2438a4.getStatsFromArray(
          this.history,
          _0x41d704.quantileOne
        )
        this.min = _0x4e21cd.minValue
        this.avg = _0x4e21cd.avgValue
        this.max = _0x4e21cd.maxValue
        this.effSpread = _0x4e21cd.avgValue - _0x4e21cd.minValue
        _0x4e21cd.raw = _0x3e5523
        this.emit('pingStats', _0x4e21cd)
      },
      _0x297d0e = (_0x1dfe46) => {
        let _0xe9fa25 = Number(_0x1dfe46)
        0 < _0xe9fa25 && _0xe9fa25 < 15000 && _0x15ef83(_0xe9fa25)
      },
      _0x1db09b = () => {
        _0x24def8.hook('S_SPAWN_ME', 'event', () => {
          if (this.externalPingChecker) {
            return
          }
          this.externalPingChecker = _0x58a256(_0x41d704.pingHelperPath, [
            process.pid.toString(),
            _0x41d704.config.pingHelperTimeout.toString(),
            _0x24def8.dispatch.connection.serverConnection.remoteAddress,
            99,
          ])
          this.externalPingChecker.stdout.on('data', _0x297d0e)
        })
        _0x24def8.hook('S_RETURN_TO_LOBBY', 'event', () => {
          if (!this.externalPingChecker) {
            return
          }
          this.externalPingChecker.stdout.off('data', _0x297d0e)
          this.externalPingChecker.kill()
          this.externalPingChecker = null
        })
      },
      _0x52ad98 = () => {
        _0x24def8.toServer(..._0x29fcce.getVersion('C_REQUEST_GAMESTAT_PING'))
        _0x2b422b = Date.now()
        _0x283674 = _0x24def8.setTimeout(_0x52ad98, this.internalPingInterval)
      },
      _0x47fa22 = () => {
        let _0x6f425d = Date.now() - _0x2b422b
        return _0x15ef83(Number(_0x6f425d)), false
      },
      _0x4af9db = () => {
        _0x24def8.clearTimeout(_0x283674)
      },
      _0x37e7ec = () => {
        _0x24def8.hook('S_SPAWN_ME', 'event', () => {
          _0x4af9db()
          _0x283674 = _0x24def8.setTimeout(_0x52ad98, this.internalPingInterval)
        })
        _0x24def8.hook('S_RESPONSE_GAMESTAT_PONG', 'event', _0x47fa22)
        _0x24def8.hook('S_LOAD_TOPO', 'event', _0x4af9db)
        _0x24def8.hook('S_RETURN_TO_LOBBY', 'event', _0x4af9db)
        _0x24def8.hook('C_REQUEST_GAMESTAT_PING', 'event', () => {
          switch (_0x41d704.config.ingameUIPing) {
            case 'min':
              _0x24def8.setTimeout(() => {
                _0x24def8.toClient(
                  ..._0x29fcce.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.min)
              break
            case 'avg':
              _0x24def8.setTimeout(() => {
                _0x24def8.toClient(
                  ..._0x29fcce.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.avg)
              break
            case 'fake':
              _0x24def8.toClient(
                ..._0x29fcce.getVersion('S_RESPONSE_GAMESTAT_PONG')
              )
              break
            case 'none':
              break
            default:
              _0x24def8.setTimeout(() => {
                _0x24def8.toClient(
                  ..._0x29fcce.getVersion('S_RESPONSE_GAMESTAT_PONG')
                )
              }, this.min)
              break
          }
          return false
        })
      }
    switch (_0x41d704.config.pingMethod) {
      case 'internal':
        _0x37e7ec()
        break
      case 'external':
        _0x1db09b()
        break
      case 'hybrid':
        _0x1db09b(), _0x37e7ec()
        break
      case 'static':
        break
      default:
        _0x37e7ec()
        break
    }
    this.destructor = () => {
      if (!this.externalPingChecker) {
        return
      }
      this.externalPingChecker.stdout.off('data', _0x297d0e)
      this.externalPingChecker.kill()
      this.externalPingChecker = null
    }
  }
}
module.exports = _0x34d31b
