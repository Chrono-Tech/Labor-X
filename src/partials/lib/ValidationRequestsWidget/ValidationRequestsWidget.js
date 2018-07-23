import React from 'react'
import { Widget } from 'src/components/common'

export default class ValidationRequestsWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.validationService.validationRequests'
        subtitle='ui.dashboard.validationService.validationService'
        actions={[
          {
            label: 'New Requests',
            counter: { value: 1 },
            isLink: true,
          },
          {
            label: 'In Progress',
            counter: { value: 1 },
            isLink: true,
          },
        ]}
      />
    )
  }
}
