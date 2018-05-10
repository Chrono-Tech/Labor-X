import ToDoContent from 'components/ToDo/ToDo'
import { MainLayout } from 'components/layouts'
import { TodoCard } from 'components/common'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from 'src/store'

const TODO = {
  todoLists: [
    {
      date: new Date('2018-12-20'),
      todos: [
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.PROBLEM,
          startDate: new Date('2018-12-20 7:30 pm'),
          spent: 133200,
          totalHours: 40,
          cardNote: 'RE-DO TODAY',
        },
        {
          jobName: 'Install 10 Gas Ovens',
          status: TodoCard.STATUSES.IN_PROGRESS,
          startDate: new Date('2018-12-20 1:30 pm'),
          deadline: new Date('2018-12-23 1:30 pm'),
          spent: 4850,
          totalHours: 40,
        },
        {
          jobName: 'Pick-up 3 sofas',
          status: TodoCard.STATUSES.ATTENTION,
          startDate: new Date('2018-12-20 1:30 pm'),
          deadline: new Date('2018-12-23 7:30 pm'),
          spent: 0,
          totalHours: 2,
          cardNote: 'DUE TODAY',
        },
      ],
    },
    {
      date: new Date('2018-12-21'),
      todos: [
        {
          jobName: 'Plumber Required',
          status: TodoCard.STATUSES.APPROVED,
          startDate: new Date('2018-12-21 9:00 pm'),
          deadline: new Date('2018-12-22 1:30 pm'),
          spent: 1200,
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
