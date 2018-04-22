import { combineReducers } from 'redux'

import { START_TIMER, PAUSE_TIMER, STOP_TIMER, REQUEST_LOGS, RECEIVE_LOGS } from '../actions'

function timer (state = {
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

function logs (state = {
  filter: '',
  page: 1,
  totalPages: 1,
  data: []
}, action) {
  switch (action.type) {
    case REQUEST_LOGS:
      return Object.assign({}, state, {
        filter: action.filter,
        page: action.page
      })
    case RECEIVE_LOGS:
      return Object.assign({}, state, {
        filter: action.filter,
        page: action.page,
        data: action.data,
        totalPages: action.totalPages
      })
    default:
      return state
  }
}

export default combineReducers({
  timer,
  logs
})
