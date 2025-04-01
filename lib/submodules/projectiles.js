'use strict'
const const220 = 220
class projectileClass {
  constructor({
    mod: mod,
    defs: defs,
    state: state,
    ping: ping,
  }) {
    mod.hook(
      ...defs.getVersion('S_START_USER_PROJECTILE'),
      {
        order: 999999,
        filter: { fake: false },
      },
      (packet) => {
        let packetHandled = undefined
        if (
          packet.distance > 1 &&
          state.config.enabled &&
          state.config.advancedProjectiles
        ) {
          const time = packet.distance / packet.speed,
            deltaTime = time - Math.min(ping.min, const220) / 1000
          deltaTime > 0 &&
            ((packet.speed = packet.distance / deltaTime),
            (packetHandled = true))
        }
        return packetHandled
      }
    )
  }
}
module.exports = projectileClass
