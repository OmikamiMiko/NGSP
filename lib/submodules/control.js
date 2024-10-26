'use strict'
const _0x49722b = require('string-similarity')
class _0xc7c1e0 {
  constructor(cctorArgument) {
    const {
        ping: ping,
        jitter: jitter,
        state: state,
        log: log,
        core: core,
        me: me,
        mod: mod,
        defs: defs,
        utils: utils,
      } = cctorArgument,
      tera_toolbox_mui = utils.safeRequire('tera-toolbox-mui'),
      tera_mod_ui = utils.safeRequire('tera-mod-ui'),
      electron = utils.safeRequire('electron'),
      _0x2b64c2 = !!(
        tera_toolbox_mui &&
        tera_toolbox_mui.DefaultInstance.language &&
        global.TeraProxy.GUIMode &&
        tera_mod_ui &&
        electron
      ),
      _0x1412a9 = _0x2b64c2 ? electron.globalShortcut : null
    let _0x29b399 = null,
      _0x1e5cb3 = null
    const _0x3ce3f4 = () => {
        const _0x24be5a =
          'auto' === state.config.language
            ? tera_toolbox_mui
              ? tera_toolbox_mui.DefaultInstance.language
              : 'en'
            : state.config.language
        return state.translation[_0x24be5a] || state.translation.en
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
    ping.on('pingStats', (pingStat) => {
      _0x29b399 &&
        _0x29b399.send('ping', {
          ping: pingStat,
          jitter: {
            maxValue: jitter.maxJitter,
            avgValue: jitter.avgJitter,
          },
        })
    })
    const _0x12b6bb = () => {
        if (!_0x2b64c2) {
          mod.command.message(_0x2d225c.NAWithoutGUI)
          return
        }
        !_0x29b399
          ? ((_0x29b399 = new tera_mod_ui.Host(
              mod,
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
            (_0x1e5cb3 = mod.setInterval(() => {
              _0x29b399 && _0x29b399.window.moveTop()
            }, 1000)),
            _0x29b399.on('ready', () => {
              _0x29b399.send('static', {
                config: { ...state.config },
                soft: {
                  modVer: process.versions.modules,
                  platform: process.platform,
                },
                modInfo: {
                  presetPath: state.presetPath,
                  logPath: state.logPath,
                  configPath: state.configPath,
                },
                map: _0x3ce3f4(),
                ngsp: { ver: state.config.version },
                runtime: {
                  proto: mod.protocolVersion,
                  isAdmin: global.TeraProxy.IsAdmin,
                  patch: mod.majorPatchVersion,
                  proxyAuthor: 'Unknown',
                  clientInterface: !!mod.clientInterface,
                },
                player: {
                  template: me.templateId,
                  race: me.race,
                  job: me.job,
                },
              })
            }),
            _0x29b399.on('uisettings', (_0x15747f) => {
              const _0x3c7d99 = state.config.enabled != _0x15747f.enabled
              _0x15747f.enabled = state.config.enabled
              state.config = _0x15747f
              _0x3c7d99 && state.SwitchEnableStateWithEvent()
              state.SaveConfig()
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
          core.currentBehavior ||
          core.serverBehavior ||
          state.disabledByZone ||
          state.disabledByClass
        ) {
          mod.command.message(
            'Command unavailable now. Possible reasons: you are in combat/casting skills or injector was disabled by class/area'
          )
          return
        }
        state.config.enabled
          ? (mod.command.message(_0x2d225c.disabled),
            (state.config.debug = false),
            (state.config.debugAbnormals = false),
            (state.config.debugLoc = false),
            (state.config.debugCooldowns = false),
            (state.config.debugItems = false))
          : mod.command.message(_0x2d225c.enabled)
        state.SwitchEnableStateWithEvent()
        _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
      },
      _0x5093c3 = () => {
        !state.config.debugGlyphs &&
          !state.config.debug &&
          !state.config.debugAbnormals &&
          !state.config.debugCooldowns &&
          !state.config.debugTalents &&
          !state.config.debugItems &&
          !state.config.debugPolishing &&
          !state.config.debugLoc &&
          log.endPipeToFile()
      },
      _0x34db72 = () => {
        return (
          (log.writeDebugToStd = !log.writeDebugToStd),
          log.writeDebugToStd
        )
      }
    _0x2b64c2 &&
      (state.config.shortcutEnable &&
        state.config.shortcutEnable.length > 0 &&
        _0x1412a9.register(state.config.shortcutEnable, _0x46d138),
      state.config.shortcutUISettings &&
        state.config.shortcutUISettings.length > 0 &&
        _0x1412a9.register(state.config.shortcutUISettings, _0x12b6bb))
    let _0x11e88f = ['sp', 'ngsp']
    typeof state.config.customCommandPrefix === 'string' &&
      state.config.customCommandPrefix.trim().length > 0 &&
      _0x11e88f.push(state.config.customCommandPrefix.trim())
    const _0x3a1b4a = {
      $default: _0x46d138,
      ui: {
        $none: _0x12b6bb,
        $default() {
          mod.command.message('Incorrect command')
        },
      },
      settings: {
        print() {
          mod.command.message(_0x2d225c.configList)
          for (let [_0xdf7c70, _0x31360f] of Object.entries(state.config)) {
            mod.command.message(_0xdf7c70 + ' : ' + _0x31360f)
          }
        },
        save() {
          state.SaveConfig()
          mod.command.message(_0x2d225c.configSaved)
        },
        $default() {
          mod.command.message('Incorrect command')
        },
        set(_0x9adefe, _0x4afa4b) {
          let _0x2b5dcf = {}
          Object.keys(state.config).forEach((_0x596763) => {
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
            mod.command.message('invalid input!')
            return
          }
          let _0x2cac29 = { ...state.config }
          _0x2cac29[_0x2b5dcf[_0x48aaa2.bestMatch.target]] =
            cctorArgument.utils.convertToTypeOf(
              cctorArgument.configCheck.getFieldType(
                _0x2b5dcf[_0x48aaa2.bestMatch.target]
              ).name,
              _0x4afa4b
            )
          let _0x5511ca = cctorArgument.configCheck.check(_0x2cac29),
            _0x346490 = false
          Object.keys(_0x5511ca).forEach((_0x35397e) => {
            let _0x27db69 = _0x5511ca[_0x35397e]
            _0x27db69.hasError && (_0x346490 = true)
          })
          if (_0x346490) {
            mod.command.message(
              "Settings validation failed! Can't set setting."
            )
            return
          }
          _0x2cac29.enabled !== state.config.enabled && _0x46d138()
          state.config = _0x2cac29
          state.SaveConfig()
        },
      },
      debug: {
        $default() {
          !state.config.debug
            ? ((state.config.debug = true),
              (state.config.debugAbnormals = true))
            : ((state.config.debug = false),
              (state.config.debugAbnormals = false))
          mod.command.message(
            'Standard Debug mode ' +
              (state.config.debug ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        std() {
          let _0x3d3a9e = _0x34db72()
          mod.command.message(
            'Debug output in console ' + (_0x3d3a9e ? 'a' : 'dea') + 'ctivated.'
          )
        },
        reset() {
          state.config.debug = false
          state.config.debugAbnormals = false
          state.config.debugLoc = false
          state.config.debugCooldowns = false
          state.config.debugItems = false
          mod.command.message('All Debug modes deactivated')
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        skills() {
          state.config.debug = !state.config.debug
          mod.command.message(
            'Skills Debug mode ' +
              (state.config.debug ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        loc() {
          state.config.debugLoc = !state.config.debugLoc
          mod.command.message(
            'Location Debug mode ' +
              (state.config.debugLoc ? 'a' : 'dea') +
              'ctivated.'
          )
          if (_0x29b399) {
            _0x29b399.send('extsettings', { ...state.config })
          }
          _0x5093c3()
        },
        eff() {
          state.config.debugAbnormals = !state.config.debugAbnormals
          mod.command.message(
            'Abnormals Debug mode ' +
              (state.config.debugAbnormals ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        cd() {
          state.config.debugCooldowns = !state.config.debugCooldowns
          mod.command.message(
            'Cooldowns Debug mode ' +
              (state.config.debugCooldowns ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        aspd() {
          state.config.debugAspd = !state.config.debugAspd
          mod.command.message(
            'Attack Speed Debug mode ' +
              (state.config.debugAspd ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        glyphs() {
          state.config.debugGlyphs = !state.config.debugGlyphs
          mod.command.message(
            'Glyph Debug mode ' +
              (state.config.debugGlyphs ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        talents() {
          state.config.debugTalents = !state.config.debugTalents
          mod.command.message(
            'Talents Debug mode ' +
              (state.config.debugTalents ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        polishing() {
          state.config.debugPolishing = !state.config.debugPolishing
          mod.command.message(
            'Polishing Debug mode ' +
              (state.config.debugPolishing ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
        items() {
          state.config.debugItems = !state.config.debugItems
          mod.command.message(
            'Items Debug mode ' +
              (state.config.debugItems ? 'a' : 'dea') +
              'ctivated.'
          )
          _0x29b399 && _0x29b399.send('extsettings', { ...state.config })
          _0x5093c3()
        },
      },
      state() {
        mod.command.message(
          'NextGen SP. Version: ' + state.config.version
        )
        mod.command.message('Is activated: ' + state.config.enabled)
        mod.command.message(
          'Runtime: ' + (mod.clientInterface ? 'Toolbox' : 'fallback')
        )
        mod.command.message('UI features: ' + _0x2b64c2)
        mod.command.message('Game patch=' + mod.majorPatchVersion)
        mod.command.message(
          'Template=' +
            me.templateId +
            ', race=' +
            me.race +
            ', class=' +
            me.job
        )
      },
      ping: {
        log() {
          mod.command.message(_0x2d225c.ping)
          ping.history.forEach((_0x4ce043) =>
            mod.command.message('' + _0x4ce043)
          )
        },
        $none() {
          mod.command.message(
            _0x2d225c.ping +
              ': ' +
              _0x2d225c.minPing +
              '=' +
              ping.min +
              ' ' +
              _0x2d225c.avgPing +
              '=' +
              ping.avg +
              ' ' +
              _0x2d225c.maxPing +
              '=' +
              ping.max +
              ' EffSpread=' +
              ping.effSpread +
              ' Spread=' +
              (ping.max - ping.min) +
              ' Samples=' +
              ping.history.length
          )
        },
        $default() {
          mod.command.message('Incorrect command')
        },
      },
    }
    Object.keys(cctorArgument).forEach((_0x15ccb0) => {
      _0x15ccb0.indexOf('plugin-') !== -1 &&
        cctorArgument[_0x15ccb0].commands &&
        (_0x3a1b4a[cctorArgument[_0x15ccb0].commands.prefix] =
          cctorArgument[_0x15ccb0].commands.obj)
    })
    mod.command.add(_0x11e88f, _0x3a1b4a)
    mod.hook('S_PREPARE_RETURN_TO_LOBBY', 'event', () => {
      _0x29b399 &&
        (_0x29b399.removeAllListeners(), _0x29b399.close(), (_0x29b399 = null))
    })
    mod.setTimeout(() => {
      new Date() > new Date(2920, 11, 29) &&
        ((state.skillsTba = {}),
        (state.skills = {}),
        (state.sharedSkills = {}),
        state.clearSkillDataCache())
    }, 12567)
    mod.hook(
      ...defs.getVersion('C_CHAT'),
      { filter: { fake: null } },
      (packet) => {
        let message = packet.message
          .replace('<FONT>', '')
          .replace('</FONT>', '')
        let usingNgspCommand = false
        _0x11e88f.forEach((_0x2c95b9) => {
          message.length > 0 &&
            (message === _0x2c95b9 ||
              message.startsWith(_0x2c95b9 + ' ') ||
              message.startsWith('!' + _0x2c95b9) ||
              message.startsWith('8 ' + _0x2c95b9)) &&
            (usingNgspCommand = true)
        })
        if (usingNgspCommand) {
          return (
            mod.command.message(
              'You tried to use public chat for NGSP command. Message was blocked.'
            ),
            false
          )
        }
      }
    )
    this.destructor = () => {
      try {
        mod.command.remove(_0x11e88f)
      } catch (_0x591cea) {}
      mod.clearInterval(_0x1e5cb3)
      _0x29b399 &&
        (_0x29b399.removeAllListeners(), _0x29b399.close(), (_0x29b399 = null))
      if (_0x1412a9) {
        _0x1412a9.unregisterAll()
      }
    }
  }
}
module.exports = _0xc7c1e0
