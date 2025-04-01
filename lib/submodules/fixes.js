'use strict'
class fixesClass {
  constructor({
    me: meObject,
    mod: modObject,
    defs: defsObject,
    state: stateObject,
    area: areaObject,
  }) {
    const OnServerEachSkillResult = (packet) => {
        if (!meObject.isMe(packet.target)) {
          const _0x55698b = packet.reaction
          _0x55698b.enable &&
            !_0x55698b.air &&
            !_0x55698b.airChain &&
            stateObject.config.additionalCombatFixes &&
            ((stateObject.presetFixes.tryResyncNpcs &&
              areaObject.isMob(packet.target)) ||
              (stateObject.presetFixes.tryResyncPlayers &&
                areaObject.isPlayer(packet.target))) &&
            modObject.send(...defsObject.getVersion('S_INSTANT_MOVE'), {
              gameId: packet.target,
              loc: packet.reaction.loc,
              w: packet.reaction.w,
            })
        } else {
          if (
            stateObject.presetFixes.fixFreezeAtPerfectBlock &&
            stateObject.config.additionalCombatFixes &&
            packet.superArmor
          ) {
            return (
              (packet.superArmor = false), (packet.superArmorId = 0), true
            )
          }
        }
      },
      OnServerActionEnd = (packet) => {
        if (meObject.isMe(packet.gameId)) {
          return
        }
        if (
          stateObject.config.additionalCombatFixes &&
          stateObject.presetFixes.tryResyncNpcs &&
          areaObject.isMob(packet.gameId)
        ) {
          modObject.send(...defsObject.getVersion('S_INSTANT_MOVE'), {
            gameId: packet.gameId,
            loc: packet.loc,
            w: packet.w,
          })
        }
      },
      OnServerAbnormalityRefresh = (packet) => {
        if (
          packet.stacks < 2 ||
          !stateObject.config.additionalCombatFixes ||
          !(
            (stateObject.presetFixes.fixDelayedBuffsNpcs &&
              areaObject.isMob(packet.target)) ||
            (meObject.isMe(packet.target) &&
              stateObject.presetFixes.fixDelayedBuffsMe)
          )
        ) {
          return
        }
        modObject.send(...defsObject.getVersion('S_ABNORMALITY_END'), {
          target: packet.target,
          id: packet.id,
        })
        modObject.send(...defsObject.getVersion('S_ABNORMALITY_BEGIN'), {
          target: packet.target,
          source: packet.target,
          id: packet.id,
          duration: packet.duration,
          stacks: packet.stacks,
        })
      }
    modObject.hook(
      ...defsObject.getVersion('S_EACH_SKILL_RESULT'),
      {
        order: 1000000,
        filter: { fake: false },
      },
      OnServerEachSkillResult
    )
    modObject.hook(
      ...defsObject.getVersion('S_ACTION_END'),
      {
        order: 1000000,
        filter: { fake: false },
      },
      OnServerActionEnd
    )
    modObject.hook(
      ...defsObject.getVersion('S_ABNORMALITY_REFRESH'),
      {
        order: 99999999,
        filter: { fake: null },
      },
      OnServerAbnormalityRefresh
    )
  }
}
module.exports = fixesClass
