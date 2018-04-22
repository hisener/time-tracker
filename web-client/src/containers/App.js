import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Header, Segment } from 'semantic-ui-react'

import Timer from '../components/Timer'
import BookTimeModal from '../components/BookTimeModal'
import { startTimer, pauseTimer, stopTimer, addLog, fetchLogs } from '../actions'
import TimeLogs from '../components/TimeLogs'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleTimerChange = this.handleTimerChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLogSubmit = this.handleLogSubmit.bind(this)
    this.handleLogsChange = this.handleLogsChange.bind(this)

    this.state = {
      modalOpen: false,
      fillTimeSpent: false
    }
  }

  componentDidMount () {
    this.props.dispatch(fetchLogs())
  }

  handleTimerChange () {
    let {timerEnabled, dispatch} = this.props

    if (timerEnabled) {
      dispatch(pauseTimer())
    } else {
      dispatch(startTimer())
    }
  }

  openModal (fillTimeSpent) {
    if (fillTimeSpent) {
      this.props.dispatch(pauseTimer())
    }

    this.setState({
      modalOpen: true,
      fillTimeSpent: fillTimeSpent
    })
  }

  handleModalClose () {
    this.setState({
      modalOpen: false
    })

    this.props.dispatch(fetchLogs())
  }

  handleLogSubmit (log) {
    if (this.state.fillTimeSpent) {
      this.props.dispatch(stopTimer())
    }

    this.setState({
      modalOpen: false
    })

    this.props.dispatch(addLog(log))
  }

  handleLogsChange (event, data) {
    if (typeof event === 'string') {
      this.props.dispatch(fetchLogs(event))
      return
    }

    if (data && data.activePage) {
      this.props.dispatch(fetchLogs(this.props.filter, data.activePage))
    }
  }

  render () {
    return (
      <Container>
        <Segment style={{textAlign: 'center'}}>
          <Header size='huge'>Time Tracker</Header>
        </Segment>

        <Segment style={{textAlign: 'center'}}>
          <Timer enabled={this.props.timerEnabled}
                 totalTime={this.props.totalTime}
                 onClick={this.handleTimerChange} />
          <Button content='Done' icon='clock' labelPosition='left' onClick={() => { this.openModal(true)} } />
        </Segment>

        <BookTimeModal open={this.state.modalOpen}
                       onSubmit={this.handleLogSubmit}
                       onClose={this.handleModalClose}
                       timeSpent={this.props.totalTime}
                       fillTimeSpent={this.state.fillTimeSpent} />

        <Segment>
          <Header size='medium'>Logs</Header>
          <Button content='Add Log' icon='add to calendar' onClick={() => { this.openModal(false)} } />

          <TimeLogs data={this.props.data} totalPages={this.props.totalPages} onChange={this.handleLogsChange} />
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps (state) {
  const { timer, logs } = state

  let totalTime = timer.duration
  if (timer.startTime) {
    totalTime += Date.now() - timer.startTime
  }

  return {
    timerEnabled: timer.enabled,
    totalTime: totalTime,
    filter: logs.filter,
    data: logs.data,
    page: logs.page,
    totalPages: logs.totalPages
  }
}

export default connect(mapStateToProps)(App)
