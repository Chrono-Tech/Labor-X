import React from 'react'
import { Widget, Image } from 'components/common'

export default class NotificationsTab extends React.Component {
  render () {
    return (
      <div>
        <Widget
          title='ui.myProfile.notifications.messagesAndEmailNotifications'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'ui.myProfile.notifications.worker.worker',
            },
            {
              label: 'ui.myProfile.notifications.worker.opportunities',
            },
            {
              label: 'ui.myProfile.notifications.worker.jobApplied',
            },
            {
              label: 'ui.myProfile.notifications.worker.jobOfferReceived',
            },
            {
              label: 'ui.myProfile.notifications.worker.invoiceUpdates',
            },
            {
              label: 'ui.myProfile.notifications.worker.endorsementReceived',
            },

            {
              label: 'ui.myProfile.notifications.client.client',
            },
            {
              label: 'ui.myProfile.notifications.client.applicationReceived',
            },
            {
              label: 'ui.myProfile.notifications.client.invoiceUpdates',
            },
            {
              label: 'ui.myProfile.notifications.client.offerAccepted',
            },

            {
              label: 'ui.myProfile.notifications.recruiter.recruiter',
            },
            {
              label: 'ui.myProfile.notifications.recruiter.myJobBoardUpdates',
            },
            {
              label: 'ui.myProfile.notifications.recruiter.offerReceived',
            },

            {
              label: 'ui.myProfile.notifications.general.general',
            },
            {
              label: 'ui.myProfile.notifications.general.jobBoardAdded',
            },
            {
              label: 'ui.myProfile.notifications.general.messageReceived',
            },
            {
              label: 'ui.myProfile.notifications.general.validationUpdates',
            },
            {
              label: 'ui.myProfile.notifications.general.ratingChanged',
            },
            {
              label: 'ui.myProfile.notifications.general.myJobUpdates',
            },
            {
              label: 'ui.myProfile.notifications.general.reportUpdates',
            },

            {
              label: 'ui.myProfile.notifications.jobBoards',
            },
          ]}
        />

        <Widget
          title='ui.myProfile.notifications.jobBoards'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              href: '/',
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
              label: 'Janna\'s Board',
              firstIcon: {
                icon: Image.ICONS.LOGO,
                color: Image.COLORS.RED,
              },
              isLink: true,
            },
          ]}
        />

        <Widget
          title='ui.myProfile.notifications.messaging.messaging'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'ui.myProfile.notifications.messaging.everyoneCanSendMessages',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_OFF,
                color: Image.COLORS.GREY,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.workers',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_ON,
                color: Image.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.clients',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_ON,
                color: Image.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.recruiters',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_ON,
                color: Image.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.withValidatedEmail',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_ON,
                color: Image.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.withValidatedId',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_ON,
                color: Image.COLORS.BLUE,
              },
            },
          ]}
        />
      </div>
    )
  }
}
