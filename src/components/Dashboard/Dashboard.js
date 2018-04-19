import { Image, Widget, Translate } from 'components/common'

import React from 'react'
import css from './Dashboard.scss'

const TempActions = [
  {
    href: '/',
    label: 'General profile',
    isLink: true,
  },
  {
    href: '/',
    firstIcon: Image.SETS.SHIELD_SUCCESS,
    label: 'Validate Your Email or Phone',
  },
  {
    href: '/',
    label: 'Validate Your ID',
    firstIcon: Image.SETS.SHIELD_ERROR,
  },
  {
    href: '/',
    label: 'Validate Documents (Worker)',
    firstIcon: Image.SETS.SHIELD_ERROR,
    secondIcon: Image.SETS.MESSAGE_ERROR,
  },
  {
    href: '/',
    label: 'Become Involved',
    firstIcon: {
      name: Image.ICONS.LOGO,
      color: Image.COLORS.RED,
    },
    counter: { value: 3 },
  },
  {
    href: '/',
    label: 'Hays Recruitment',
    firstIcon: {
      name: Image.ICONS.LOGO,
      color: Image.COLORS.RED,
    },
    counter: { value: 0 },
  },
  {
    href: '/',
    label: 'Opportunities',
    counter: { value: 135 },
  },
  {
    href: '/',
    label: 'Offers',
    counter: { value: 3 },
  },
  {
    href: '/',
    label: 'Applications (0)',
    counter: { value: 0 },
  },
  {
    href: '/',
    label: 'Applications (NaN)',
    counter: { value: NaN },
  },
  {
    href: '/',
    label: 'Install 10 Gas Ovens',
    counter: { value: 3, isPercent: true },
  },
  {
    href: '/',
    label: 'Pick-up 3 sofas',
    counter: { value: 0, isPercent: true },
  },
  {
    href: '/',
    label: 'Install 10 Gas Ovens',
    date: '1:30 PM',
  },
  {
    href: '/',
    label: 'Create job',
    secondIcon: Image.SETS.HELP,
    secondIconTip: {
      tip: 'In order to create Your Job Board you will need to complete your general info and recruiter profile.',
    },
  },
]

export default class Dashboard extends React.Component {
  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.dashboard' /></div>
        </div>
        <div className={css.content}>

          <div className={css.highlights}>
            <div className={css.highlight}>
              <Widget
                title='Complete Your Profile'
                subtitle='General'
                actions={TempActions}
              >
                You may continue to use <strong>laborX</strong> network anonymous if you wish so. To open wider
                possibilities and access better Offers, Workers and Recruiters you may complete your profile by using
                links below.
              </Widget>
            </div>
            <div className={css.highlight}>
              <Widget
                title='Validate Your Data'
                subtitle='General'
                actions={TempActions}
              >
                We care about our network integrity and asks our members to pass verification process. Validation will
                give you an access to Job Boards with higher skilled and trustworthy workers and clients.
              </Widget>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
