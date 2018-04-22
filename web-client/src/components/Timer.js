import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

class Timer extends Component {
  constructor (props) {
    super(props)
    this.tick = this.tick.bind(this)

    this.state = {
      totalTime: this.props.totalTime
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.enabled) {
      clearInterval(this.clock)
      this.clock = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.clock)
    }

    this.setState({ totalTime: nextProps.totalTime })
  }

  componentWillUnmount () {
    clearInterval(this.clock)
  }

  tick () {
    if (this.props.enabled) {
      this.setState({ totalTime: this.state.totalTime + 1000 })
    }
  }

  render () {
    return (
      <span>
        <Button icon labelPosition='left' onClick={this.props.onClick}>
          <Icon name={(this.props.enabled ? 'pause' : 'play')} />
          {moment.duration(this.state.totalTime).format('hh:mm:ss', { trim: false })}
        </Button>
      </span>
    )
  }
}

Timer.propTypes = {
  enabled: PropTypes.bool.isRequired,
  totalTime: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Timer
