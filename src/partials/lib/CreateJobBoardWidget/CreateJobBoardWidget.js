import React from 'react'
import { Widget, Image } from 'src/components/common'

export default class CreateJobBoardWidget extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <Widget
        href='/create-job-board'
        title='ui.dashboard.recruiter.createYourJobBoard'
        subtitle='ui.dashboard.recruiter.recruiter'
        actions={[
          {
            href: '/create-job-board',
            label: 'Create a job board',
            secondIcon: Image.SETS.HELP,
            secondIconTip: {
              tip: 'tip.createJobBoard',
            },
            isLink: true,
          },
          {
            href: '/create-client-job-board',
            label: 'Create a client job board',
            secondIcon: Image.SETS.HELP,
            secondIconTip: {
              tip: 'tip.createClientJobBoard',
            },
            isLink: true,
          },
        ]}
      >
                Create you first Job Board and start to build your network of Clients
                and Workers to receive fees on job completed.
      </Widget>
    )
  }
}
