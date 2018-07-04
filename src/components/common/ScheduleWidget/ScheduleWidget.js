import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import uniqid from 'uniqid'
import cn from 'classnames'
import css from './ScheduleWidget.scss'

const dateFormat = 'DD MMM YYYY'

export default class ScheduleWidget extends React.Component {
  static propTypes = {
  }

  renderMonth = (date) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const firstDayOfMonth = moment(date).date(1)
    const calendarCurrentDay = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'd')
    console.log(firstDayOfMonth)
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
                    calendarCurrentDay.add(1, 'd')
                    return (
                      <td
                        key={uniqid()}
                        className={cn(
                          css.cell,
                          index %  2 ? null : css.grey,
                          month !== moment(date).month() ? css.otherMonth : null
                        )}
                      >
                        {day}
                      </td>
                    )
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div className={css.root}>
        { this.renderMonth(new Date('2018-05-05')) }
      </div>
    )
  }
}
