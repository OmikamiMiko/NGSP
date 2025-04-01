'use strict'
class notificationClass {
  constructor({
    mod: modObject,
    state: stateObject,
    abn: abnormalityObject,
    me: meObject,
    defs: definitionsObject,
  }) {
    let someArray = []
    const SendMessage = (messageContent) => {
      modObject.send(...definitionsObject.getVersion('S_CHAT'), {
        channel: 21,
        name: '',
        message: messageContent,
      })
    }
    const clearIntervalFromSomeArray = () => {
      someArray.forEach((arrayObject) => {
        modObject.clearInterval(arrayObject)
      })
    }
    function setIntervalOnNotifactions(input) {
      stateObject.notifies[input] &&
        Array.isArray(stateObject.notifies[input]) &&
        stateObject.notifies[input].forEach((notify) => {
          someArray.push(
            modObject.setInterval(() => {
              if (
                !stateObject.config.notifications ||
                meObject.isTBA ||
                stateObject.baseData.continents[meObject.zone] !== 'dungeon' ||
                !meObject.inCombat ||
                abnormalityObject.hasIntersect(notify.abnormies) ||
                (notify.minLevel && meObject.level < notify.minLevel)
              ) {
                return //its maybe to reduce clutter on the screen ? it looks like dropping messages of certain types; but why is it in "setInterval" ?
              }
              SendMessage(notify.message)
            }, notify.checkInterval)
          )
        })
    }
    const OnLoginOrChangeTBAHero = () => {
      setIntervalOnNotifactions(meObject.job)
      setIntervalOnNotifactions('*')
    }
    modObject.hook('S_RETURN_TO_LOBBY', 'event', () => {
      clearIntervalFromSomeArray()
    })
    modObject.hook(
      'S_LOGIN',
      'event',
      {
        order: Infinity,
        filter: { fake: false },
      },
      () => {
        OnLoginOrChangeTBAHero()
      }
    )
    modObject.majorPatchVersion >= 99 &&
      modObject.hook(
        'TTB_S_CHANGE_HERO',
        'event',
        {
          order: Infinity,
          filter: { fake: false },
        },
        () => {
          OnLoginOrChangeTBAHero()
        }
      )
  }
}
module.exports = notificationClass
