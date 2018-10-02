import {
    RECEIVE_LOGS,
    REQUEST_LOGS
  } from '../actions/logActions'

export default function logs (state = {
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