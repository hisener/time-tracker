import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, TextArea } from 'semantic-ui-react'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

class BookTimeModal extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      timeSpent: this.props.timeSpent,
      dateTime: new Date().toISOString().slice(0, -8)
    }
  }

  handleChange (event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit () {
    let { description, timeSpent, dateTime } = this.state
    dateTime = moment(dateTime).toISOString()
    timeSpent = (timeSpent !== 0) ? moment.duration(timeSpent) : moment.duration(this.props.timeSpent)
    timeSpent = timeSpent.as('milliseconds')

    this.props.onSubmit({
      description,
      timeSpent,
      dateTime
    })

    this.setState({
      timeSpent: this.props.timeSpent,
      dateTime: new Date().toISOString().slice(0, -8)
    })
  }

  render () {
    let { open, onClose, timeSpent, fillTimeSpent } = this.props
    timeSpent = (fillTimeSpent) ? moment.duration(timeSpent).format('hh:mm:ss', { trim: false }) : ''

    return (
      <Modal open={open} onClose={onClose} >
        <Modal.Header>Book Time</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Description</label>
              <TextArea autoHeight name='description' rows={1}
                        onChange={this.handleChange} placeholder='Description'
                        required />
            </Form.Field>
            <Form.Field>
              <label>Time spent (hh:mm or hh:mm:ss)</label>
              <Input type='text' name='timeSpent' defaultValue={timeSpent}
                     pattern='[\d]{2,}:[\d]{2}(:[\d]{2})?' onChange={this.handleChange}
                     placeholder='Time spent (ie: 02:30)' required />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <Input type='datetime-local' name='dateTime' onChange={this.handleChange}
                     defaultValue={new Date().toISOString().slice(0, -8)} required />
            </Form.Field>

            <Button type='submit' positive labelPosition='right' icon='checkmark'
                    content='Submit' />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

BookTimeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  timeSpent: PropTypes.number,
  fillTimeSpent: PropTypes.bool
}

export default BookTimeModal
