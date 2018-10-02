import { combineReducers } from 'redux'

import logs from './logReducer'
import timer from './timerReducer'

export default combineReducers({
  timer,
  logs
})
