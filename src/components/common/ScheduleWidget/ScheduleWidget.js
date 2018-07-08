import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import uniqid from 'uniqid'
import cn from 'classnames'
import { Tip } from 'src/components/common'
import css from './ScheduleWidget.scss'

const calendarFormat = 'MMMM YYYY'
const tipFormat = 'DD MMM YYYY, ddd'

export default class ScheduleWidget extends React.Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      description: PropTypes.string,
    })),
  }

  renderMonth = (date, events = []) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const firstDayOfMonth = moment(date).date(1)
    const calendarCurrentDay = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'd')
    return (
      <div className={css.month}>
        <table>
          <thead>
            <tr>
              { weekDays.map( (day, index) => ( <th key={uniqid()} className={cn(css.headerCell, index %  2 ? null : css.grey)}>{day}</th> ))}
            </tr>
          </thead>
          <tbody>
            { [...Array(6)].map(() => (
              <tr key={uniqid()}>
                {
                  [...Array(7)].map((e, index) => {
                    const day = calendarCurrentDay.date()
                    const month = calendarCurrentDay.month()
                    const td =  (
                      <td
                        key={uniqid()}
                        className={cn(
                          css.cell,
                          index %  2 ? null : css.grey,
                          month !== moment(date).month() ? css.otherMonth : null,
                          calendarCurrentDay.isSame(new Date(), 'day') ? css.currentDay : null
                        )}
                      >
                        <div>
                          <p>{day}</p>
                          {
                            events.filter(e => calendarCurrentDay.isSame(e.date, 'day')).map(e => (
                              <Tip
                                title={moment(e.date).format(tipFormat)}
                                tip={e.description}
                                key={uniqid()}
                              >
                                <div className={css.event} />
                              </Tip>
                            ))
                          }
                        </div>
                      </td>
                    )
                    calendarCurrentDay.add(1, 'd')
                    return td
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  renderCalendar = (date) => {
    const { events } = this.props
    return (
      <div className={css.calendarRoot}>
        <p>{moment(date).format(calendarFormat)}</p>
        { this.renderMonth(date, events) }
      </div>
    )
  }

  render () {
    return (
      <div className={css.root}>
        { this.renderCalendar( new Date() ) }
        { this.renderCalendar( moment(new Date()).add(1, 'month').toDate() ) }
        { this.renderCalendar( moment(new Date()).add(2, 'month').toDate() ) }
      </div>
    )
  }
}
