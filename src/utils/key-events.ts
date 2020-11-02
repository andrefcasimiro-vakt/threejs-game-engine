export function subscribeKeyEvent(
  eventType: string = 'keydown',
  key: string,
  callback: () => void,
) {
  window.addEventListener(eventType, (ev: KeyboardEvent) => {
    console.log(ev.key)
    if (ev.key === key) {
      callback()
    }
  })
}

export function unsubscribeKeyEvent(
  eventType: string = 'keydown',
  key: string,
  callback: () => void,
) {
  window.removeEventListener(eventType, (ev: KeyboardEvent) => {
    if (ev.key === key) {
      callback()
    }
  })
}
