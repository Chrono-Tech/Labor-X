import React from 'react'
import { Widget, Image } from 'src/components/common'

export default class MyJobBoardsWidget extends React.Component {
  render () {
    return (
      <Widget
        title='ui.dashboard.recruiter.myJobBoards'
        subtitle='ui.dashboard.recruiter.recruiter'
        actions={[
          {
            href: '/become-involved',
            label: 'Become Involved',
            firstIcon: {
              icon: Image.ICONS.LOGO,
              color: Image.COLORS.RED,
            },
            counter: { value: 3 },
            isLink: true,
          },
          {
            href: '/',
            label: 'Hays Recruitment',
            firstIcon: {
              icon: Image.ICONS.LOGO,
              color: Image.COLORS.RED,
            },
            isLink: true,
          },
        ]}
      />
    )
  }
}
