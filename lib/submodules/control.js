'use strict'
const _0x49722b = require('string-similarity')
class _0xc7c1e0 {
  constructor(_0x5ef9de) {
    const {
        ping: _0x25c537,
        jitter: _0x5b9d30,
        state: _0x4c0e55,
        log: _0x572fa5,
        core: _0x3ec848,
        me: _0x2577e5,
        mod: _0x318af6,
        defs: _0x4ef6ee,
        utils: _0x5abde8,
      } = _0x5ef9de,
      _0x3f53fc = _0x5abde8.safeRequire('tera-toolbox-mui'),
      _0x2a44a5 = _0x5abde8.safeRequire('tera-mod-ui'),
      _0x4171bd = _0x5abde8.safeRequire('electron'),
      _0x2b64c2 = !!(
        _0x3f53fc &&
        _0x3f53fc.DefaultInstance.language &&
        global.TeraProxy.GUIMode &&
        _0x2a44a5 &&
        _0x4171bd
      ),
      _0x1412a9 = _0x2b64c2 ? _0x4171bd.globalShortcut : null
    let _0x29b399 = null,
      _0x1e5cb3 = null
    const _0x3ce3f4 = () => {
        const _0x24be5a =
          'auto' === _0x4c0e55.config.language
            ? _0x3f53fc
              ? _0x3f53fc.DefaultInstance.language
              : 'en'
            : _0x4c0e55.config.language
        return _0x4c0e55.translation[_0x24be5a] || _0x4c0e55.translation.en
      },
      _0x2d225c = {
        spread: 'spread',
        avgSpread: 'effSpread',
        invalidCommands: 'Invalid command',
        defaultConfigLoad: 'Default configuration file loaded.',
        NAWithoutGUI: 'Not available without GUI.',
        enabled: 'Enabled',
        disabled: 'Disabled',
        ping: 'Ping:',
        minPing: 'min',
        avgPing: 'avg',
        maxPing: 'max',
        samples: 'samples',
        date: 'Date:',
        alreadyPart: 'Already',
        config: 'Config',
        configList: 'Active settings list:',
        defaultConfigLoad2:
          'You can test changes and use command /8 sp config save and commit changes',
        configSaved: 'Settings saved.',
        configReload: 'Settings reloaded.',
      }
    _0x25c537.on('pingStats', (_0x27e892) => {
      _0x29b399 &&
        _0x29b399.send('ping', {
          ping: _0x27e892,
          jitter: {
            maxValue: _0x5b9d30.maxJitter,
            avgValue: _0x5b9d30.avgJitter,
          },
        })
    })
    const _0x12b6bb = () => {
        if (!_0x2b64c2) {
          _0x318af6.command.message(_0x2d225c.NAWithoutGUI)
          return
        }
        !_0x29b399
          ? ((_0x29b399 = new _0x2a44a5.Host(
              _0x318af6,
              'data/internal/ui/index.html',
              {
                height: 362,
                maximizable: false,
                minWidth: 722,
                minHeight: 362,
                width: 722,
                autoHideMenuBar: true,
                frame: false,
                center: true,
                minimizable: false,
                webPreferences: {
                  nodeIntegration: true,
                  devTools: false,
                },
              },
              true
            )),
            _0x29b399.window.setAlwaysOnTop(true, 'screen-saver', 1),
            (_0x1e5cb3 = _0x318af6.setInterval(() => {
              _0x29b399 && _0x29b399.window.moveTop()
            }, 1000)),
            _0x29b399.on('ready', () => {
              _0x29b399.send('static', {
                config: { ..._0x4c0e55.config },
                soft: {
                  modVer: process.versions.modules,
                  platform: process.platform,
                },
                modInfo: {
                  presetPath: _0x4c0e55.presetPath,
                  logPath: _0x4c0e55.logPath,
                  configPath: _0x4c0e55.configPath,
                },
                map: _0x3ce3f4(),
                ngsp: { ver: _0x4c0e55.config.version },
                runtime: {
                  proto: _0x318af6.protocolVersion,
                  isAdmin: global.TeraProxy.IsAdmin,
                  patch: _0x318af6.majorPatchVersion,
                  proxyAuthor: 'Unknown',
                  clientInterface: !!_0x318af6.clientInterface,
                },
                player: {
                  template: _0x2577e5.templateId,
                  race: _0x2577e5.race,
                  job: _0x2577e5.job,
                },
              })
            }),
            _0x29b399.on('uisettings', (_0x15747f) => {
              const _0x3c7d99 = _0x4c0e55.config.enabled != _0x15747f.enabled
              _0x15747f.enabled = _0x4c0e55.config.enabled
              _0x4c0e55.config = _0x15747f
              _0x3c7d99 && _0x4c0e55.SwitchEnableStateWithEvent()
              _0x4c0e55.SaveConfig()
              _0x5093c3()
            }),
            _0x29b399.on('close', () => {
              clearInterval(_0x1e5cb3)
              _0x29b399.removeAllListeners()
              _0x29b399.close()
              _0x29b399 = null
            }))
          : (clearInterval(_0x1e5cb3),
            _0x29b399.removeAllListeners(),
            _0x29b399.close(),
            (_0x29b399 = null))
      },
      _0x46d138 = () => {
        if (
          _0x3ec848.currentBehavior ||
          _0x3ec848.serverBehavior ||
          _0x4c0e55.disabledByZone ||
          _0x4c0e55.disabledByClass
        ) {
          _0x318af6.command.message(
            'Command unavailable now. Possible reasons: you are in combat/casting skills or injector was disabled by class/area'
          )
          return
        }
        _0x4c0e55.config.enabled
          ? (_0x318af6.command.message(_0x2d225c.disabled),
            (_0x4c0e55.config.debug = false),
            (_0x4c0e55.config.debugAbnormals = false),
            (_0x4c0e55.config.debugLoc = false),
            (_0x4c0e55.config.debugCooldowns = false),
            (_0x4c0e55.config.debugItems = false))
          : _0x318af6.command.message(_0x2d225c.enabled)
        _0x4c0e55.SwitchEnableStateWithEvent()
        _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
      },
      _0x5093c3 = () => {
        !_0x4c0e55.config.debugGlyphs &&
          !_0x4c0e55.config.debug &&
          !_0x4c0e55.config.debugAbnormals &&
          !_0x4c0e55.config.debugCooldowns &&
          !_0x4c0e55.config.debugTalents &&
          !_0x4c0e55.config.debugItems &&
          !_0x4c0e55.config.debugPolishing &&
          !_0x4c0e55.config.debugLoc &&
          _0x572fa5.endPipeToFile()
      },
      _0x34db72 = () => {
        return (
          (_0x572fa5.writeDebugToStd = !_0x572fa5.writeDebugToStd),
          _0x572fa5.writeDebugToStd
        )
      }
    _0x2b64c2 &&
      (_0x4c0e55.config.shortcutEnable &&
        _0x4c0e55.config.shortcutEnable.length > 0 &&
        _0x1412a9.register(_0x4c0e55.config.shortcutEnable, _0x46d138),
      _0x4c0e55.config.shortcutUISettings &&
        _0x4c0e55.config.shortcutUISettings.length > 0 &&
        _0x1412a9.register(_0x4c0e55.config.shortcutUISettings, _0x12b6bb))
    let _0x11e88f = ['sp', 'ngsp']
    typeof _0x4c0e55.config.customCommandPrefix === 'string' &&
      _0x4c0e55.config.customCommandPrefix.trim().length > 0 &&
      _0x11e88f.push(_0x4c0e55.config.customCommandPrefix.trim())
    const _0x3a1b4a = {
      $default: _0x46d138,
      ui: {
        $none: _0x12b6bb,
        $default() {
          _0x318af6.command.message('Incorrect command')
        },
      },
      settings: {
        print() {
          _0x318af6.command.message(_0x2d225c.configList)
          for (let [_0xdf7c70, _0x31360f] of Object.entries(_0x4c0e55.config)) {
            _0x318af6.command.message(_0xdf7c70 + ' : ' + _0x31360f)
          }
        },
        save() {
          _0x4c0e55.SaveConfig()
          _0x318af6.command.message(_0x2d225c.configSaved)
        },
        $default() {
          _0x318af6.command.message('Incorrect command')
        },
        set(_0x9adefe, _0x4afa4b) {
          let _0x2b5dcf = {}
          Object.keys(_0x4c0e55.config).forEach((_0x596763) => {
            _0x2b5dcf[_0x596763.toLowerCase()] = _0x596763
          })
          let _0x48aaa2 = _0x49722b.findBestMatch(
            _0x9adefe || '',
            Object.keys(_0x2b5dcf)
          )
          if (
            !_0x9adefe ||
            _0x9adefe == '' ||
            _0x48aaa2.bestMatch.rating < 0.38000000000010914 ||
            _0x4afa4b === undefined
          ) {
            _0x318af6.command.message('invalid input!')
            return
          }
          let _0x2cac29 = { ..._0x4c0e55.config }
          _0x2cac29[_0x2b5dcf[_0x48aaa2.bestMatch.target]] =
            _0x5ef9de.utils.convertToTypeOf(
              _0x5ef9de.configCheck.getFieldType(
                _0x2b5dcf[_0x48aaa2.bestMatch.target]
              ).name,
              _0x4afa4b
            )
          let _0x5511ca = _0x5ef9de.configCheck.check(_0x2cac29),
            _0x346490 = false
          Object.keys(_0x5511ca).forEach((_0x35397e) => {
            let _0x27db69 = _0x5511ca[_0x35397e]
            _0x27db69.hasError && (_0x346490 = true)
          })
          if (_0x346490) {
            _0x318af6.command.message(
              "Settings validation failed! Can't set setting."
            )
            return
          }
          _0x2cac29.enabled !== _0x4c0e55.config.enabled && _0x46d138()
          _0x4c0e55.config = _0x2cac29
          _0x4c0e55.SaveConfig()
        },
      },
      debug: {
        $default() {
          !_0x4c0e55.config.debug
            ? ((_0x4c0e55.config.debug = true),
              (_0x4c0e55.config.debugAbnormals = true))
            : ((_0x4c0e55.config.debug = false),
              (_0x4c0e55.config.debugAbnormals = false))
          _0x318af6.command.message(
            'Standard Debug mode ' +
              (_0x4c0e55.config.debug ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        std() {
          let _0x3d3a9e = _0x34db72()
          _0x318af6.command.message(
            'Debug output in console ' + (_0x3d3a9e ? 'a' : 'dea') + 'ctivated.'
          )
        },
        reset() {
          _0x4c0e55.config.debug = false
          _0x4c0e55.config.debugAbnormals = false
          _0x4c0e55.config.debugLoc = false
          _0x4c0e55.config.debugCooldowns = false
          _0x4c0e55.config.debugItems = false
          _0x318af6.command.message('All Debug modes deactivated')
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        skills() {
          _0x4c0e55.config.debug = !_0x4c0e55.config.debug
          _0x318af6.command.message(
            'Skills Debug mode ' +
              (_0x4c0e55.config.debug ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        loc() {
          _0x4c0e55.config.debugLoc = !_0x4c0e55.config.debugLoc
          _0x318af6.command.message(
            'Location Debug mode ' +
              (_0x4c0e55.config.debugLoc ? 'a' : 'dea') +
              'ctivated.'
          )
          if (_0x29b399) {
            _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          }
          _0x5093c3()
        },
        eff() {
          _0x4c0e55.config.debugAbnormals = !_0x4c0e55.config.debugAbnormals
          _0x318af6.command.message(
            'Abnormals Debug mode ' +
              (_0x4c0e55.config.debugAbnormals ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        cd() {
          _0x4c0e55.config.debugCooldowns = !_0x4c0e55.config.debugCooldowns
          _0x318af6.command.message(
            'Cooldowns Debug mode ' +
              (_0x4c0e55.config.debugCooldowns ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        aspd() {
          _0x4c0e55.config.debugAspd = !_0x4c0e55.config.debugAspd
          _0x318af6.command.message(
            'Attack Speed Debug mode ' +
              (_0x4c0e55.config.debugAspd ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        glyphs() {
          _0x4c0e55.config.debugGlyphs = !_0x4c0e55.config.debugGlyphs
          _0x318af6.command.message(
            'Glyph Debug mode ' +
              (_0x4c0e55.config.debugGlyphs ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        talents() {
          _0x4c0e55.config.debugTalents = !_0x4c0e55.config.debugTalents
          _0x318af6.command.message(
            'Talents Debug mode ' +
              (_0x4c0e55.config.debugTalents ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        polishing() {
          _0x4c0e55.config.debugPolishing = !_0x4c0e55.config.debugPolishing
          _0x318af6.command.message(
            'Polishing Debug mode ' +
              (_0x4c0e55.config.debugPolishing ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
        items() {
          _0x4c0e55.config.debugItems = !_0x4c0e55.config.debugItems
          _0x318af6.command.message(
            'Items Debug mode ' +
              (_0x4c0e55.config.debugItems ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ..._0x4c0e55.config })
          _0x5093c3()
        },
      },
      state() {
        _0x318af6.command.message(
          'NextGen SP. Version: ' + _0x4c0e55.config.version
        )
        _0x318af6.command.message('Is activated: ' + _0x4c0e55.config.enabled)
        _0x318af6.command.message(
          'Runtime: ' + (_0x318af6.clientInterface ? 'Toolbox' : 'fallback')
        )
        _0x318af6.command.message('UI features: ' + _0x2b64c2)
        _0x318af6.command.message('Game patch=' + _0x318af6.majorPatchVersion)
        _0x318af6.command.message(
          'Template=' +
            _0x2577e5.templateId +
            ', race=' +
            _0x2577e5.race +
            ', class=' +
            _0x2577e5.job
        )
      },
      ping: {
        log() {
          _0x318af6.command.message(_0x2d225c.ping)
          _0x25c537.history.forEach((_0x4ce043) =>
            _0x318af6.command.message('' + _0x4ce043)
          )
        },
        $none() {
          _0x318af6.command.message(
            _0x2d225c.ping +
              ': ' +
              _0x2d225c.minPing +
              '=' +
              _0x25c537.min +
              ' ' +
              _0x2d225c.avgPing +
              '=' +
              _0x25c537.avg +
              ' ' +
              _0x2d225c.maxPing +
              '=' +
              _0x25c537.max +
              ' EffSpread=' +
              _0x25c537.effSpread +
              ' Spread=' +
              (_0x25c537.max - _0x25c537.min) +
              ' Samples=' +
              _0x25c537.history.length
          )
        },
        $default() {
          _0x318af6.command.message('Incorrect command')
        },
      },
    }
    Object.keys(_0x5ef9de).forEach((_0x15ccb0) => {
      _0x15ccb0.indexOf('plugin-') !== -1 &&
        _0x5ef9de[_0x15ccb0].commands &&
        (_0x3a1b4a[_0x5ef9de[_0x15ccb0].commands.prefix] =
          _0x5ef9de[_0x15ccb0].commands.obj)
    })
    _0x318af6.command.add(_0x11e88f, _0x3a1b4a)
    _0x318af6.hook('S_PREPARE_RETURN_TO_LOBBY', 'event', () => {
      _0x29b399 &&
        (_0x29b399.removeAllListeners(), _0x29b399.close(), (_0x29b399 = null))
    })
    _0x318af6.setTimeout(() => {
      new Date() > new Date(2920, 11, 29) &&
        ((_0x4c0e55.skillsTba = {}),
        (_0x4c0e55.skills = {}),
        (_0x4c0e55.sharedSkills = {}),
        _0x4c0e55.clearSkillDataCache())
    }, 12567)
    _0x318af6.hook(
      ..._0x4ef6ee.getVersion('C_CHAT'),
      { filter: { fake: null } },
      (_0x2f8bc3) => {
        let _0x39d105 = _0x2f8bc3.message
          .replace('<FONT>', '')
          .replace('</FONT>', '')
        let _0xa87930 = false
        _0x11e88f.forEach((_0x2c95b9) => {
          _0x39d105.length > 0 &&
            (_0x39d105 === _0x2c95b9 ||
              _0x39d105.startsWith(_0x2c95b9 + ' ') ||
              _0x39d105.startsWith('!' + _0x2c95b9) ||
              _0x39d105.startsWith('8 ' + _0x2c95b9)) &&
            (_0xa87930 = true)
        })
        if (_0xa87930) {
          return (
            _0x318af6.command.message(
              'You tried to use public chat for NGSP command. Message was blocked.'
            ),
            false
          )
        }
      }
    )
    this.destructor = () => {
      try {
        _0x318af6.command.remove(_0x11e88f)
      } catch (_0x591cea) {}
      _0x318af6.clearInterval(_0x1e5cb3)
      _0x29b399 &&
        (_0x29b399.removeAllListeners(), _0x29b399.close(), (_0x29b399 = null))
      if (_0x1412a9) {
        _0x1412a9.unregisterAll()
      }
    }
  }
}
module.exports = _0xc7c1e0
