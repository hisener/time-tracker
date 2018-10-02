export const START_TIMER = 'START_TIMER'
export const PAUSE_TIMER = 'PAUSE_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

export function startTimer () {
    return {
      type: START_TIMER
    }
  }
  
export function pauseTimer () {
    return {
        type: PAUSE_TIMER
    }
}

export function stopTimer () {
    return {
        type: STOP_TIMER
    }
}