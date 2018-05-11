import ToDoContent from 'components/ToDo/ToDo'
import { MainLayout } from 'components/layouts'
import { TodoCard } from 'components/common'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import moment from 'moment'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'src/store'

const TODO = {
  todoLists: [
    {
      date: new Date(),
      todos: [
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.PROBLEM,
          startDate: moment().hours(19).minutes(30).toDate(),
          worked: 133200,
          totalHours: 40,
          cardNote: 'RE-DO TODAY',
        },
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.IN_PROGRESS,
          startDate: moment().hours(13).minutes(30).toDate(),
          deadline: moment().add(3, 'days').hours(19).minutes(30).toDate(),
          worked: 4850,
          totalHours: 40,
        },
        {
          jobName: 'Pick-up 3 sofas',
          status: TodoCard.STATUSES.ATTENTION,
          startDate: moment().hours(13).minutes(30).toDate(),
          deadline: moment().hours(19).minutes(30).toDate(),
          worked: 0,
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
          deadline: moment().add(1, 'days').hours(13).minutes(30).toDate(),
          worked: 1200,
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
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  render () {
    return (
      <MainLayout jobName='nav.toDo'>
        <ToDoContent {...TODO} />
      </MainLayout>
    )
  }
}

export default withRedux(initialStore)(ToDo)
