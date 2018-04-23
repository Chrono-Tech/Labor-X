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

          <div className={css.block}>
            <Widget
              title='Complete Your Profile'
              subtitle='General'
              actions={[
                {
                  href: '/general-profile',
                  label: <Translate value='nav.generalProfile' />,
                  isLink: true,
                  secondIcon: Image.SETS.MESSAGE_ERROR,
                },
                {
                  href: '/recruiter-profile',
                  label: <Translate value='nav.recruiterProfile' />,
                  isLink: true,
                },
                {
                  href: '/worker-profile',
                  label: <Translate value='nav.workerProfile' />,
                  isLink: true,
                },
                {
                  href: '/client-profile',
                  label: <Translate value='nav.clientProfile' />,
                  isLink: true,
                },
              ]}
            >
              If you'd like you may continue to use LaborX network anonymous.
              We care about our network integrity and asks our members to pass validation
              process done by our team to ensure every profile does meet our quality data
              standards. Verification will give you an access to Job Boards with higher
              skilled and trustworthy workers and clients. Complete the following tasks
              to gain higher validation level.
            </Widget>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Recruiters</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='Create your Job Board'
                subtitle='Recruiter'
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
              <Widget
                title='My Job Boards'
                subtitle='Recruiter'
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
              ></Widget>
            </div>
            <div className={css.highlightsRow}>
              <Widget
                title='HR Review'
                subtitle='Recruiter'
                actions={[
                  {
                    href: '/',
                    label: 'Install 10 Gas Ovens',
                    date: '20 Dec',
                  },
                  {
                    href: '/',
                    label: 'Pick-up 3 sofas',
                    date: '21 Dec',
                  },
                ]}
              ></Widget>
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Workers</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='Start your Job Search'
                subtitle='Worker'
                actions={[
                  {
                    href: '/general-job-board',
                    label: 'Visit general job board',
                    isLink: true,
                  },
                  {
                    href: '/job-boards',
                    label: 'Browse job boards',
                    isLink: true,
                  },
                ]}
              >
                You may visit our General Job Board and start your search or
                browse Job Boards created by other network users.
              </Widget>
              <Widget
                title='To-DO 20 Dec 2017'
                subtitle='Worker'
                actions={[
                  {
                    label: 'Install 10 Gas Ovens',
                    date: '10:30 PM',
                    isLink: true,

                  },
                  {
                    label: 'Pick-up 3 sofas',
                    date: '7:30 PM',
                    isLink: true,

                  },
                ]}
              ></Widget>
            </div>
            <div className={css.highlightsRow}>
              <Widget
                title='Opportunities'
                subtitle='Worker'
                actions={[
                  {
                    label: 'Opportunities',
                    counter: { value: 135 },
                    isLink: true,
                  },
                  {
                    label: 'Offers',
                    counter: { value: 3 },
                    isLink: true,
                  },
                  {
                    label: 'Applications',
                    isLink: true,
                  },
                ]}
              ></Widget>
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Clients</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='Post Your Job'
                subtitle='Client'
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
              <Widget
                title='My Posted Jobs'
                subtitle='Client'
                actions={[
                  {
                    label: 'Offers Activity',
                    counter: { value: 1 },
                    isLink: true,
                  },
                  {
                    label: 'Worker Assignments Review',
                    counter: { value: 1 },
                    isLink: true,
                  },
                ]}
              ></Widget>
            </div>
            <div className={css.highlightsRow}>
              <Widget
                title='Jobs Progress'
                subtitle='Client'
                actions={[
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
                ]}
              ></Widget>
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>Validation Service</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='Validation Requests'
                subtitle='Validation Service'
                actions={[
                  {
                    label: 'New Requests',
                    counter: { value: 1 },
                    isLink: true,
                  },
                  {
                    label: 'In Progress',
                    counter: { value: 1 },
                    isLink: true,
                  },
                ]}
              ></Widget>
              <Widget
                title='Reports & Claims'
                subtitle='Validation Service'
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
              ></Widget>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

