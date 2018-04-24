import { Widget, Image, Translate } from 'src/components/common'
import React from 'react'
import css from './ValidationTab.scss'

export default class ValidationTab extends React.Component {
  render () {
    return (
      <div>
        <Widget
          title='ui.myProfile.yourLevel'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'ui.myProfile.general.general',
            },
            {
              href: '/general-profile#photo',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.general.photoNameDate',
            },
            {
              href: '/general-profile#email',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.general.phoneMail',
            },
            {
              href: '/general-profile#address',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.general.homeAddress',
            },

            {
              label: 'ui.myProfile.recruiter.recruiter',
            },
            {
              href: '/recruiter-profile',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.recruiter.recruiterInformation',
            },

            {
              label: 'ui.myProfile.worker.worker',
            },
            {
              href: '/worker-profile',
              firstIcon: Image.SETS.SHIELD_SUCCESS,
              label: 'ui.myProfile.worker.workerInformation',
            },

            {
              label: 'ui.myProfile.client.client',
            },
            {
              href: '/client-profile',
              firstIcon: Image.SETS.SHIELD_ERROR,
              label: 'ui.myProfile.client.clientInformation',
            },


          ]}
        >
          <Translate value='ui.myProfile.yourLevelText' />
        </Widget>

        <Widget
          title='ui.myProfile.evaluator.evaluator'
          subtitle='ui.myProfile.evaluator.evaluatorInformation'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              label: 'Task One',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE
              }
            },
            {
              label: 'Task Two',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE
              }
            },
            {
              label: 'Task Three',
              firstIcon: {
                icon: Image.ICONS.CHECKBOX_CIRCLE
              }
            },
          ]}
        >
        </Widget>

        <Widget
          title='ui.myProfile.publicProfilePages'
          headerTheme={Widget.THEMES.WHITE}
          actions={[
            {
              href: '/recruiter-profile',
              label: 'ui.myProfile.recruiter.recruiter',
              isLink: true,
            },
            {
              href: '/worker-profile',
              label: 'ui.myProfile.worker.worker',
              isLink: true,
            },
            {
              href: '/client-profile',
              label: 'ui.myProfile.client.client',
              isLink: true,
            },
          ]}
        >
        </Widget>
      </div>
    )
  }
}
