export default function(state = {}, {type}) {
  switch(type) {
    case 'SUCCESS':
      return {...state, ok: true}
    case 'FAILED':
      return {...state, ok: false}
    default:
      return state
  }
}
