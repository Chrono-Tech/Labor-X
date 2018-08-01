import React from 'react'
import { Widget, Icon, Translate } from 'components/common'
import css from './ValidationTab.scss'

export default class ValidationTab extends React.Component {
  render () {
    return (
      <div>
        <Widget
          title='ui.myProfile.validation.yourLevel'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'ui.myProfile.validation.general.general',
              isHeader: true,
            },
            {
              href: '/general-profile#photo',
              firstIcon: Icon.SETS.SECURITY_CHECK,
              label: 'ui.myProfile.validation.general.photoNameDate',
            },
            {
              href: '/general-profile#email',
              firstIcon: Icon.SETS.SECURITY_CHECK,
              label: 'ui.myProfile.validation.general.phoneMail',
            },
            {
              href: '/general-profile#address',
              firstIcon: Icon.SETS.SECURITY_NONE,
              label: 'ui.myProfile.validation.general.homeAddress',
            },

            {
              label: 'ui.myProfile.validation.recruiter.recruiter',
              isHeader: true,
            },
            {
              href: '/recruiter-profile',
              firstIcon: Icon.SETS.SECURITY_NONE,
              label: 'ui.myProfile.validation.recruiter.recruiterInformation',
            },

            {
              label: 'ui.myProfile.validation.worker.worker',
              isHeader: true,
            },
            {
              href: '/worker-profile',
              firstIcon: Icon.SETS.SECURITY_CHECK,
              label: 'ui.myProfile.validation.worker.workerInformation',
            },

            {
              label: 'ui.myProfile.validation.client.client',
              isHeader: true,
            },
            {
              href: '/client-profile',
              firstIcon: Icon.SETS.SECURITY_NONE,
              label: 'ui.myProfile.validation.client.clientInformation',
            },
          ]}
        >
          <Translate value='ui.myProfile.validation.yourLevelText' />
        </Widget>

        <Widget
          title='ui.myProfile.validation.evaluator.evaluator'
          subtitle='ui.myProfile.validation.evaluator.evaluatorInformation'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'Task One',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.GREY,
              },
            },
            {
              label: 'Task Two',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.GREY,
              },
            },
            {
              label: 'Task Three',
              firstIcon: {
                icon: Icon.ICONS.CHECK_CIRCLE,
                color: Icon.COLORS.GREY,
              },
            },
          ]}
        />

        <div className={css.spacer} />

        <Widget
          className={css.block}
          title='ui.myProfile.validation.publicProfilePages'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              href: '/recruiter-profile',
              label: 'ui.myProfile.validation.recruiter.recruiter',
              isLink: true,
            },
            {
              href: '/worker-profile',
              label: 'ui.myProfile.validation.worker.worker',
              isLink: true,
            },
            {
              href: '/client-profile',
              label: 'ui.myProfile.validation.client.client',
              isLink: true,
            },
          ]}
        />
      </div>
    )
  }
}
