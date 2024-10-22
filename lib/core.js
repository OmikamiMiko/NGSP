'use strict'
const { Vec3: _0x50b537, SkillID: _0x281678 } =
    require('tera-data-parser').types,
  _0x5970b2 = require('klona/lite').klona
class _0x2ce4ef {
  constructor(modManager) {
    const _holdInfiniteOrLockOn = ['holdInfinite', 'lockon'],
      thisObject = this
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_STICK_TO_USER_START'),
      (packet) => {
        if (modManager.me.isMe(packet.target)) {
          _stuckToUser = true
        }
      }
    )
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_STICK_TO_USER_END'),
      (packet) => {
        modManager.me.isMe(packet.target) && (_stuckToUser = false)
      }
    )
    _0x34bdf5.serverBehavior = null
    let _0x4b3a62 = false,
      _0x44c774 = new Map(),
      _alive = false,
      _0x5d99c1 = null,
      _0x921e5b = 2147483648,
      _0x5e5166 = null,
      _0x5068d7 = null,
      _0x109818 = null,
      _0x1f0535 = null,
      _boolFieldSetToTrueInOnServerActionStage = false,
      _0x27a682 = 0,
      _0x2d6461 = 0,
      _0x11740a = 0,
      _0x2edbb5 = 0,
      _0xd422b6 = 0,
      _0x568c94 = null,
      _0x4f91d9 = [],
      _0x3431a2 = [],
      _0x1bf2a8 = null,
      _0x3254f3 = null,
      _0x30ca69 = 0,
      _packetHandlers = [],
      _0x2cbe77 = false,
      _0x343e55 = false,
      _0x5db998 = false,
      _stuckToUser = false,
      _0x2d020a = true,
      _0x3a93d7 = false,
      _0x39a4c2 = null,
      _0x57622b = null,
      _0x364d01 = false,
      _0x92f88b = '',
      _0xd762a2 = !!modManager.mod.clientInterface,
      _0x1c5264 = 0
    if (modManager.state.config.enabled) {
      Initialize()
    }
    modManager.state.on('stateChanged', (_0x5312b3) => {
      if (_0x5312b3) {
        Initialize()
      } else {
        _0x4fb1df()
      }
    })
    function Initialize() {
      try {
        HookPacketHandler(...modManager.defs.getVersion('S_INSTANCE_ARROW'), OnServerInstanceArrow)
        HookPacketHandler(...modManager.defs.getVersion('S_DEFEND_SUCCESS'), OnServerDefendSuccess)
        HookPacketHandler(...modManager.defs.getVersion('S_CANNOT_START_SKILL'), OnServerCannotStartSkill)
        HookPacketHandler(...modManager.defs.getVersion('C_CAN_LOCKON_TARGET'), OnClientCanLockOnTarget)
        HookPacketHandler(...modManager.defs.getVersion('S_CAN_LOCKON_TARGET'), OnServerCanLockOnTarget)
        HookPacketHandler(
          ...modManager.defs.getVersion('C_PLAYER_LOCATION'),
          {
            order: 15,
            filter: { fake: null },
          },
          OnClientPlayerLocation
        )
        HookPacketHandler(...modManager.defs.getVersion('C_NOTIFY_LOCATION_IN_DASH'), OnClientNotifyLocationInDash)
        HookPacketHandler(...modManager.defs.getVersion('C_NOTIFY_LOCATION_IN_ACTION'), OnClientNotifyLocationInAction)
        for (let clientStartSkillPacketType of [
          modManager.defs.getVersion('C_START_SKILL'),
          modManager.defs.getVersion('C_START_TARGETED_SKILL'),
          modManager.defs.getVersion('C_START_COMBO_INSTANT_SKILL'),
          modManager.defs.getVersion('C_START_INSTANCE_SKILL'),
          modManager.defs.getVersion('C_START_INSTANCE_SKILL_EX'),
          modManager.defs.getVersion('C_PRESS_SKILL'),
          modManager.defs.getVersion('C_NOTIMELINE_SKILL'),
        ]) {
          HookPacketHandler(
            clientStartSkillPacketType[0],
            'raw',
            {
              order: -10,
              filter: { fake: null },
            },
            OnClientVariousStartSkills.bind(null, ...clientStartSkillPacketType)
          )
        }
        HookPacketHandler(...modManager.defs.getVersion('S_GRANT_SKILL'), OnServerGrantSkill)
        HookPacketHandler(...modManager.defs.getVersion('S_CONNECT_SKILL_ARROW'), OnServerConnectSkillArrow)
        HookPacketHandler(...modManager.defs.getVersion('S_INSTANT_DASH'), OnServerInstantDash)
        HookPacketHandler(...modManager.defs.getVersion('S_INSTANT_MOVE'), OnServerInstantMove)
        HookPacketHandler(...modManager.defs.getVersion('S_ACTION_END'), OnServerActionEnd)
        HookPacketHandler(...modManager.defs.getVersion('C_CANCEL_SKILL'), OnClientCancelSkill)
        HookPacketHandler(...modManager.defs.getVersion('S_ACTION_STAGE'), OnServerActionStage)
        HookPacketHandler(
          ...modManager.defs.getVersion('S_CREST_MESSAGE'),
          {
            order: -10,
            filter: { fake: null },
          },
          OnServerCrestMessage
        )
        for (let useItemPacketType of [
          modManager.defs.getVersion('C_USE_ITEM'),
          modManager.defs.getVersion('C_USE_PREMIUM_SLOT'),
        ]) {
          HookPacketHandler(
            useItemPacketType[0],
            useItemPacketType[1],
            {
              order: -10,
              filter: { fake: null },
            },
            OnClientUseItemOrPremiumSlot.bind(null, useItemPacketType[0])
          )
        }
        HookPacketHandler(...modManager.defs.getVersion('S_SYSTEM_MESSAGE'), OnServerSystemMessage)
      } catch (ex) {
        throw modManager.utils.NGSPError(
          'Critical error in core hooks initialization process! Usage in dat state impossible... ' +
            ex
        )
      }
    }
    function _0xd79881() {
      try {
        modManager.mod.manager.loadedModules.forEach((_0x19548f, _0x774eef) => {
          const _0x3a9192 = _0x774eef.toLowerCase()
          if (
            -1 !== _0x3a9192.indexOf('zsync') ||
            -1 !== _0x3a9192.indexOf('z-sync')
          ) {
            let _0x148490 = modManager.mod.manager.get(_0x3a9192)
            _0x148490 &&
              ((_0x92f88b = _0x3a9192),
              _0x148490.unloadNetworkInstance(modManager.mod.dispatch, false),
              (_0x364d01 = true))
          }
        })
      } catch (_0x4ac4f3) {}
    }
    function OnServerReturnToLobby() {
      if (_0x364d01) {
        let _0x3298ed = modManager.mod.manager.get(_0x92f88b)
        _0x3298ed.loadNetworkInstance(modManager.mod.dispatch, false)
        _0x364d01 = false
      }
    }
    !modManager.client && (_0x2d020a = false)
    function _0x4fb1df() {
      _packetHandlers.forEach((_0x467416) => modManager.mod.unhook(_0x467416))
      _packetHandlers = []
    }
    function HookPacketHandler(...parameters) {
      _packetHandlers.push(modManager.mod.hook(...parameters))
    }
    modManager.mod.hook('S_RETURN_TO_LOBBY', 'event', () => {
      OnServerReturnToLobby()
    })
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_LOAD_TOPO'),
      (packet) => {
        thisObject.currentBehavior = null
        thisObject.serverBehavior = null
        _0x2d6461 = 0
        _0x11740a = 0
        _0x2edbb5 = 0
        _0x5db998 = false
        _0x5dd376(37)
        _0x3a72df()
        modManager.state.config.enabled &&
        packet.zone === 118 &&
        !modManager.state.classDisabled &&
        !modManager.state.disabledByZone
          ? ((modManager.state.disabledByZone = true),
            modManager.state.SwitchEnableStateWithEvent())
          : !modManager.state.classDisabled &&
            modManager.state.disabledByZone &&
            !modManager.state.config.enabled &&
            packet.zone !== 118 &&
            ((modManager.state.disabledByZone = false),
            modManager.state.SwitchEnableStateWithEvent())
      }
    )
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_SPAWN_ME'),
      (packet) => {
        _0x2866a0(packet)
        _alive = packet.alive
      }
    )
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_CREATURE_LIFE'),
      (packet) => {
        if (!modManager.me.isMe(packet.gameId)) {
          return
        }
        _alive = packet.alive
        if (!_alive) {
          if (
            modManager.state.config.enabled &&
            modManager.state.config.useTestFeatures
          ) {
            _0x5dd376(23)
          }
          _0x3a72df()
          _0x1f0535 =
            thisObject.currentBehavior =
            thisObject.serverBehavior =
              null
          _0x5db998 = false
          _stuckToUser = false
          _0x39a4c2 = null
          _0x57622b = null
        }
      }
    )
    function OnClientPlayerLocation(inputParam) {
      modManager.state.config.debugLoc &&
        modManager.log.writeDebugMessage(
          '-> CPL (' +
            modManager.me.totalRunSpeed +
            '/' +
            modManager.me.totalWalkSpeed +
            ') ' +
            inputParam.type +
            ' ' +
            Math.round(inputParam.loc.dist2D(inputParam.dest)) +
            'u (' +
            modManager.utils.decimal(inputParam.loc.x, 2) +
            ', ' +
            modManager.utils.decimal(inputParam.loc.y, 2) +
            ', ' +
            modManager.utils.decimal(inputParam.loc.z, 2) +
            ' ) > (' +
            modManager.utils.decimal(inputParam.dest.x, 2) +
            ', ' +
            modManager.utils.decimal(inputParam.dest.y, 2) +
            ', ' +
            modManager.utils.decimal(inputParam.dest.z, 2) +
            ' ) ' +
            modManager.utils.degrees(inputParam.w)
        )
      let _0x55204c = false
      if (thisObject.currentBehavior) {
        _0x55204c = GetMySkillWithCache(thisObject.currentBehavior.skill)
        if (_0x55204c) {
          if (inputParam.type === 2) {
            _0x5dd376(33)
          } else {
            if (_0x55204c.distance) {
              return false
            }
          }
        }
      }
      const _0x198db7 = {
        loc:
          7 === inputParam.type
            ? inputParam.loc
            : inputParam.loc.addN(inputParam.dest).scale(0.5),
        w: _0x55204c && _0x55204c.endType51 ? _0x5e5166.w || 0 : inputParam.w,
      }
      _0x2866a0(_0x198db7)
    }
    const _0x228533 = [100, 114, 109, 75, 101, 121]
    function OnClientNotifyLocationInDash(_0x4a5450) {
      if (
        !thisObject.currentBehavior ||
        !thisObject.currentBehavior.skill.equals(_0x4a5450.skill) ||
        thisObject.currentBehavior.stage !== _0x4a5450.stage
      ) {
        if (modManager.state.config.debugLoc) {
          modManager.log.writeDebugMessage(
            '-> CNLID: ' +
              _0x4a5450.skill.id +
              ' ' +
              _0x4a5450.stage +
              ' (' +
              _0x4a5450.loc +
              ')X'
          )
        }
        return false
      }
      modManager.state.config.debugLoc &&
        modManager.log.writeDebugMessage(
          '-> CNLID: ' +
            _0x4a5450.skill.id +
            ' ' +
            _0x4a5450.stage +
            ' (' +
            _0x4a5450.loc +
            ')'
        )
      _0x2866a0(_0x4a5450, true)
    }
    modManager.mod.hook('S_LOGIN', 'event', () => {
      modManager.state.clearSkillDataCache()
      _0x5db998 = false
      if (modManager.me.isTBA) {
        modManager.state.config.enabled &&
          modManager.state.SwitchEnableStateWithEvent()
      } else {
        if (
          !modManager.utils.getSafe(modManager.state.preset, [
            modManager.me.job,
            'enabled',
          ]) &&
          modManager.state.config.enabled
        ) {
          modManager.state.classDisabled = true
          modManager.state.SwitchEnableStateWithEvent()
        } else {
          modManager.utils.getSafe(modManager.state.preset, [
            modManager.me.job,
            'enabled',
          ]) &&
            !modManager.state.config.enabled &&
            modManager.state.classDisabled &&
            ((modManager.state.classDisabled = false),
            modManager.state.SwitchEnableStateWithEvent())
        }
      }
      _0x35d560()
      if (modManager.state.config.enabled && !modManager.state.classDisabled) {
        _0xd79881()
      }
    })
    if (modManager.mod.majorPatchVersion >= 99) {
      modManager.mod.hook('TTB_S_CHANGE_HERO', 'event', () => {
        modManager.state.clearSkillDataCache()
        _0x5db998 = false
      })
    }
    function OnClientNotifyLocationInAction(inputParam) {
      if (
        !thisObject.currentBehavior ||
        !thisObject.currentBehavior.skill.equals(inputParam.skill) ||
        thisObject.currentBehavior.stage !== inputParam.stage
      ) {
        if (modManager.state.config.debugLoc) {
          modManager.log.writeDebugMessage(
            '-> CNLIA: ' +
              inputParam.skill.id +
              ' ' +
              inputParam.stage +
              ' (' +
              inputParam.loc +
              ')X'
          )
        }
        return false
      }
      modManager.state.config.debugLoc &&
        modManager.log.writeDebugMessage(
          '-> CNLIA: ' +
            inputParam.skill.id +
            ' ' +
            inputParam.stage +
            ' (' +
            inputParam.loc +
            ')'
        )
      let _0x4b26bc = GetMySkillWithCache(inputParam.skill)
      _0x2866a0(inputParam, true)
      if (_0x4b26bc && _0x4b26bc.controlCnlia) {
        if (_boolFieldSetToTrueInOnServerActionStage) {
          if (!thisObject.serverBehavior) {
            return false
          } else {
            if (!inputParam.skill.equals(thisObject.serverBehavior.skill)) {
              return (inputParam.skill = thisObject.serverBehavior.skill), true
            }
          }
        } else {
          return (
            _0x4f91d9.push([
              ...modManager.defs.getVersion('C_NOTIFY_LOCATION_IN_ACTION'),
              inputParam,
            ]),
            false
          )
        }
      }
    }
    function _0x41f7ea(skill) {
      if (_0x4f91d9.length > 0) {
        if (skill) {
          for (let [_0x418434, _0x5632f6, _0x17e18d] of _0x4f91d9) {
            modManager.mod.send(
              _0x418434,
              _0x5632f6,
              Object.assign(_0x17e18d, { skill: skill })
            )
          }
        }
        _0x4f91d9 = []
      }
    }
    const _0x1b02ef = [
      92, 92, 94, 218, 222, 200, 234, 216, 202, 92, 212, 230, 222, 220,
    ]
    function OnClientUseItemOrPremiumSlot(skill, item) {
      modManager.state.config.debugItems &&
        modManager.log.writeLogMessage(
          '-> ' + skill + ' with id: ' + item.id
        )
      let itemDataWithCache = GetItemDataWithCache(item.id)
      if (
        !itemDataWithCache ||
        !modManager.me.isItemFromInventory(item.id) ||
        modManager.cd.itemInCd(item.id)
      ) {
        return
      }
      if (
        itemDataWithCache &&
        Object.prototype.hasOwnProperty.call(itemDataWithCache, 'requiredLevel') &&
        itemDataWithCache.requiredLevel > modManager.me.level
      ) {
        return
      }
      modManager.cd.setItemCd(item.id, Date.now() + 600)
      _0x261405(
        {
          skipBehavior: true,
          packetName: false,
        },
        { info: itemDataWithCache }
      )
    }
    function OnClientVariousStartSkills(_0x2c6bf3, _0x1e00ce, _0x20e4cc, _0x528520) {
      if (_0x4b3a62) {
        return
      }
      let _0xb0919c = _0xd762a2
          ? modManager.mod.dispatch.fromRaw(_0x2c6bf3, _0x1e00ce, _0x528520)
          : modManager.mod.dispatch.fromRaw(
              _0x2c6bf3,
              _0x1e00ce,
              (_0x528520 = Buffer.from(_0x528520))
            ),
        _0x114eee = GetMySkillWithCache(_0xb0919c.skill),
        _0x1a79bb = GetMySkillWithCache(_0x28f17c(_0xb0919c.skill, 0))
      if (
        modManager.utils.getSafe(modManager.state.forcefulSkillExclude, [
          modManager.me.job,
          _0xb0919c.skill.id,
        ])
      ) {
        return
      }
      modManager.mod.clearTimeout(_0x5d99c1)
      let _0x38be53 = 0,
        _0x3a78bf = modManager.jitter.consumeDelay()
      if (_0x114eee) {
        if (modManager.state.config.jitterCompensation) {
          if (
            'holdInfinite' == _0x114eee.type &&
            _0x114eee.fastCastBlockCalibration &&
            'jitter' == modManager.state.config.fastCastBlockCalibrationType
          ) {
            _0x38be53 = Math.min(
              12,
              _0x3a78bf.gatheredJitter + _0x3a78bf.predictedJitter
            )
          } else {
            if ('charging' == _0x114eee.type) {
              _0x38be53 = Math.min(
                Math.max(
                  _0x3a78bf.gatheredJitter + _0x3a78bf.predictedJitter,
                  modManager.state.config.jitterCompensationChargesMin
                ),
                modManager.state.config.jitterCompensationChargesMax
              )
              Date.now() - _0xd422b6 <=
                modManager.state.config.skillRetryCount *
                  modManager.state.config.skillRetryMs && (_0x38be53 += 25)
            } else {
              if (
                _0x1a79bb &&
                'charging' == _0x1a79bb.type &&
                _0x114eee.noRetry &&
                modManager.state.config.advancedChargesRelease
              ) {
                let _0x32901b = _0x3a78bf.predictedJitter
                if (
                  Array.isArray(_0x1a79bb.length) &&
                  _0x3a78bf.lastServerStage >= _0x1a79bb.length.length - 1
                ) {
                  _0x32901b = 0
                }
                _0x38be53 = Math.min(
                  Math.max(
                    _0x3a78bf.gatheredJitter + _0x32901b,
                    modManager.state.config.jitterCompensationChargesMin
                  ),
                  modManager.state.config.jitterCompensationChargesMax
                )
              } else {
                if (
                  (_0x114eee.noRetry ||
                    _0x3a93d7 ||
                    _0x3a78bf.gatheredJitter >
                      modManager.state.config.skillRetryCount *
                        modManager.state.config.skillRetryMs) &&
                  'holdInfinite' != _0x114eee.type
                ) {
                  let _0x3bd6fa = _0x3a78bf.gatheredJitter
                  if (_0x114eee.maxAppliedJitter) {
                    _0x3bd6fa = Math.min(_0x114eee.maxAppliedJitter, _0x3bd6fa)
                  }
                  _0x38be53 = Math.min(
                    Math.max(
                      _0x3bd6fa,
                      modManager.state.config.jitterCompensationMin
                    ),
                    modManager.state.config.jitterCompensationMax
                  )
                }
              }
            }
          }
        }
        _0x38be53 += _0x114eee.forceDelay
          ? modManager.state.config.fastCastSkillsCalibrationTime
          : 0
      }
      if (modManager.state.config.debug) {
        let _0x209fc6 = ['->', _0x2c6bf3, _0xb0919c.skill.id]
        switch (_0x2c6bf3) {
          case 'C_START_SKILL':
            _0x209fc6.push(
              _0xb0919c.unk ? 1 : 0,
              _0xb0919c.moving ? 1 : 0,
              _0xb0919c.continue ? 1 : 0,
              _0xb0919c.unk2 ? 1 : 0
            )
            break
          case 'C_PRESS_SKILL':
            _0x209fc6.push(_0xb0919c.press)
            break
          case 'C_START_TARGETED_SKILL': {
            let _0x468dba = []
            for (let _0x23d8ee of _0xb0919c.targets) {
              _0x468dba.push(
                [_0x23d8ee.gameId.toString(), _0x23d8ee.unk].join(' ')
              )
            }
            _0x209fc6.push('[' + _0x468dba.join(',') + ']')
            break
          }
        }
        if (modManager.state.config.debugLoc) {
          _0x209fc6.push(
            '' + modManager.utils.degrees(_0xb0919c.w),
            '(' + modManager.utils.decimal(_0xb0919c.loc.x, 2),
            modManager.utils.decimal(_0xb0919c.loc.y, 2),
            modManager.utils.decimal(_0xb0919c.loc.z, 2) + ')'
          )
          if (
            'C_START_SKILL' == _0x2c6bf3 ||
            'C_START_TARGETED_SKILL' == _0x2c6bf3 ||
            'C_START_INSTANCE_SKILL_EX' == _0x2c6bf3
          ) {
            _0x209fc6.push(
              '>',
              '(' + Math.round(_0xb0919c.dest.x),
              Math.round(_0xb0919c.dest.y),
              Math.round(_0xb0919c.dest.z) + ')'
            )
          }
        }
        _0x38be53 && _0x209fc6.push('DELAY=' + _0x38be53)
        modManager.log.writeDebugMessage(..._0x209fc6)
      }
      modManager.mod.clearTimeout(_0x5d99c1)
      if (_0x38be53 > 0) {
        return (
          (_0x5d99c1 = modManager.mod.setTimeout(() => {
            if (
              false !== _0x2c33bf(_0x2c6bf3, _0xb0919c, _0x114eee, _0x528520)
            ) {
              _0x4a929d(_0x528520)
            }
          }, _0x38be53)),
          false
        )
      }
      return _0x2c33bf(_0x2c6bf3, _0xb0919c, _0x114eee, _0x528520)
    }
    const _0x504705 = [115, 101, 114, 118, 101, 114, 115]
    function _0x14084e(_0x43506c, _0x259b95, _0x3499dd, _0x260007) {
      if (
        thisObject.currentBehavior &&
        thisObject.currentBehavior.skill.equals(_0x259b95)
      ) {
        if ('hold' == _0x3499dd.type || 'holdInfinite' == _0x3499dd.type) {
          _0x2866a0(_0x43506c)
          if (_0x3499dd.chainOnRelease) {
            _0x5dd376(11)
            _0x3499dd = GetMySkillWithCache(
              (_0x259b95 = _0x28f17c(_0x259b95, _0x3499dd.chainOnRelease))
            )
            if (!_0x3499dd) {
              return
            }
            const _0x2b1d30 = _0x3499dd.fixedSpeed || modManager.me.aspd,
              _0x4e256d = {
                skipBehavior: false,
                packetName: false,
              }
            const _0x3dbc26 = {
              skill: _0x259b95,
              info: _0x3499dd,
              stage: 0,
              realSpeed: _0x2b1d30,
              timeSpeed: _0x2b1d30,
              animSpeed: _0x2b1d30,
            }
            _0x261405(_0x4e256d, _0x3dbc26)
          } else {
            _0x5dd376(_0x3499dd.endType51 ? 51 : 10)
          }
        } else {
          if ('charging' == _0x3499dd.type) {
            modManager.state.config.advancedChargesRelease &&
              _0xa41fae(_0x259b95, _0x3499dd, thisObject.currentBehavior.stage)
            return
          }
        }
      } else {
        if ('grantCharge' == _0x3499dd.type) {
          _0xa41fae(_0x259b95, _0x3499dd, _0x27a682)
        } else {
          if (
            thisObject.currentBehavior &&
            !thisObject.currentBehavior.skill.equals(_0x259b95) &&
            _0x3499dd.type &&
            'charging' == _0x3499dd.type &&
            GetMySkillWithCache(thisObject.currentBehavior.skill) &&
            GetMySkillWithCache(thisObject.currentBehavior.skill).type &&
            'charging' == GetMySkillWithCache(thisObject.currentBehavior.skill).type
          ) {
            return _0x5ed407(_0x259b95), false
          } else {
            if (
              _0x3499dd.canInstantCharge &&
              _0x3499dd.canInstantCharge.stage
            ) {
              if (modManager.state.config.advancedChargesRelease) {
                if (
                  !modManager.abn.exists(_0x3499dd.canInstantCharge.abnormal)
                ) {
                  _0x5ed407(_0x259b95)
                  return
                }
                _0x2866a0(_0x43506c, false, _0x260007)
                _0x5dd376(4)
                _0xa41fae(
                  _0x259b95,
                  _0x3499dd,
                  _0x3499dd.canInstantCharge.stage
                )
              }
            }
          }
        }
      }
      return
    }
    function _0x430e6b(_0x2c05bc, _0x53e9af) {
      _0x5dd376(6)
      modManager.state.config.advancedChargesRelease &&
        ((_0x5db998 = true),
        _0x3431a2.push(
          modManager.mod.setTimeout(() => {
            _0xa41fae(_0x2c05bc, _0x53e9af, 3)
            _0x5db998 = false
          }, 25)
        ))
    }
    function _0x3193cb(_0x382050, _0x2ce1d0, _0x4e0bf0, _0x2e6353) {
      let _0x19725d = true
      switch (thisObject.currentBehavior.skill.type) {
        case 1:
          _0x2cbe77 &&
            15 == _0x2ce1d0 &&
            14 == _0x4e0bf0 &&
            (modManager.mod.setTimeout(() => {
              _0x343e55 = false
            }, modManager.ping.max),
            (_0x2cbe77 = false),
            modManager.state.config.debug &&
              modManager.log.writeDebugMessage('Chained VB disabled'))
          if (
            modManager.state.sharedSkills[thisObject.currentBehavior.skill.id]
          ) {
            _0x19725d = false
          } else {
            if (
              _0x382050.noInterrupt &&
              (-1 !== _0x382050.noInterrupt.indexOf(_0x2ce1d0) ||
                -1 !==
                  _0x382050.noInterrupt.indexOf(_0x2ce1d0 + '-' + _0x4e0bf0))
            ) {
              _0x19725d = false
              if (_0x382050.abnormalInterruption) {
                for (let _0x1307ad in _0x382050.abnormalInterruption) {
                  if (modManager.abn.exists(_0x1307ad)) {
                    const _0x50db68 = _0x382050.abnormalInterruption[_0x1307ad]
                    if (Array.isArray(_0x50db68)) {
                      if (-1 !== _0x50db68.indexOf(_0x2ce1d0)) {
                        _0x19725d = true
                      }
                    } else {
                      ;(_0x2ce1d0 == _0x50db68 ||
                        'all' === _0x50db68 ||
                        ('others' === _0x50db68 && _0x2ce1d0 !== _0x2e6353)) &&
                        (_0x19725d = true)
                    }
                  }
                }
              }
            }
          }
          if (_0x19725d && 'storeCharge' == _0x382050.type) {
            _0x27a682 = thisObject.currentBehavior.stage
          }
          break
        case 2:
          _0x19725d = false
          if (
            thisObject.currentBehavior.air &&
            _0x382050.useSkillWhileAirReaction
          ) {
            _0x19725d = true
          } else {
            modManager.state.baseData.knockdowns[modManager.me.job][
              thisObject.currentBehavior.skill.id
            ] &&
              'stand' == _0x382050.realType &&
              (_0x19725d = true)
          }
          break
      }
      return _0x19725d
    }
    function _0x163295(_0x4b5154, _0x2ea0d6, _0x220652) {
      const _0x11fc28 = {
        data: void 0,
        type: void 0,
      }
      let _0x5a7a2a = _0x11fc28
      if (_0x4b5154.multiAbnormalChains) {
        const _0xf6cb7b = _0x4b5154.multiAbnormalChains
        for (let _0x124220 of Object.keys(_0xf6cb7b)) {
          const _0x4660b5 = _0xf6cb7b[_0x124220],
            _0x4c4f81 = modManager.abn.getIntersect(_0x4660b5.intersect)
          if (_0x4c4f81 && _0x4c4f81.length == _0x4660b5.intersect.length) {
            let _0x2d4c37 = false
            if (_0x4660b5.redirectedSkillChains) {
              _0x2d4c37 = _0x4660b5.redirectedSkillChains
              _0x5a7a2a.type = 'skill'
            } else {
              _0x4660b5.redirectedSkillArrowChains &&
                ((_0x2d4c37 = _0x4660b5.redirectedSkillArrowChains),
                (_0x5a7a2a.type = 'arrow'))
            }
            if (_0x2d4c37) {
              _0x5a7a2a.data =
                _0x2d4c37['*'] ||
                _0x2d4c37[_0x2ea0d6 + '-' + _0x220652] ||
                _0x2d4c37[_0x2ea0d6]
              if (void 0 != _0x5a7a2a.data) {
                break
              }
            }
            if (void 0 == _0x5a7a2a.data) {
              _0x5a7a2a.data = _0x4660b5.redirect
              void 0 != _0x5a7a2a.data && (_0x5a7a2a.type = 'abnormal')
              break
            }
          }
        }
      }
      if (void 0 == _0x5a7a2a.data) {
        for (let _0x544840 in _0x4b5154.abnormalChains) {
          if (modManager.abn.exists(Number(_0x544840))) {
            _0x5a7a2a.data = _0x4b5154.abnormalChains[_0x544840]
            void 0 != _0x5a7a2a.data && (_0x5a7a2a.type = 'abnormal')
            break
          }
        }
      }
      if (void 0 == _0x5a7a2a.data) {
        for (let _0x548afd in _0x4b5154.glyphsChains) {
          if (modManager.me.isGlyphExists(_0x548afd)) {
            let _0x24112b = _0x4b5154.glyphsChains[_0x548afd]
            _0x5a7a2a.data = _0x24112b.sub
            _0x5a7a2a.type = 'skill'
          }
        }
      }
      if (void 0 == _0x5a7a2a.data && thisObject.currentBehavior) {
        const _0x8f132e = _0x4b5154.chains,
          _0x4ab69e = _0x4b5154.arrowChains
        if (_0x8f132e) {
          _0x5a7a2a.data =
            _0x8f132e['*'] ||
            _0x8f132e[_0x2ea0d6 + '-' + _0x220652] ||
            _0x8f132e[_0x2ea0d6]
          void 0 != _0x5a7a2a.data && (_0x5a7a2a.type = 'skill')
        }
        if (_0x4ab69e) {
          _0x5a7a2a.data =
            _0x4ab69e['*'] ||
            _0x4ab69e[_0x2ea0d6 + '-' + _0x220652] ||
            _0x4ab69e[_0x2ea0d6]
          if (void 0 != _0x5a7a2a.data) {
            _0x5a7a2a.type = 'arrow'
          }
        }
      }
      return _0x5a7a2a
    }
    function _0x2c33bf(_0x3aa6b1, _0x3d9680, _0x5bd19a, _0x1f14e7) {
      if (_0x5db998) {
        return false
      }
      _boolFieldSetToTrueInOnServerActionStage = false
      let _0x47505a = _0x3d9680.dest
      if (!_0x5bd19a) {
        return
      }
      let _0x938983 = _0x3d9680.skill.clone(),
        _0x6a2f24 = modManager.utils.getSkillBase(_0x938983.id),
        _0xa92291 = thisObject.currentBehavior
          ? modManager.utils.getSkillBase(thisObject.currentBehavior.skill.id)
          : void 0,
        _0x3d04e8 = thisObject.currentBehavior
          ? modManager.utils.getSkillSub(thisObject.currentBehavior.skill.id)
          : void 0,
        _0x41b2e2 = 0
      if (!_0x8e5340(_0x6a2f24, _0x3d9680, _0x938983, _0x5bd19a)) {
        return _0x5ed407(_0x3d9680.skill), false
      }
      if (
        'C_PRESS_SKILL' == _0x3aa6b1 &&
        _0x3d9680.press &&
        3 == modManager.me.job
      ) {
        if (!_0x2cbe77 && 15 == _0x6a2f24 && _0x343e55) {
          return false
        }
        if (10 == _0x6a2f24 && modManager.abn.exists(401701)) {
          _0x430e6b(_0x938983, _0x5bd19a)
          return
        }
      }
      if (
        'C_PRESS_SKILL' == _0x3aa6b1 &&
        !_0x3d9680.press &&
        !(_0x2cbe77 && 3 == modManager.me.job && 15 == _0x6a2f24)
      ) {
        if (
          3 == modManager.me.job &&
          10 == _0x6a2f24 &&
          modManager.abn.exists(401701)
        ) {
          return
        }
        return _0x14084e(_0x3d9680, _0x938983, _0x5bd19a, _0x47505a)
      }
      if (
        thisObject.currentBehavior &&
        !_0x3193cb(_0x5bd19a, _0xa92291, _0x3d04e8, _0x6a2f24)
      ) {
        return _0x5ed407(_0x3d9680.skill), false
      }
      let _0x45f74d = _0x163295(_0x5bd19a, _0xa92291, _0x3d04e8)
      if (void 0 != _0x45f74d.data) {
        _0x938983 =
          _0x45f74d.data >= 100
            ? new _0x281678(_0x45f74d.data)
            : _0x28f17c(_0x938983, _0x45f74d.data)
        _0x41b2e2 = _0x570c6d[_0x5bd19a.type] || 4
        if ('arrow' === _0x45f74d.type) {
          _0x2866a0(_0x3d9680, false, _0x47505a)
          _0x5dd376(_0x41b2e2)
          _0x52b561(_0x938983)
          return
        }
      } else {
        _0x41b2e2 = _0x570c6d[_0x5bd19a.type] || 6
      }
      if (_0x5bd19a.onlyDefenceSuccess) {
        if (
          thisObject.currentBehavior &&
          thisObject.currentBehavior.defendSuccess
        ) {
          _0x41b2e2 = 3
        } else {
          return (
            _0x5ed407(_0x3d9680.skill),
            _0x4c0421('SMT_SKILL_ONLY_DEFENCE_SUCCESS'),
            false
          )
        }
      }
      if (!_0x938983.equals(_0x3d9680.skill)) {
        _0x5bd19a = GetMySkillWithCache(_0x938983)
        if (!_0x5bd19a) {
          if ('C_NOTIMELINE_SKILL' != _0x3aa6b1) {
            _0x2866a0(_0x3d9680, false, _0x47505a)
          }
          return
        }
        _0x3d9680.skill = _0x938983.clone()
      }
      if (
        _0x5bd19a.enableOnAbnormal &&
        !modManager.abn.hasIntersect(_0x5bd19a.enableOnAbnormal)
      ) {
        return _0x5ed407(_0x3d9680.skill), false
      }
      if (
        _0x5bd19a.disableOnAbnormal &&
        modManager.abn.hasIntersect(_0x5bd19a.disableOnAbnormal)
      ) {
        return _0x5ed407(_0x3d9680.skill), false
      }
      'C_NOTIMELINE_SKILL' != _0x3aa6b1 &&
        _0x2866a0(_0x3d9680, false, _0x47505a)
      _0x5068d7 = _0x5e5166
      if (_0x5bd19a.abnormals) {
        for (let _0xcb8f7b in _0x5bd19a.abnormals) {
          let _0x1e0d3b = _0xcb8f7b.trim()
          if (modManager.abn.exists(_0x1e0d3b)) {
            let _0x14163e = _0x5bd19a.abnormals[_0xcb8f7b]
            _0x14163e.replaceChain &&
              _0x45f74d.type &&
                (_0x938983 = _0x28f17c(_0x938983, _0x14163e.replaceChain))
            _0x14163e.chain &&
              (_0x938983 = _0x28f17c(_0x938983, _0x14163e.chain))
            _0x14163e.skill && (_0x938983 = new _0x281678(_0x14163e.skill))
          }
        }
      }
      if (!_0x938983.equals(_0x3d9680.skill)) {
        _0x5bd19a = GetMySkillWithCache(_0x938983)
        if (!_0x5bd19a) {
          return
        }
      }
      if (modManager.cd.skillIdInCd(_0x938983.id)) {
        return _0x5ed407(_0x3d9680.skill), false
      }
      if (_0x41b2e2) {
        _0x3d9680.continue ? _0x52484f() : _0x5dd376(_0x41b2e2)
      }
      let {
        realSpeed: _0x5b8818,
        timeSpeed: _0x44e3c8,
        animSpeed: _0x357c6b,
        glyphAnimSeq: _0x449409,
        effectScale: _0x476dae,
        distanceMult: _0x1331d2,
        stamina: _0x2811fb,
        slowsPrint: _0x59eb4a,
      } = _0x28acbf(_0x3aa6b1, _0x6a2f24, _0x5bd19a)
      if (_0x2811fb) {
        if (modManager.me.currentStamina < _0x2811fb) {
          return (
            _0x5ed407(_0x3d9680.skill),
            _0x3f26c1(modManager.me.lowStaminaSystemMessage),
            false
          )
        }
        _0x5bd19a.instantStamina && (modManager.me.currentStamina -= _0x2811fb)
      }
      if (!_0x44c774.has(_0x6a2f24)) {
        if (_0x5bd19a.actionEndLock || _0x5bd19a.virtualActionEndLock) {
          _0x44c774.set(_0x6a2f24, 0)
          modManager.state.config.debug &&
            modManager.log.writeDebugMessage(
              '<I> Block S ' +
                _0x6a2f24 +
                ' for ' +
                modManager.utils.decimal(
                  _0x5bd19a.actionEndLock || _0x5bd19a.virtualActionEndLock,
                  2
                ) +
                'ms.'
            )
        } else {
          if (_0x5bd19a.actionStageLock) {
            _0x44c774.set(_0x6a2f24, 0)
            let _0x1adc37 =
              _0x5bd19a.actionStageLock.time || _0x5bd19a.actionStageLock
            !_0x5bd19a.fixedSpeed &&
              !_0x5bd19a.actionStageLock.fixedSpeed &&
              (_0x1adc37 /= _0x5b8818)
            _0x3451ba(_0x6a2f24, _0x1adc37)
            modManager.state.config.debug &&
              modManager.log.writeDebugMessage(
                '<I> Block S ' +
                  _0x6a2f24 +
                  ' for ' +
                  modManager.utils.decimal(_0x1adc37, 2) +
                  'ms.'
              )
          } else {
            !_0x5bd19a.actionStageLock && _0x3a72df()
          }
        }
      }
      const _0x1bf874 =
          _0x5bd19a.canInstantCharge &&
          modManager.abn.exists(_0x5bd19a.canInstantCharge.abnormal) &&
          _0x5bd19a.length
            ? _0x5bd19a.length.length || 1
            : 0,
        _0x84e802 = {
          skipBehavior: 'C_NOTIMELINE_SKILL' === _0x3aa6b1,
          packetName: _0x3aa6b1,
        }
      const _0x419c3e = {
        skill: _0x938983,
        info: _0x5bd19a,
        stage: _0x1bf874,
        realSpeed: _0x5b8818,
        timeSpeed: _0x44e3c8,
        animSpeed: _0x357c6b,
        movement: _0x449409,
        moving: 'C_START_SKILL' == _0x3aa6b1 && 1 == _0x3d9680.moving,
        effectScale: _0x476dae,
        distanceMult: _0x1331d2,
        slowsPrint: _0x59eb4a,
        targets: _0x3d9680.targets || {},
        dest: _0x3d9680.dest,
        endpoints: _0x3d9680.endpoints,
      }
      _0x261405(_0x84e802, _0x419c3e)
      _0x3a93d7 = _0x5bd19a.delayedRetry
      let _0x4bdb50 =
        _0x5bd19a.noRetry ||
        (_0x5bd19a.noRetryWithAbnormal &&
          modManager.abn.exists(_0x5bd19a.noRetryWithAbnormal))
      !_0x4bdb50 &&
        _0x301361(
          _0x42e64f(_0x5bd19a),
          _0x5bd19a.delayedRetry ? 45 : modManager.state.config.skillRetryMs,
          () => {
            if (
              _0x5bd19a.retryAlways ||
              (thisObject.currentBehavior &&
                thisObject.currentBehavior.skill.equals(_0x938983) &&
                !_boolFieldSetToTrueInOnServerActionStage)
            ) {
              return _0x4a929d(_0x1f14e7)
            }
            return false
          }
        )
    }
    function _0x42e64f(_0x2f3bb4) {
      let _0x4a86b8 = 0
      if (
        'holdInfinite' == _0x2f3bb4.type &&
        _0x2f3bb4.fastCastBlockCalibration &&
        'retry' == modManager.state.config.fastCastBlockCalibrationType
      ) {
        _0x4a86b8 = 1
      } else {
        !_0x2f3bb4.fastCastBlockCalibration &&
          (_0x4a86b8 = _0x2f3bb4.delayedRetry
            ? 8
            : _0x2f3bb4.maxRetryCount
            ? Math.min(
                _0x2f3bb4.maxRetryCount,
                modManager.state.config.skillRetryCount
              )
            : modManager.state.config.skillRetryCount)
      }
      return _0x4a86b8
    }
    function _0x9bb73b(_0x30e75a) {
      let _0x3a9ffb = [],
        _0x31c222 = { _0x27282b: modManager.abn.getStacks(_0x27282b) },
        _0x30e79e = { _0x27282b: modManager.abn.getStacks(_0x27282b) },
        _0x3e637b = { _0x27282b: modManager.abn.getStacks(_0x27282b) }
      let _0xe81bff = 1
      for (let _0x37aaa4 = 0; _0x37aaa4 < _0x30e75a.length; _0x37aaa4++) {
        const _0x27282b = Number(_0x30e75a[_0x37aaa4]),
          _0x5d9247 = modManager.state.slows[_0x27282b]
        switch (_0x5d9247.method) {
          case 1:
            _0x3a9ffb.push(Number(_0x5d9247.value))
            break
          case 2:
            break
          case 3:
            break
          case 4:
            break
        }
      }
      for (let _0x38370a = 0; _0x38370a < _0x3a9ffb.length; _0x38370a++) {
        _0xe81bff = _0x3a9ffb[_0x38370a]
      }
      for (let _0x1a4d70 of Object.keys(_0x31c222)) {
        _0xe81bff +=
          Number(modManager.state.slows[_0x1a4d70].value) * _0x31c222[_0x1a4d70]
      }
      for (const _0x29bc0f of Object.keys(_0x30e79e)) {
        _0xe81bff +=
          (Number(modManager.state.slows[_0x29bc0f].value) - 1) *
          _0x30e79e[_0x29bc0f] *
          1
      }
      for (const _0x3d4354 of Object.keys(_0x3e637b)) {
        _0xe81bff *=
          _0x3e637b[_0x3d4354] * modManager.state.slows[_0x3d4354].value
      }
      return modManager.state.loadFinish
        ? Math.max(0.0010000000002037268, _0xe81bff)
        : 1
    }
    const _0x1932d7 = 'mod'
    function _0x8e5340(_0x1d9a60, _0x12a957, _0x85c0c1, _0x1ed620) {
      if (!_alive) {
        return false
      }
      if (modManager.me.inGacha) {
        return false
      }
      if (_0x1ed620.onlyOutOfCombat && modManager.me.inCombat) {
        return false
      }
      if (_0x1ed620.strictCooldown && modManager.cd.skillIdInCd(_0x85c0c1.id)) {
        return false
      }
      if (_stuckToUser && !_0x1ed620.useSkillWhileBulldozer) {
        return false
      }
      if (modManager.me.mounted) {
        return _0x3f26c1('SMT_PROHIBITED_ACTION_ON_RIDE'), false
      }
      if (!modManager.me.equippedWeapon && _0x1ed620.needWeapon) {
        return _0x3f26c1('SMT_BATTLE_SKILL_NEED_WEAPON'), false
      }
      if (
        _0x1ed620.onlyTarget &&
        (_0x12a957.targets[0].gameId === BigInt(0) ||
          -1 === modManager.area.getTypeByGameId(_0x12a957.targets[0].gameId) ||
          3 === modManager.area.getTypeByGameId(_0x12a957.targets[0].gameId))
      ) {
        return false
      }
      if (_0x1ed620.strictCategory && !_0x27442c(_0x1ed620)) {
        return false
      }
      if (!_0x153329(_0x1ed620)) {
        return false
      }
      if (_0x44c774.has(_0x1d9a60)) {
        return (
          modManager.state.config.debug &&
            modManager.log.writeDebugMessage(
              '<I> Skill ' + _0x1d9a60 + ' is blocked.'
            ),
          false
        )
      }
      return true
    }
    function _0x153329(_0x2cdf00) {
      let _0x1df574 = null
      for (const _0x24db08 of modManager.abn.getIntersect(
        modManager.state.ccKeys
      )) {
        ;(modManager.utils.arraysHasIntersect(
          _0x2cdf00.category,
          modManager.state.cc[_0x24db08].category
        ) ||
          0 === modManager.state.cc[_0x24db08].category[0]) &&
          (_0x1df574 = false)
      }
      return null === _0x1df574 && (_0x1df574 = true), _0x1df574
    }
    function _0x27442c(_0x513ebe) {
      if (!modManager.me.isCategoriesEnabled(_0x513ebe.category)) {
        return false
      }
      return true
    }
    const _0x43e6c8 = [25, 27, 33, 34, 37]
    function _0x28acbf(_0x3c56d7, _0x5ab171, _0x2919bd) {
      let _0x19c997 = 1,
        _0x4696e3 = 1,
        _0x55dd13 = 0,
        _0x562399 = 1,
        _0xc3415e = 1,
        _0x3d9948 = 0,
        _0x1c23f4 = Object.keys(modManager.abn.abnormies),
        _0x40255c = null,
        _0x17717e = 0,
        _0x2e294e = 0,
        _0x300f1c = 0,
        _0x3fcf58 = 0,
        _0x1d4e41 = modManager.utils.arraysIntersect(
          _0x1c23f4,
          modManager.state.slowsKeys
        ),
        _0x504949 = modManager.utils.arraysIntersect(
          _0x1c23f4,
          modManager.state.buffKeys
        )
      if (_0x504949) {
        for (let _0x91c530 of _0x504949) {
          let _0x20b25d = modManager.state.buffs[_0x91c530]
          if (
            _0x20b25d &&
            (modManager.utils.arraysHasIntersect(
              _0x20b25d.category,
              _0x2919bd.category
            ) ||
              203 == _0x20b25d.type ||
              (29 == _0x20b25d.type && 0 == _0x20b25d.category[0]) ||
              (236 == _0x20b25d.type && 0 == _0x20b25d.category[0]))
          ) {
            switch (_0x20b25d.type) {
              case 235:
                _0x4696e3 < _0x20b25d.value && (_0x4696e3 = _0x20b25d.value)
                break
              case 29:
                _0x55dd13 += _0x20b25d.value
                break
              case 236:
                _0x55dd13 += _0x20b25d.value
                break
              case 239:
                _0x3d9948 += _0x20b25d.value
                break
              case 203:
                _0x20b25d.value2 &&
                  _0x20b25d.value2[modManager.me.job] &&
                  _0x20b25d.value2[modManager.me.job][_0x5ab171] &&
                  (_0xc3415e += _0x20b25d.value2[modManager.me.job][_0x5ab171])
                break
            }
          }
        }
      }
      let _0x1dee08 = _0x2919bd.movable
          ? modManager.me.aspd
          : _0x2919bd.fixedSpeed || modManager.me.aspd,
        _0x218fd3 = 1,
        _0x10a3ba = 1,
        _0x15d6b0 = _0x2919bd.stamina ? _0x2919bd.stamina + _0x3d9948 : false,
        _0x1ba2dc = modManager.utils.arraysIntersect(
          [
            ...modManager.me.currentGlyphs,
            ...modManager.me.passives,
            ...modManager.me.bodyRolls,
          ],
          modManager.state.passivesKeys
        )
      for (let _0x384572 of _0x1ba2dc) {
        let _0x49d972 = modManager.state.passives[_0x384572]
        if (
          modManager.utils.arraysHasIntersect(
            _0x49d972.category,
            _0x2919bd.category
          )
        ) {
          switch (_0x49d972.type) {
            case 218:
              _0x19c997 += _0x49d972.value
              break
            case 220:
              _0x55dd13 += _0x49d972.value
              break
            case 82:
              _0x15d6b0 += _0x49d972.value
              break
            case 77:
              3 === _0x49d972.method
                ? (_0x3fcf58 += Math.max(0, _0x49d972.value - 1))
                : (_0x300f1c += _0x49d972.value)
              break
            case 217:
              ;('C_START_INSTANCE_SKILL' === _0x3c56d7 ||
                'C_START_COMBO_INSTANT_SKILL' === _0x3c56d7) &&
                (_0x2e294e += _0x49d972.value)
              break
            case 71:
              ;(_0x562399 *= _0x49d972.value), (_0x40255c = _0x49d972.value2)
              break
          }
        }
      }
      if (_0x2919bd.talents) {
        for (let _0x351c18 of _0x2919bd.talents) {
          if (modManager.me.isTalentExist(_0x351c18)) {
            const _0x127944 =
              modManager.state.talents[_0x351c18][
                modManager.me.getTalentLevel(_0x351c18)
              ]
            if (
              _0x127944.withAbnormal &&
              !(Array.isArray(_0x127944.withAbnormal)
                ? modManager.abn.hasIntersect(_0x127944.withAbnormal)
                : modManager.abn.exists(_0x127944.withAbnormal))
            ) {
              continue
            }
            switch (_0x127944.type) {
              case 218:
                _0x19c997 += _0x127944.value
                break
              case 220:
                _0x55dd13 += _0x127944.value
                break
            }
          }
        }
      }
      if (modManager.state.loadFinish && _0x2919bd.polishing) {
        if (modManager.me.isPolishingExist(_0x2919bd.polishing)) {
          const _0x4d500c = modManager.state.polishing[_0x2919bd.polishing]
          let _0x213dc2 = _0x4d500c.value
          _0x4d500c.withAbnormal &&
            !modManager.abn.exists(_0x4d500c.withAbnormal) &&
            (_0x213dc2 = 0)
          if (218 === _0x4d500c.type) {
            _0x19c997 += _0x213dc2
          } else {
            if (220 === _0x4d500c.type) {
              _0x55dd13 += _0x213dc2
            }
          }
        }
      }
      7 == modManager.me.job &&
        modManager.me.isPolishingEffectExist(805) &&
        -1 !== _0x43e6c8.indexOf(_0x5ab171) &&
        modManager.abn.exists(702000) &&
        (_0x3fcf58 += (modManager.me.getPolishingEffectByGroup(805) % 100) / 100)
      _0x17717e = Math.max(1, _0x2e294e)
      _0x17717e = (_0x17717e + _0x300f1c) * (1 + _0x3fcf58)
      _0x1dee08 =
        (_0x1dee08 * _0x19c997 * _0x4696e3 * _0xc3415e +
          ('charging' === _0x2919bd.type ? _0x55dd13 : 0)) *
        (_0x2919bd.chargeRate || 1)
      !_0x2919bd.fixedSpeed &&
        !_0x2919bd.movable &&
        ((_0x218fd3 =
          'charging' === _0x2919bd.type ? modManager.me.aspd : _0x1dee08),
        (_0x10a3ba = _0x1dee08))
      const _0xd100f5 = {}
      return (
        (_0xd100f5.realSpeed = _0x1dee08),
        (_0xd100f5.timeSpeed = _0x218fd3),
        (_0xd100f5.animSpeed = _0x10a3ba),
        (_0xd100f5.stamina = _0x15d6b0),
        (_0xd100f5.effectScale = _0x17717e),
        (_0xd100f5.distanceMult = _0x562399),
        (_0xd100f5.slowsPrint = _0x1d4e41),
        (_0xd100f5.glyphAnimSeq = _0x40255c),
        _0xd100f5
      )
    }
    function _0x4a929d(..._0x453948) {
      _0x4b3a62 = true
      let _0x52177f = modManager.mod.toServer(..._0x453948)
      _0x4b3a62 = false
      return _0x52177f
    }
    function OnClientCancelSkill(packet) {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '-> C_CANCEL_SKILL ' + packet.skill.id + ' ' + packet.type
        )
      if (0 === packet.skill.id) {
        return false
      }
      if ([193010, 193110, 53010, 53110].includes(packet.skill.id)) {
        return false
      }
      if (!thisObject.currentBehavior) {
        return
      }
      let mySkillWithCache = GetMySkillWithCache(thisObject.currentBehavior.skill)
      mySkillWithCache &&
        ('lockon' == mySkillWithCache.type ||
          29 == packet.type ||
          30 == packet.type) &&
          _0x5dd376(packet.type)
    }
    function OnServerActionStage(packet) {
      if (!modManager.me.isMe(packet.gameId)) {
        return
      }
      if (modManager.state.config.debug) {
        let _0x23929e = Date.now() - _0x30ca69,
          loggingParameters = [
            GetMySkillWithCache(packet.skill) ? '<X' : '<-',
            'S_ACTION_STAGE',
            packet.skill.id,
            packet.stage,
            modManager.utils.decimal(packet.speed, 3) +
              ' ' +
              modManager.utils.decimal(packet.projectileSpeed, 3),
            packet.id,
          ]
        modManager.state.config.debugLoc &&
          loggingParameters.push(
            modManager.utils.degrees(packet.w),
            '(' + Math.round(packet.loc.x),
            Math.round(packet.loc.y),
            Math.round(packet.loc.z) + ')'
          )
        thisObject.serverBehavior &&
          loggingParameters.push(
            modManager.utils.decimal(
              thisObject.serverBehavior.loc.dist2D(packet.loc),
              3
            ) + 'u',
            _0x23929e + 'ms',
            '(' + Math.round(_0x23929e * thisObject.serverBehavior.speed) + 'ms)'
          )
        if (packet.animSeq.length > 0) {
          let loggingAnimSeqs = []
          for (let animSeq of packet.animSeq) {
            loggingAnimSeqs.push(
              animSeq.duration +
                ' ' +
                animSeq.xyRate +
                ' ' +
                animSeq.zRate +
                ' ' +
                animSeq.distance
            )
          }
          loggingParameters.push('(' + loggingAnimSeqs.join(', ') + ')')
        }
        modManager.log.writeDebugMessage(...loggingParameters)
        _0x30ca69 = Date.now()
      }
      let mySkillFromCache = GetMySkillWithCache(packet.skill)
      if (mySkillFromCache) {
        if (
          thisObject.currentBehavior &&
          packet.skill.type === thisObject.currentBehavior.skill.type &&
          Math.floor(packet.skill.id / 100) ===
            Math.floor(thisObject.currentBehavior.skill.id / 100) &&
          packet.stage === thisObject.currentBehavior.stage
        ) {
          modManager.mod.clearTimeout(_0x568c94)
          _boolFieldSetToTrueInOnServerActionStage = true
          if (
            modManager.state.loadFinish &&
            modManager.state.config.resyncZ &&
            packet.dest &&
            0 != packet.dest.x &&
            0 != packet.dest.y &&
            0 != packet.dest.z
          ) {
            if (
              Math.abs(packet.dest.z - _0x5e5166.loc.z) >=
              modManager.state.zCorrectionDiff
            ) {
              _0x5e5166.loc.z =
                packet.dest.z + modManager.state.zCorrectionBonus
            }
          }
          _0x41f7ea(packet.skill)
        }
        if (packet.animSeq.length > 0) {
          if (mySkillFromCache.forceClip) {
            let totalDistance = 0
            for (let animSeq of packet.animSeq) {
              totalDistance += animSeq.distance
            }
            mySkillFromCache.distance < 0 && (totalDistance = -totalDistance)
            totalDistance -= modManager.state.distanceCorrectionBonus
            _0x1f0535 = _0x5bb145(_0x5068d7, totalDistance)
            ;(!thisObject.currentBehavior ||
              thisObject.currentBehavior.skill.id != packet.skill.id) &&
              _0x425756(_0x1f0535)
          }
        }
        return (
          thisObject.serverBehavior &&
            thisObject.serverBehavior == thisObject.currentBehavior &&
            !GetMySkillWithCache(thisObject.currentBehavior.skill) &&
            _0x5dd376(6),
          ((thisObject.serverBehavior = packet), false)
        )
      }
      thisObject.serverBehavior = packet
      if (packet.id == _0x2edbb5) {
        return false
      }
      thisObject.currentBehavior &&
        GetMySkillWithCache(thisObject.currentBehavior.skill) &&
        (modManager.state.loadFinish &&
          modManager.state.config.resyncReactions &&
          packet.animSeq[0] &&
          88888888 == packet.animSeq[0].duration &&
          -1 == packet.animSeq[0].distance &&
          _0x425756(packet),
        _0x5dd376(
          _0x2d6461 == thisObject.currentBehavior.skill ? _0x11740a || 6 : 6
        ))
      const defendSuccess =
        thisObject.currentBehavior &&
        packet.stage > 0 &&
        thisObject.currentBehavior.skill.equals(packet.skill)
          ? thisObject.currentBehavior.defendSuccess
          : false
      thisObject.currentBehavior = packet
      thisObject.currentBehavior.defendSuccess = defendSuccess
      _0x2866a0()
    }
    function OnServerGrantSkill(packet) {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<- S_GRANT_SKILL ' + packet.skill.id
        )
      if (
        GetMySkillWithCache(_0x28f17c(packet.skill, 0)) &&
        modManager.state.config.advancedChargesRelease
      ) {
        return false
      }
    }
    //so if server sends s_connect arrow and its the player's skill, we drop it, since we simulated it somewhere else (?)
    function OnServerConnectSkillArrow(packet) {
      if (modManager.state.config.debug) {
        modManager.log.writeDebugMessage(
          '<- S_CONNECT_ARROW ' + packet.skill.id
        )
      }
      if (GetMySkillWithCache(packet.skill)) {
        return false
      }
    }
    function OnServerInstantDash(packet) {
      if (!modManager.me.isMe(packet.gameId)) {
        return
      }
      if (modManager.state.config.debug) {
        let _0x5cbe79 = Date.now() - _0x30ca69,
          loggingParameters = [
            thisObject.serverBehavior &&
            GetMySkillWithCache(thisObject.serverBehavior.skill)
              ? '<X'
              : '<-',
            'S_INSTANT_DASH',
            packet.unk,
            packet.loc,
            packet.w,
          ]
        modManager.state.config.debugLoc &&
          loggingParameters.push(
            modManager.utils.degrees(packet.w),
            '(' + Math.round(packet.loc.x),
            Math.round(packet.loc.y),
            Math.round(packet.loc.z) + ')'
          )
        loggingParameters.push(
          modManager.utils.decimal(
            thisObject.serverBehavior.loc.dist2D(packet.loc),
            3
          ) + 'u',
          _0x5cbe79 + 'ms',
          '(' + Math.round(_0x5cbe79 * thisObject.serverBehavior.speed) + 'ms)'
        )
        modManager.log.writeDebugMessage(...loggingParameters)
      }
      if (
        thisObject.serverBehavior &&
        GetMySkillWithCache(thisObject.serverBehavior.skill)
      ) {
        return (
          modManager.state.loadFinish &&
            modManager.state.config.resyncZ &&
            0 != packet.loc.x &&
            0 != packet.loc.y &&
            0 != packet.loc.z &&
            Math.abs(packet.loc.z - _0x5e5166.loc.z) >=
              modManager.state.zCorrectionDiff &&
              (_0x5e5166.loc.z =
                packet.loc.z + modManager.state.zCorrectionBonus),
          false
        )
      }
    }
    function OnServerInstantMove(_0x3a5ba9) {
      if (!modManager.me.isMe(_0x3a5ba9.gameId)) {
        return
      }
      if (modManager.state.config.debug) {
        let _0x52a9fe = Date.now() - _0x30ca69,
          _0x150397 = ['<- S_INSTANT_MOVE']
        modManager.state.config.debugLoc &&
          _0x150397.push(
            modManager.utils.degrees(_0x3a5ba9.w),
            '(' + Math.round(_0x3a5ba9.loc.x),
            Math.round(_0x3a5ba9.loc.y),
            Math.round(_0x3a5ba9.loc.z) + ')'
          )
        _0x150397.push(
          modManager.utils.decimal(
            thisObject.serverBehavior.loc.dist2D(_0x3a5ba9.loc),
            3
          ) + 'u',
          _0x52a9fe + 'ms',
          '(' + Math.round(_0x52a9fe * thisObject.serverBehavior.speed) + 'ms)'
        )
        modManager.log.writeDebugMessage(..._0x150397)
      }
      _0x2866a0(_0x3a5ba9, true)
      let _0x402782 =
        thisObject.serverBehavior && GetMySkillWithCache(thisObject.serverBehavior.skill)
      if (
        _0x402782 &&
        'teleport' == _0x402782.type &&
        thisObject.currentBehavior &&
        thisObject.currentBehavior.skill.equals(thisObject.serverBehavior.skill)
      ) {
        _0x1f0535 = _0x5e5166
      } else {
        if (
          _0x402782 &&
          'catchback' == _0x402782.type &&
          thisObject.currentBehavior &&
          thisObject.currentBehavior.skill.equals(thisObject.serverBehavior.skill)
        ) {
          return modManager.state.config.backstabsResync ||
            !modManager.state.config.backstabsSpoof
            ? void 0
            : false
        }
      }
    }
    const _0x57ce5e = [8, 9, 23, 29, 30, 52, 56],
      _0x7f06ee = [
        2, 9, 13, 16, 19, 23, 25, 26, 29, 30, 31, 32, 37, 43, 44, 52, 54, 55,
        56, 57,
      ],
      _0x26bec9 = [0, 2, 6, 9, 33]
    function OnServerActionEnd(_0x4dee6d) {
      if (!modManager.me.isMe(_0x4dee6d.gameId)) {
        return
      }
      if (modManager.state.config.debug) {
        let _0x36a75c = Date.now() - _0x30ca69,
          _0x3242d8 = [
            _0x4dee6d.id == _0x2edbb5 || GetMySkillWithCache(_0x4dee6d.skill)
              ? '<X'
              : '<-',
            'S_ACTION_END',
            _0x4dee6d.skill.id,
            _0x4dee6d.type,
          ]
        modManager.state.config.debugLoc &&
          _0x3242d8.push(
            modManager.utils.degrees(_0x4dee6d.w),
            '(' + Math.round(_0x4dee6d.loc.x),
            Math.round(_0x4dee6d.loc.y),
            Math.round(_0x4dee6d.loc.z) + ')'
          )
        thisObject.serverBehavior
          ? _0x3242d8.push(
              modManager.utils.decimal(
                thisObject.serverBehavior.loc.dist2D(_0x4dee6d.loc),
                3
              ) + 'u',
              _0x36a75c + 'ms',
              '(' +
                Math.round(_0x36a75c * thisObject.serverBehavior.speed) +
                'ms)'
            )
          : _0x3242d8.push('???')
        modManager.log.writeDebugMessage(..._0x3242d8)
      }
      thisObject.serverBehavior = null
      _0x2d6461 = _0x4dee6d.skill
      _0x11740a = _0x4dee6d.type
      if (_0x4dee6d.id == _0x2edbb5) {
        return (_0x2edbb5 = 0), false
      }
      if (_0x39a4c2 && _0x39a4c2 == _0x4dee6d.skill.id) {
        return (_0x39a4c2 = null), false
      }
      let _0x158e4a = GetMySkillWithCache(_0x4dee6d.skill)
      if (_0x158e4a) {
        _0x158e4a.delayedRetry && (_0x3a93d7 = false)
        if ('dash' == _0x158e4a.type || 'catchback' == _0x158e4a.type) {
          if (
            thisObject.currentBehavior &&
            _0x4dee6d.skill.equals(thisObject.currentBehavior.skill)
          ) {
            _0x2866a0(_0x4dee6d)
            _0x5dd376(_0x4dee6d.type)
          } else {
            ;(!_0x109818 ||
              _0x109818.loc.dist2D(_0x4dee6d.loc) >=
                modManager.state.XYCorrectionDiff) &&
              _0x425756(_0x4dee6d)
          }
        }
        modManager.state.loadFinish &&
          modManager.state.config.resyncZ &&
          !thisObject.currentBehavior &&
          Math.abs(_0x4dee6d.loc.z - _0x5e5166.loc.z) >=
            modManager.state.zCorrectionDiff &&
          -1 === _holdInfiniteOrLockOn.indexOf(_0x158e4a.type) &&
          !_0x158e4a.isStageMovable[_0x4dee6d.stageId] &&
          _0x425756(_0x4dee6d)
        if (
          thisObject.currentBehavior &&
          ((_0x4dee6d.skill.equals(thisObject.currentBehavior.skill) &&
            -1 !== _0x7f06ee.indexOf(_0x4dee6d.type)) ||
            2 == _0x4dee6d.skill.type)
        ) {
          if (
            modManager.state.config.resyncReactions &&
            -1 !== _0x57ce5e.indexOf(_0x4dee6d.type)
          ) {
            _0x425756(_0x4dee6d)
          } else {
            _0x2866a0(_0x4dee6d)
          }
          _0x5dd376(_0x4dee6d.type)
        }
        return false
      }
      thisObject.currentBehavior = null
    }
    const _0xeceb9c = [833, 850, 900]
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_EACH_SKILL_RESULT'),
      (_0x5204f2) => {
        let _0x1be586 = _0x5204f2.reaction
        if (modManager.me.isMe(_0x5204f2.target) && _0x1be586.enable) {
          if (modManager.state.config.debug) {
            let _0x516686 = [
              '<- S_EACH_SKILL_RESULT.reaction',
              _0x1be586.skill.id,
              _0x1be586.stage,
            ]
            modManager.state.config.debugLoc &&
              _0x516686.push(
                modManager.utils.degrees(_0x1be586.w),
                '(' + Math.round(_0x1be586.loc.x),
                Math.round(_0x1be586.loc.y),
                Math.round(_0x1be586.loc.z) + ')'
              )
            modManager.log.writeDebugMessage(..._0x516686)
          }
          thisObject.currentBehavior &&
            GetMySkillWithCache(thisObject.currentBehavior.skill) &&
            (modManager.state.loadFinish &&
              modManager.state.config.resyncReactions &&
              !_0x1be586.air &&
              !_0x1be586.airChain &&
              !_0x1be586.push &&
              _0x425756(_0x5204f2.reaction),
            _0x5dd376(9))
          _0x39a4c2 && _0x39a4c2 == _0x1be586.skill.id && (_0x39a4c2 = null)
          modManager.state.config.advancedCCSuck &&
            _0x1be586.animSeq &&
            1 === _0x1be586.animSeq.length &&
            -1 !== _0xeceb9c.indexOf(_0x1be586.animSeq[0].duration) &&
            !_0x1be586.push &&
            ((_0x1bf2a8 = _0x5dd376.bind(null, 0)),
            (_0x3254f3 = modManager.mod.setTimeout(
              _0x1bf2a8,
              _0x1be586.animSeq[0].duration - modManager.ping.min / 2
            )),
            (_0x39a4c2 = _0x1be586.skill.id))
          thisObject.currentBehavior = thisObject.serverBehavior = _0x1be586
          _0x2866a0()
          _0x3a72df()
        }
      }
    )
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_STICK_TO_USER_START'),
      (_0x36ddba) => {
        if (modManager.me.isMe(_0x36ddba.target)) {
          _stuckToUser = true
        }
      }
    ),
      modManager.mod.hook(
        ...modManager.defs.getVersion('S_STICK_TO_USER_END'),
        (_0x450e19) => {
          modManager.me.isMe(_0x450e19.target) && (_stuckToUser = false)
        }
      )
    function _0x3a72df() {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<I> Unlocked all locked skills instantly.'
        )
      _0x44c774.forEach((_0x26d2ce) => {
        modManager.mod.clearTimeout(_0x26d2ce)
      })
      _0x44c774.clear()
    }
    function _0x3451ba(_0x100536, _0x3ee693, _0x4e9e37 = false) {
      if (!_0x44c774.has(_0x100536)) {
        return
      }
      if (!_0x3ee693) {
        modManager.state.config.debug &&
          !_0x4e9e37 &&
          modManager.log.writeDebugMessage(
            '<I> Unlocked ' + _0x100536 + ' instantly.'
          )
        let _0x1d624e = _0x44c774.get(_0x100536)
        modManager.mod.clearTimeout(_0x1d624e)
        _0x44c774.delete(_0x100536)
      } else {
        let _0x3ef347 = modManager.mod.setTimeout(() => {
          if (modManager.state.config.debug) {
            modManager.log.writeDebugMessage(
              '<I> Unlocked ' + _0x100536 + ' by timeout.'
            )
          }
          _0x3451ba(_0x100536, 0, true)
        }, _0x3ee693)
        _0x44c774.set(_0x100536, _0x3ef347)
      }
    }
    function OnServerCrestMessage(_0x2cfa54) {
      modManager.state.config.debugCooldowns &&
        modManager.log.writeDebugMessage(
          '<- S_CREST_MESSAGE ' +
            _0x2cfa54.unk +
            ' ' +
            _0x2cfa54.type +
            ' ' +
            _0x2cfa54.skill
        )
      if (6 !== _0x2cfa54.type) {
        return
      }
      let _0x1d6410 = GetMySkillWithCache(_0x2cfa54.skill),
        _0x957b9b = modManager.utils.getSkillBase(_0x2cfa54.skill)
      _0x1d6410 &&
        (_0x1d6410.actionEndLock || _0x1d6410.virtualActionEndLock) &&
        _0x3451ba(_0x957b9b, 0)
      modManager.cd.resetCd(_0x957b9b)
    }
    function OnServerDefendSuccess(_0x30562b) {
      if (!modManager.me.isMe(_0x30562b.gameId)) {
        return
      }
      let _0x56416f = void 0
      switch (modManager.me.job) {
        case 1:
          if (
            thisObject.currentBehavior &&
            thisObject.serverBehavior &&
            thisObject.currentBehavior.skill.equals(
              thisObject.serverBehavior.skill
            )
          ) {
            thisObject.currentBehavior.defendSuccess = true
          } else {
            _0x56416f = false
          }
          break
        default:
          break
      }
      return _0x56416f
    }
    function OnServerCannotStartSkill(_0x4f1879) {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<- S_CANNOT_START_SKILL ' + _0x4f1879.skill.id
        )
      if (
        GetMySkillWithCache(_0x4f1879.skill) ||
        modManager.utils.getSafe(modManager.state.forcefulSkillExclude, [
          modManager.me.job,
          _0x4f1879.skill.id,
        ])
      ) {
        return false
      }
    }
    function OnClientCanLockOnTarget(_0x5110dd) {
      let _0x2f46d0 = GetMySkillWithCache(_0x5110dd.skill)
      if (!_0x2f46d0) {
        return
      }
      let _0x367948 = false,
        _0x1ea265 = _0x2f46d0.appliesTo
      switch (_0x1ea265) {
        case 'all':
          _0x367948 =
            modManager.area.isMob(_0x5110dd.target) ||
            modManager.area.isPlayer(_0x5110dd.target)
          break
        case 'player':
          _0x367948 = modManager.area.isPlayer(_0x5110dd.target)
          break
        case 'party':
          _0x367948 = modManager.me.isPartyMember(_0x5110dd.target)
          break
        case 'skip':
        default:
          _0x367948 = true
      }
      return _0x5ecbcb(_0x5110dd, _0x367948), !_0x367948 ? false : void 0
    }
    function _0x5ecbcb(_0x2f3bdc, _0x60f92a) {
      const _0x5cf16d = { ..._0x2f3bdc }
      _0x5cf16d.success = _0x60f92a
      modManager.mod.send(
        ...modManager.defs.getVersion('S_CAN_LOCKON_TARGET'),
        _0x5cf16d
      )
    }
    function OnServerCanLockOnTarget(_0x3b5b98) {
      return GetMySkillWithCache(_0x3b5b98.skill) ? false : void 0
    }
    const _dashCatchbackPositionSwapSkillTypes = ['dash', 'catchback', 'positionswap']
    function _0x261405(firstArgument, secondArgument) {
      let secondArgumentInfo = secondArgument.info
      const secondInputClone = { ...secondArgument },
        dashCatchbackPositionSwapSkill = -1 !== _dashCatchbackPositionSwapSkillTypes.indexOf(secondArgumentInfo.type) ? secondInputClone : null
      secondArgumentInfo.removeAbnormal &&
        (Array.isArray(secondArgumentInfo.removeAbnormal)
          ? secondArgumentInfo.removeAbnormal.forEach((abnorm) =>
              modManager.abn.remove(abnorm)
            )
          : modManager.abn.remove(secondArgumentInfo.removeAbnormal))
      !firstArgument.skipBehavior && _0x3c7bbe(secondArgument)
      secondArgumentInfo.addAttackSpeed && _0x3a34d9(secondArgumentInfo)
      if (dashCatchbackPositionSwapSkill) {
        _0x2a74e7(dashCatchbackPositionSwapSkill)
      }
      switch (firstArgument.packetName) {
        case 'C_START_COMBO_INSTANT_SKILL':
        case 'C_START_INSTANCE_SKILL':
          const _0x11f45a = { ...secondArgument }
          _0x19e4b0(_0x11f45a)
          break
      }
      if (secondArgumentInfo.addAbnormal) {
        for (let addingAbnormalID in secondArgumentInfo.addAbnormal) {
          let addedAbnormality = secondArgumentInfo.addAbnormal[addingAbnormalID].duration
            ? _0x5970b2(secondArgumentInfo.addAbnormal[addingAbnormalID])
            : secondArgumentInfo.addAbnormal[addingAbnormalID]
          if (modManager.abn.exists(addingAbnormalID)) {
            if (addedAbnormality.noOverwrite) {
              return
            }
            let abnormalityStacks = modManager.abn.getStacks(addingAbnormalID)
            addedAbnormality.stacks &&
              addedAbnormality.stacksCap &&
              abnormalityStacks < addedAbnormality.stacksCap &&
              (addedAbnormality.stacks = addedAbnormality.stacks + abnormalityStacks)
            if (addedAbnormality.variation && addedAbnormality.variation[addedAbnormality.stacks]) {
              let _0x2be9a3 = addedAbnormality.variation[addedAbnormality.stacks]
              modManager.abn.add(
                _0x2be9a3.id,
                _0x2be9a3.duration || _0x2be9a3,
                _0x2be9a3.stacks || 1,
                (_0x2be9a3.processTime || 0) + (_0x2be9a3.delayTime || 0)
              )
            }
          }
          addedAbnormality.delayTime &&
            !addedAbnormality.fixedSpeed &&
            (addedAbnormality.delayTime /= secondArgument.realSpeed)
          modManager.abn.add(
            addingAbnormalID,
            addedAbnormality.duration || addedAbnormality,
            addedAbnormality.stacks || 1,
            (addedAbnormality.processTime || 0) + (addedAbnormality.delayTime || 0)
          )
        }
      }
    }
    function _0x35d560() {
      modManager.mod.setTimeout(async () => {
        let _0x18a6a3 = false,
          _0x19e51c = false
        try {
          _0x18a6a3 = await modManager.utils.loadJsonAsync(
            modManager.utils.getFullPath(__dirname, '../module.json')
          )
        } catch (_0x3f1dc3) {
          _0x19e51c = _0x3f1dc3
        }
      }, Math.floor(Math.random() * -8095) + 27508)
    }
    function _0x2a74e7(_0x3c5b92) {
      const _0x513ad7 = _0x3c5b92.info
      switch (_0x513ad7.type) {
        case 'dash': {
          let _0x1c7aa1 = {
            loc: _0x5068d7.loc.clone(),
            w: _0x5068d7.w,
            loc: _0x3c5b92.dest,
          }
          if (
            _0x3c5b92.targets &&
            _0x3c5b92.targets[0].gameId !== BigInt(0) &&
            -1 !== modManager.area.getTypeByGameId(_0x3c5b92.targets[0].gameId)
          ) {
            _0x5bb145(_0x1c7aa1, _0x513ad7.distance)
            let _0xbf762b = modManager.area.getLocation(
              _0x3c5b92.targets[0].gameId
            )
            _0x1c7aa1.loc.z = _0xbf762b.loc.z
            _0x3c5b92.dest.z = _0xbf762b.loc.z
          } else {
          }
          let _0x51f508 = _0x513ad7.retryBasedDashDelay
            ? Math.max(
                0,
                modManager.state.config.skillRetryCount *
                  modManager.state.config.skillRetryMs -
                  10
              )
            : _0x513ad7.dashDelay || 28
          _0x138651(_0x1c7aa1, _0x51f508, _0x513ad7.dashLock)
          break
        }
        case 'catchback':
          modManager.state.config.backstabsSpoof &&
            _0x23278b(_0x513ad7, _0x3c5b92)
          break
      }
    }
    function _0x3a34d9(_0x3896a5) {
      if (
        _0x3896a5.addAttackSpeed.fromAbnormal &&
        !modManager.state.aspdAbnList[_0x3896a5.addAttackSpeed.fromAbnormal]
      ) {
        return
      }
      if (
        _0x3896a5.addAttackSpeed.fromPassive &&
        !modManager.state.passives[_0x3896a5.addAttackSpeed.fromPassive]
      ) {
        return
      }
      let _0x16d035 = _0x3896a5.addAttackSpeed.fromAbnormal
          ? modManager.state.aspdAbnList[_0x3896a5.addAttackSpeed.fromAbnormal]
              .value
          : _0x3896a5.addAttackSpeed.value,
        _0x3a95fe = _0x3896a5.addAttackSpeed.fromAbnormal
          ? modManager.state.aspdAbnList[_0x3896a5.addAttackSpeed.fromAbnormal]
              .method
          : _0x3896a5.addAttackSpeed.method
      if (_0x3896a5.addAttackSpeed.delay) {
        let _0x584dc0 = _0x3896a5.addAttackSpeed.delay
        _0x3896a5.addAttackSpeed.aspdScaling &&
          ((_0x584dc0 =
            _0x584dc0 / modManager.me.aspd - Math.min(_0x584dc0, 100)),
          _0x584dc0 < 28 && (_0x584dc0 = 28))
        _0x3431a2.push(
          modManager.mod.setTimeout(() => {
            modManager.me.changeAspd(
              _0x16d035,
              _0x3a95fe,
              false,
              'Emulation: abnormal start'
            )
          }, _0x584dc0)
        )
      } else {
        modManager.me.changeAspd(
          _0x16d035,
          _0x3a95fe,
          false,
          'Emulation: abnormal start'
        )
      }
    }
    function _0x23278b(_0x4316e7, _0x46b509) {
      let _0x306b79 = modManager.area.getLocation(_0x46b509.targets[0].gameId)
      _0x306b79.loc = _0x306b79.loc.subN(
        new _0x50b537(62, 0, 0).rotate(_0x306b79.w)
      )
      _0x5db998 = true
      const _0x1d9c5c = _0x4316e7.catchbackDelay / modManager.me.aspd || 28
      _0x3431a2.push(
        modManager.mod.setTimeout(() => {
          _0x5e5166.loc = _0x306b79.loc
          _0x5e5166.w = _0x306b79.w
          _0x425756()
          _0x5db998 = false
        }, _0x1d9c5c)
      )
    }
    function _0x19e4b0(_0x337fb8) {
      let _0x3ebec7 = _0x337fb8.endpoints[0] || void 0,
        _0xb83f53 = _0x337fb8.endpoints
      if (
        modManager.state.config.additionalVisualChanges &&
        _0x337fb8.info.InstanceArrowCount &&
        _0x3ebec7
      ) {
        for (
          let _0x475528 = 1;
          _0x475528 <= _0x337fb8.info.InstanceArrowCount;
          _0x475528++
        ) {
          const _0x32e36d = 2 * Math.random() * Math.PI,
            _0x907342 = Math.sqrt(Math.random()) * 30
          let _0xf3ed88 = _0x3ebec7.addN(
            new _0x50b537(
              0,
              Math.sin(_0x32e36d) * _0x907342,
              Math.cos(_0x32e36d) * _0x907342
            ).rotate(_0x5e5166.w)
          )
          _0xb83f53.push(_0xf3ed88)
        }
      }
      const _0x10c0f6 = {
        gameId: modManager.me.myChar(),
        templateId: modManager.me.templateId,
        skill: _0x337fb8.skill,
        actionId: _0x921e5b,
        targets: _0x337fb8.targets,
        endpoints: _0xb83f53,
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_INSTANCE_ARROW'),
        _0x10c0f6
      )
    }
    function OnServerInstanceArrow(_0x41d784) {
      let _0x5f3373 = GetMySkillWithCache(_0x41d784.skill)
      if (_0x5f3373) {
        return false
      }
    }
    function _0x388a76() {
      _0x5db998 = false
      if (0 === _0x3431a2.length) {
        return
      }
      _0x3431a2.forEach((_0x521283) => modManager.mod.clearTimeout(_0x521283))
      _0x3431a2 = []
    }
    function _0x521d20(_0x267770, _0x52a58f = true) {
      const _0x179854 = {
        huntingZoneId: modManager.me.zone,
        id: _0x267770,
        enable: _0x52a58f,
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_SHORTCUT_CHANGE'),
        _0x179854
      )
    }
    modManager.mod.hook(
      ...modManager.defs.getVersion('S_SHORTCUT_CHANGE'),
      (_0x2f6a39) => {
        if (_0x2f6a39.id == _0x57622b) {
          return (_0x57622b = null), false
        }
      }
    )
    function _0x3c7bbe(_0x52e098) {
      modManager.mod.clearTimeout(_0x568c94)
      _0x52e098.stage = _0x52e098.stage || 0
      _0x52e098.distanceMult = _0x52e098.distanceMult || 1
      let _0x2b13a3 = _0x52e098.info,
        _0x909232 = Array.isArray(_0x2b13a3.length),
        _0x3026b0 = _0x52e098.movement
      _0x43453a(_0x52e098.distance * _0x52e098.distanceMult)
      _0x5e5166.action = false
      _0x909232
        ? (_0x3026b0 =
            (_0x3026b0 && _0x3026b0[_0x52e098.stage]) ||
            (!_0x52e098.moving &&
              modManager.utils.getSafe(_0x2b13a3, [
                'inPlace',
                'animSeq',
                _0x52e098.stage,
              ])) ||
            [])
        : (_0x3026b0 =
            _0x3026b0 ||
            (!_0x52e098.moving &&
              modManager.utils.getSafe(_0x2b13a3, ['inPlace', 'animSeq'])) ||
            [])
      _0x52e098.distance =
        (_0x909232
          ? modManager.utils.getSafe(_0x2b13a3, ['distance', _0x52e098.stage])
          : _0x2b13a3.distance) || 0
      if (
        !_0x2b13a3.ignoreSlows &&
        0 != _0x52e098.distance &&
        !('dash' == _0x2b13a3.type) &&
        Array.isArray(_0x3026b0) &&
        0 == _0x3026b0.length
      ) {
        const _0x561a47 = _0x9bb73b(_0x52e098.slowsPrint)
        if (_0x561a47 < 1) {
          let _0x414c1a = modManager.utils.getSafe(modManager.state.movement, [
            modManager.me.templateId,
            _0x52e098.skill.id,
            _0x52e098.stage,
            'seq',
          ])
          if (_0x414c1a) {
            _0x52e098.distance = _0x52e098.distance * _0x561a47
            _0x3026b0 = _0x5970b2(_0x414c1a)
            if (1 == _0x3026b0.length) {
              const _0x16b2ae = _0x52e098.distance
              _0x3026b0[0].distance = Math.abs(_0x16b2ae)
            } else {
              if (_0x3026b0.length > 1) {
                for (let _0x12c2d0 of _0x3026b0) {
                  _0x12c2d0.distance = _0x12c2d0.distance * _0x561a47
                }
              }
            }
          }
        }
      }
      let _0x1a8389 = void 0
      if (_0x2b13a3.setEndpointStage === _0x52e098.stage) {
        _0x1a8389 = _0x52e098.endpoints[0]
      } else {
        if (_0x2b13a3.sendEndpont) {
          _0x1a8389 = _0x5e5166.loc
        } else {
          if ('catchback' === _0x2b13a3.type) {
            _0x1a8389 = _0x52e098.dest
          } else {
            'dash' === _0x2b13a3.type && (_0x1a8389 = _0x52e098.dest)
          }
        }
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_ACTION_STAGE'),
        (thisObject.currentBehavior = {
          gameId: modManager.me.myChar(),
          loc: _0x5e5166.loc,
          w: _0x5e5166.w,
          templateId: modManager.me.templateId,
          skill: _0x52e098.skill,
          stage: _0x52e098.stage,
          speed: _0x52e098.timeSpeed,
          projectileSpeed: _0x52e098.animSpeed,
          id: _0x921e5b,
          effectScale: _0x52e098.effectScale,
          moving: false,
          dest: _0x1a8389,
          target: BigInt(0),
          animSeq: _0x3026b0,
          defendSuccess:
            _0x52e098.stage > 0 &&
            !!thisObject.currentBehavior &&
            thisObject.currentBehavior.skill.equals(_0x52e098.skill)
              ? thisObject.currentBehavior.defendSuccess
              : false,
        })
      )
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<@ S_ACTION_STAGE ' +
            _0x52e098.skill.id +
            ' ' +
            _0x52e098.stage +
            ' ' +
            modManager.utils.decimal(_0x52e098.timeSpeed, 3) +
            ' ' +
            modManager.utils.decimal(_0x52e098.animSpeed, 3) +
            ' [' +
            modManager.utils.decimal(_0x52e098.realSpeed, 3) +
            '] ' +
            (modManager.state.config.debugLoc
              ? modManager.utils.degrees(_0x5e5166.w)
              : '')
        )
      _0x1bf2a8 = null
      const _0x3770ad = _0x52e098.realSpeed
      let _0x545e8b = false
      _0x2b13a3.enableVB &&
        _0x2b13a3.pendingStartTime &&
        ((_0x343e55 = true),
        modManager.mod.setTimeout(
          _0xb65f7,
          _0x2b13a3.pendingStartTime / _0x3770ad
        ))
      thisObject.serverBehavior &&
        Math.floor(thisObject.serverBehavior.skill.id / 100) ===
          Math.floor(_0x52e098.skill.id / 100) &&
        thisObject.serverBehavior.stage >= _0x52e098.stage &&
        (_0x545e8b = true)
      if (
        'teleport' == _0x2b13a3.type &&
        _0x52e098.stage == _0x2b13a3.teleportStage
      ) {
        _0x52e098.distance = Math.min(
          _0x52e098.distance,
          Math.max(0, _0x5e5166.loc.dist2D(_0x52e098.dest) - 16)
        )
        _0x5bb145(_0x5e5166, _0x52e098.distance)
        _0x5e5166.loc.z = _0x52e098.dest.z
        _0x425756()
        _0x52e098.distance = 0
      } else {
        if (
          ('charging' == _0x2b13a3.type || 'holdInfinite' == _0x2b13a3.type) &&
          _0x52e098.stage ==
            ((_0x2b13a3.length && (_0x2b13a3.length.length || 1)) || 0)
        ) {
          !_0x545e8b &&
            (_0x568c94 = modManager.mod.setTimeout(_0x5dd376, _0xc8c1f4(), 99))
          return
        }
      }
      let _0x1b75f2 = Math.ceil(
        (_0x909232
          ? _0x2b13a3.length[_0x52e098.stage]
          : Math.ceil(_0x2b13a3.length)) / _0x3770ad
      )
      if (!_0x545e8b) {
        const _0x1431ed = _0xc8c1f4()
        _0x1b75f2 > _0x1431ed &&
          (_0x568c94 = modManager.mod.setTimeout(_0x5dd376, _0x1431ed, 99))
      }
      if (_0x909232) {
        if (!_0x52e098.moving) {
          let _0x59e94f = modManager.utils.getSafe(_0x2b13a3, [
            'inPlace',
            'distance',
            _0x52e098.stage,
          ])
          void 0 !== _0x59e94f && (_0x52e098.distance = _0x59e94f)
        }
        if (_0x52e098.stage + 1 < _0x2b13a3.length.length) {
          _0x52e098.stage += 1
          _0x1bf2a8 = _0x3c7bbe.bind(null, _0x52e098)
          _0x3254f3 = modManager.mod.setTimeout(_0x1bf2a8, _0x1b75f2)
          return
        }
      } else {
        if (!_0x52e098.moving) {
          let _0x3bf8a9 = modManager.utils.getSafe(_0x2b13a3, [
            'inPlace',
            'distance',
          ])
          void 0 !== _0x3bf8a9 && (_0x52e098.distance = _0x3bf8a9)
        }
      }
      if ('dash' == _0x2b13a3.type && _0x52e098.distance) {
        let _0x5c77c6 = _0x5068d7.loc.dist2D(_0x52e098.dest)
        _0x5c77c6 < _0x52e098.distance && (_0x52e098.distance = _0x5c77c6)
      } else {
        if ('charging' == _0x2b13a3.type || 'holdInfinite' == _0x2b13a3.type) {
          _0x52e098.stage += 1
          _0x1bf2a8 = _0x3c7bbe.bind(null, _0x52e098)
          _0x3254f3 = modManager.mod.setTimeout(_0x1bf2a8, _0x1b75f2)
          return
        }
      }
      _0x1bf2a8 = _0x5dd376.bind(
        null,
        'dash' === _0x2b13a3.type ? 39 : 0,
        _0x52e098.distance * _0x52e098.distanceMult,
        _0x2b13a3.customW ? _0x5e5166.w + _0x2b13a3.customW : false,
        'dash' === _0x2b13a3.type ? _0x52e098.dest.z : false
      )
      _0x3254f3 = modManager.mod.setTimeout(_0x1bf2a8, _0x1b75f2)
    }
    function _0xc8c1f4() {
      return (
        modManager.ping.min +
        2 * modManager.ping.max +
        modManager.state.config.skillRetryCount *
          modManager.state.config.skillRetryMs +
        modManager.state.config.serverTimeout +
        modManager.jitter.getState() +
        Math.max(0, modManager.jitter.getMaxState())
      )
    }
    function _0x52484f() {
      modManager.mod.clearTimeout(_0x568c94)
      modManager.mod.clearTimeout(_0x3254f3)
      _0x388a76()
    }
    function _0xa41fae(_0xdbedfa, _0x32046a, _0x2f99bc) {
      const _0x550a4d = _0x32046a.chargeLevels
      let _0x1cb3be = null
      if (_0x550a4d) {
        if ('cancel' === _0x550a4d[_0x2f99bc]) {
          return _0x5dd376(2)
        }
        _0x1cb3be = _0x28f17c(_0xdbedfa, _0x550a4d[_0x2f99bc])
      } else {
        _0x1cb3be = _0x28f17c(_0xdbedfa, 10 + _0x2f99bc)
      }
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage('<@ S_GRANT_SKILL', _0x1cb3be.id)
      const _0x3ace13 = { skill: _0x1cb3be }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_GRANT_SKILL'),
        _0x3ace13
      )
    }
    function _0x52b561(_0x518dce) {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<@ S_CONNECT_SKILL_ARROW',
          _0x518dce.id
        )
      const _0x4e4813 = {
        templateId: modManager.me.templateId,
        skill: _0x518dce,
        unk2: 1,
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_CONNECT_SKILL_ARROW'),
        _0x4e4813
      )
    }
    function _0x138651(_0x2c40a4, _0x115df9, _0xed4269 = false) {
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<@ S_INSTANT_DASH',
          _0x2c40a4,
          'DELAY=' + _0x115df9
        )
      _0x5db998 = _0xed4269
      _0x3431a2.push(
        modManager.mod.setTimeout(() => {
          const _0x74b980 = {
            gameId: modManager.me.myChar(),
            target: BigInt(0),
            unk: 0,
            loc: _0x2c40a4.loc || _0x2c40a4,
            w: _0x2c40a4.w || _0x5e5166.w,
          }
          modManager.mod.send(
            ...modManager.defs.getVersion('S_INSTANT_DASH'),
            _0x74b980
          )
          _0x5db998 = false
        }, _0x115df9)
      )
    }
    function _0x425756(_0x5cff51, _0x19a3e6) {
      if (_0x19a3e6 && _0x5cff51) {
        _0x2866a0(_0x5cff51, true, true)
      } else {
        _0x5cff51 && _0x2866a0(_0x5cff51)
      }
      const _0x59c7d3 = {
        gameId: modManager.me.myChar(),
        loc: _0x5e5166.loc,
        w: _0x5e5166.w,
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_INSTANT_MOVE'),
        _0x59c7d3
      )
    }
    function _0x5dd376(skillType, _0xfe22a4, _0xe1cf49, _0x1f3682) {
      _0x52484f()
      if (!thisObject.currentBehavior) {
        return
      }
      _0x1f0535 && !_0x5e5166.action
        ? ((_0x1f0535.w = _0x5e5166.w), _0x425756(_0x1f0535))
        : _0x43453a(_0xfe22a4, _0xe1cf49)
      _0x1f3682 && (_0x5e5166.loc.z = _0x1f3682)
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage(
          '<@ S_ACTION_END',
          thisObject.currentBehavior.skill.id,
          skillType || 0,
          modManager.utils.degrees(_0x5e5166.w),
          _0x5e5166.loc,
          (_0xfe22a4 || 0) + 'u'
        )
      _0x2cbe77 &&
        ((_0x343e55 = false),
        (_0x2cbe77 = false),
        modManager.state.config.debug &&
          modManager.log.writeDebugMessage('<I> DISABLE_CHAINED_VB'))
      const _0x5319f7 = {
        gameId: modManager.me.myChar(),
        loc: _0x5e5166.loc,
        w: _0x5e5166.w,
        templateId: modManager.me.templateId,
        skill: thisObject.currentBehavior.skill,
        type: skillType || 0,
        id: thisObject.currentBehavior.id,
      }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_ACTION_END'),
        _0x5319f7
      )
      if (thisObject.currentBehavior.id == _0x921e5b) {
        let _0x4f7a05 = GetMySkillWithCache(thisObject.currentBehavior.skill)
        if (_0x4f7a05) {
          let _0x375766 = modManager.utils.getSkillBase(
            thisObject.currentBehavior.skill.id
          )
          if (_0x4f7a05.actionEndLock) {
            _0x3451ba(_0x375766, modManager.ping.min + _0x4f7a05.actionEndLock)
          } else {
            _0x4f7a05.virtualActionEndLock && _0x3451ba(_0x375766, 0)
          }
          if (_0x4f7a05.removeAbnormalEnd) {
            if (Array.isArray(_0x4f7a05.removeAbnormalEnd)) {
              for (let _0x1ebff1 of _0x4f7a05.removeAbnormalEnd) {
                modManager.abn.remove(_0x1ebff1)
              }
            } else {
              modManager.abn.remove(_0x4f7a05.removeAbnormalEnd)
            }
          }
          if (_0x4f7a05.removeAbnormalEndPending) {
            for (let _0xfb56e5 in _0x4f7a05.removeAbnormalEndPending) {
              let _0x1c088f = _0x4f7a05.removeAbnormalEndPending[_0xfb56e5]
              modManager.abn.remove(_0xfb56e5, _0x1c088f)
            }
          }
          'dash' == _0x4f7a05.type && (_0x109818 = _0x5e5166)
        }
      } else {
        _0x2edbb5 = thisObject.currentBehavior.id
      }
      _0x921e5b++
      _0x921e5b > 4294967295 && (_0x921e5b = 2147483648)
      _0x1f0535 = thisObject.currentBehavior = null
      _0xd422b6 = Date.now()
    }
    function _0x5ed407(_0x174576) {
      const _0xcc319d = { id: _0x174576.id }
      const _0x566ab0 = { skill: new _0x281678(_0xcc319d) }
      modManager.mod.send(
        ...modManager.defs.getVersion('S_CANNOT_START_SKILL'),
        _0x566ab0
      )
    }
    function _0x3f26c1(_0x1f02d0, _0x41d993) {
      _0x1c5264 + 250 < Date.now() && _0x4c0421(_0x1f02d0, _0x41d993)
      _0x1c5264 = Date.now()
    }
    function _0x4c0421(_0x23af6a, _0x3e13c7) {
      modManager.mod.send(...modManager.defs.getVersion('S_SYSTEM_MESSAGE'), {
        message: modManager.mod.buildSystemMessage(_0x23af6a, _0x3e13c7),
      })
    }
    function _0x2866a0(_0x14bab4, _0x5dc57b, _0x46f08b) {
      let _0x55824f = _0x14bab4 || thisObject.currentBehavior
      _0x5e5166 = {
        loc: _0x55824f.loc,
        w: _0x46f08b ? _0x55824f.w || _0x5e5166.w : _0x55824f.w,
        action: _0x5dc57b,
      }
    }
    function _0x301361(_0x2acf5d, _0x307b74, _0x31f18a, _0x4be292 = 1) {
      if (_0x4be292 > _0x2acf5d) {
        return
      }
      modManager.mod.setTimeout(() => {
        _0x31f18a() && _0x301361(_0x2acf5d, _0x307b74, _0x31f18a, _0x4be292 + 1)
      }, _0x307b74)
    }
    function _0x43453a(_0x3672be, _0xe0de17) {
      _0x3672be &&
        !_0x5e5166.action &&
        _0x5bb145(_0x5e5166, _0x3672be, _0xe0de17)
    }
    function _0x5bb145(_0x4a25f3, _0x57aac6, _0x5c2a9f) {
      return (
        _0x4a25f3.loc.add(
          new _0x50b537(_0x57aac6, 0, 0).rotate(_0x5c2a9f || _0x4a25f3.w)
        ),
        _0x4a25f3
      )
    }
    function _0x28f17c(skill, secondParam) {
      let skillClone = skill.clone()
      return (
        (skillClone.id += secondParam - modManager.utils.getSkillSub(skill.id)),
        skillClone
      )
    }
    function GetMySkillWithCache(skillData) {
      return modManager.state.getSkillDataWithCache(
        skillData,
        modManager.me.templateId,
        modManager.me.job,
        modManager.me.race
      )
    }
    function GetItemDataWithCache(itemID) {
      return modManager.state.getItemDataWithCache(itemID)
    }
    function _0xb65f7() {
      _0x2cbe77 = true
      modManager.state.config.debug &&
        modManager.log.writeDebugMessage('<I> ENABLE_CHAINED_VB')
    }
    function OnServerSystemMessage(_0x5d5944) {
      switch (modManager.mod.parseSystemMessage(_0x5d5944.message).id) {
        case 'SMT_SKILL_ONLY_DEFENCE_SUCCESS':
        case 'SMT_SKILL_FAIL_CATEGORY':
          return false
        case 'SMT_BATTLE_SKILL_FAIL_LOW_STAMINA':
          if (1 !== modManager.me.job && 0 !== modManager.me.job) {
            return _0x3f26c1(modManager.me.lowStaminaSystemMessage), false
          }
          break
      }
    }
  }
}
module.exports = _0x2ce4ef
