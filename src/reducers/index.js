import { combineReducers } from 'redux'
import defaultReducer from './default'
import videoStatus from './videoStatus'

export default combineReducers({
  defaultReducer,
  videoStatus,
})
