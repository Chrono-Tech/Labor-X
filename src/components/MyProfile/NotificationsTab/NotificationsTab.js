import React from 'react'
import { Widget, Icon } from 'components/common'
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
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.jobApplied',
              secondIcon: [
                Icon.SETS.EMAIL_OFF,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.jobOfferReceived',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.invoiceUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.worker.endorsementReceived',
              secondIcon: [
                Icon.SETS.EMAIL_OFF,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },

            {
              label: 'ui.myProfile.notifications.client.client',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.client.applicationReceived',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.client.invoiceUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.client.offerAccepted',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_ON,
              ],
            },

            {
              label: 'ui.myProfile.notifications.recruiter.recruiter',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.recruiter.myJobBoardUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.recruiter.offerReceived',
              secondIcon: [
                Icon.SETS.EMAIL_OFF,
                Icon.SETS.NOTIFICATIONS_ON,
              ],
            },

            {
              label: 'ui.myProfile.notifications.general.general',
              isHeader: true,
            },
            {
              label: 'ui.myProfile.notifications.general.jobBoardAdded',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.messageReceived',
              secondIcon: [
                Icon.SETS.EMAIL_OFF,
                Icon.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.validationUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.ratingChanged',
              secondIcon: [
                Icon.SETS.EMAIL_OFF,
                Icon.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.myJobUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_ON,
              ],
            },
            {
              label: 'ui.myProfile.notifications.general.reportUpdates',
              secondIcon: [
                Icon.SETS.EMAIL_ON,
                Icon.SETS.NOTIFICATIONS_OFF,
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
                icon: Icon.ICONS.COMPANY,
                color: Icon.COLORS.BLUE,
              },
              counter: { value: 3 },
              isLink: true,
            },
            {
              href: '/',
              label: 'Janna\'s Board',
              firstIcon: {
                icon: Icon.ICONS.COMPANY,
                color: Icon.COLORS.BLUE,
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
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.GREY,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.workers',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.clients',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.recruiters',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.withValidatedEmail',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.BLUE,
              },
            },
            {
              label: 'ui.myProfile.notifications.messaging.withValidatedId',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.BLUE,
              },
            },
          ]}
        />
      </div>
    )
  }
}
