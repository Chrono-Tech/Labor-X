import React from 'react'
import { Widget, Image } from 'components/common'
import css from './NotificationsTab.scss'

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
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.worker.opportunities',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.jobApplied',
              secondIcon: [
                Image.SETS.EMAIL_OFF,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.jobOfferReceived',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.invoiceUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.endorsementReceived',
              secondIcon: [
                Image.SETS.EMAIL_OFF,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },

            {
              label: 'ui.myProfile.notifications.client.client',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.client.applicationReceived',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.client.invoiceUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.client.offerAccepted',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_ON,
              ],
            },

            {
              label: 'ui.myProfile.notifications.recruiter.recruiter',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.recruiter.myJobBoardUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.recruiter.offerReceived',
              secondIcon: [
                Image.SETS.EMAIL_OFF,
                Image.SETS.NOTIFICATIONS_ON,
              ],
            },

            {
              label: 'ui.myProfile.notifications.general.general',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.general.jobBoardAdded',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.messageReceived',
              secondIcon: [
                Image.SETS.EMAIL_OFF,
                Image.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.validationUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.ratingChanged',
              secondIcon: [
                Image.SETS.EMAIL_OFF,
                Image.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.myJobUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.reportUpdates',
              secondIcon: [
                Image.SETS.EMAIL_ON,
                Image.SETS.NOTIFICATIONS_OFF,
              ],
            },
          ]}
        />

        <div className={css.spacer} />

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

        <div className={css.spacer} />

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
