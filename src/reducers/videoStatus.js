export default function(state = { playing: false, paused: false }, {type}) {
  switch(type) {
    case 'PLAY':
      return { playing: true, paused: false }
    case 'PAUSE':
      return { playing: false, paused: true }
    case 'STOP':
      return { playing: false, paused: false }
    default:
      return state
  }
}
