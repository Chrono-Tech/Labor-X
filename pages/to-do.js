import React from 'react'
import moment from 'moment'
import withRedux from 'next-redux-wrapper'
import { TodoContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'
import { TodoCard } from 'src/components/common'
import initialStore from 'src/store'
import 'styles/globals/globals.scss'

const TODO = {
  todoLists: [
    {
      date: new Date(),
      todos: [
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.PROBLEM,
          startDate: moment().hours(19).minutes(30).toDate(),
          workedTime: 133200,
          totalHours: 40,
          cardNote: 'RE-DO TODAY',
        },
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.IN_PROGRESS,
          startDate: moment().hours(13).minutes(30).toDate(),
          endDate: moment().add(3, 'days').hours(19).minutes(30).toDate(),
          workedTime: 4850,
          totalHours: 40,
        },
        {
          jobName: 'Pick-up 3 sofas',
          status: TodoCard.STATUSES.ATTENTION,
          startDate: moment().hours(13).minutes(30).toDate(),
          endDate: moment().hours(19).minutes(30).toDate(),
          workedTime: 0,
          totalHours: 2,
          cardNote: 'DUE TODAY',
        },
      ],
    },
    {
      date: moment().add(1, 'days').toDate(),
      todos: [
        {
          jobName: 'Plumber Required',
          status: TodoCard.STATUSES.APPROVED,
          startDate: moment().add(1, 'days').hours(9).minutes(0).toDate(),
          endDate: moment().add(1, 'days').hours(13).minutes(30).toDate(),
          workedTime: 1200,
          totalHours: 6,
        },
      ],
    },
  ],
  feedbackCards: [
    {
      title: 'Move Stuff from A to B and C and D',
      jobName: 'Get Started Client',
      jobIcon: '/static/temp/get-started.png',
      recruiterName: 'Anna German Recruiter',
      recruiterIcon: '/static/temp/worker-3.jpg',
    },
  ],
}

class ToDo extends React.Component {
  render () {
    return (
      <MainLayout jobName='nav.toDo'>
        <TodoContent {...TODO} />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ToDo)
