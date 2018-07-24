import React from 'react'
import { Widget } from 'src/components/common'

export default class ToDoWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.worker.toDo'
        subtitle='ui.dashboard.worker.worker'
        actions={[
          {
            label: 'Install 10 Gas Ovens',
            date: '10:30 PM',
            isLink: true,

          },
          {
            label: 'Pick-up 3 sofas',
            date: '7:30 PM',
            isLink: true,

          },
        ]}
      />
    )
  }
}
