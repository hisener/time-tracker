import {
    PAUSE_TIMER,
    START_TIMER,
    STOP_TIMER
} from '../actions/timerActions'

export default function timer (state = {
    enabled: false,
    startTime: null,
    duration: 0 // in millis
  }, action) {
    if (state.enabled && action.type === START_TIMER) {
      return state
    }
    if (!state.enabled && action.type === PAUSE_TIMER) {
      return state
    }
  
    switch (action.type) {
      case START_TIMER:
        return Object.assign({}, state, {
          enabled: true,
          startTime: Date.now()
        })
      case PAUSE_TIMER:
        return Object.assign({}, state, {
          enabled: false,
          startTime: null,
          duration: Date.now() - state.startTime + state.duration
        })
      case STOP_TIMER:
        return Object.assign({}, state, {
          enabled: false,
          startTime: null,
          duration: 0
        })
      default:
        return state
    }
  }