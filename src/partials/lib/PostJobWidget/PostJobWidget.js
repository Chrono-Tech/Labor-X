import React from 'react'
import { Widget } from 'src/components/common'

export default class PostJobWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.client.postYourJob'
        subtitle='ui.dashboard.client.client'
        actions={[
          {
            href: '/',
            label: 'Learn more',
            isLink: true,
          },
        ]}
      >
      Has got a Job already? Post it now!
      </Widget>
    )
  }
}
