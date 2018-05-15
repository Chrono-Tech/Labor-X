import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Widget, Translate } from 'src/components/common'
import { MyFundsWidget } from 'src/partials'
import { SignerModel } from 'src/models'
import { signerSelector } from 'src/store'

import React from 'react'
import css from './DashboardContent.scss'

export class DashboardContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
  }

  render () {
    const { signer } = this.props
    return signer == null ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.dashboard' /></div>
        </div>
        <div className={css.content}>
          <div className={css.block}>
            <MyFundsWidget />
          </div>
          <div className={css.block}>
            <Widget
              href='/my-profile'
              title='ui.dashboard.general.completeYourProfile'
              subtitle='ui.dashboard.general.general'
              actions={[
                {
                  href: '/general-profile',
                  label: 'nav.generalProfile',
                  isLink: true,
                  secondIcon: Image.SETS.MESSAGE_ERROR,
                },
                {
                  href: '/recruiter-profile',
                  label: 'nav.recruiterProfile',
                  isLink: true,
                },
                {
                  href: '/worker-profile',
                  label: 'nav.workerProfile',
                  isLink: true,
                },
                {
                  href: '/client-profile',
                  label: 'nav.clientProfile',
                  isLink: true,
                },
              ]}
            >
              If you&apos;d like you may continue to use LaborX network anonymous.
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
              <Widget
                title='ui.dashboard.recruiter.createYourJobBoard'
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
            </div>
            <div className={css.highlightsRow}>
              <Widget
                href='/recruiter-jobs'
                title='ui.dashboard.recruiter.hrReview'
                subtitle='ui.dashboard.recruiter.recruiter'
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
              />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Workers</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='ui.dashboard.worker.startYourJobSearch'
                subtitle='ui.dashboard.worker.worker'
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
                title='ui.dashboard.worker.toDo'
                subtitle='ui.dashboard.worker.worker'
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
              />
            </div>
            <div className={css.highlightsRow}>
              <Widget
                href='/opportunities'
                title='ui.dashboard.worker.opportunities'
                subtitle='ui.dashboard.worker.worker'
                actions={[
                  {
                    href: '/opportunities',
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
              />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Clients</h2>
            <div className={css.highlightsRow}>
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
              <Widget
                title='ui.dashboard.client.myPostedJobs'
                subtitle='ui.dashboard.client.client'
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
              />
            </div>
            <div className={css.highlightsRow}>
              <Widget
                title='ui.dashboard.client.jobsProgress'
                subtitle='ui.dashboard.client.client'
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
              />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>Validation Service</h2>
            <div className={css.highlightsRow}>
              <Widget
                title='ui.dashboard.validationService.validationRequests'
                subtitle='ui.dashboard.validationService.validationService'
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
              />
              <Widget
                title='ui.dashboard.validationService.reportsAndClaims'
                subtitle='ui.dashboard.validationService.validationService'
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
              />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  return {
    signer,
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent)
