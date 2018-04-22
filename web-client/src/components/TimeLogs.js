import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon, Input, List, Pagination } from 'semantic-ui-react'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

class TimeLogs extends Component {
  constructor (props) {
    super(props)

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange (event) {
    this.props.onChange(event.target.value)
  }

  logItems () {
    if (this.props.data.length < 1) {
      return ''
    }

    let logItems = this.props.data.map((log, index) => {
      let shouldRenderDate = index === 0 ||
        moment(log.dateTime).isBefore(this.props.data[index - 1].dateTime, 'day')

      return (
        <List.Item key={log.id}>
          {(shouldRenderDate) ?
            <Divider horizontal>{moment(log.dateTime).format('D MMMM')}</Divider>
            : ''}
          <List.Content floated='right'>
            {moment.duration(log.timeSpent).format('hh:mm:ss')}
            </List.Content>
          <List.Content>{log.description}</List.Content>
        </List.Item>
      )
    })

    return (
      <List>
        {logItems}
      </List>
    )
  }

  render () {
    return (
      <span>
        <Input size='small' icon='search' onChange={this.handleFilterChange}
               placeholder='Search...' style={{float:'right'}}  />

        {this.logItems()}

        <div style={{textAlign: 'center'}}>
          <Pagination
            defaultActivePage={1}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={this.props.totalPages}
            onPageChange={this.props.onChange}
          />
        </div>
      </span>
    )
  }
}

TimeLogs.propTypes = {
  data: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TimeLogs
