import React from 'react'
import { Widget } from 'src/components/common'

export default class ReportsAndClaimsWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.validationService.reportsAndClaims'
        subtitle='ui.dashboard.validationService.validationService'
        actions={[
          {
            label: 'New Reports',
            counter: { value: 1 },
            isLink: true,
          },
          {
            label: 'New Refund Claims',
            counter: { value: 1 },
            isLink: true,
          },
        ]}
      />
    )
  }
}
