import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './ActiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ActiveJobsContent extends React.Component {
  static propTypes = {
    jobCards: PropTypes.arrayOf(PropTypes.shape(ActiveJobCard.propTypes)),
  }

  render () {
    const { jobCards } = this.props
    const jobCardsAttention = jobCards.filter(card => (card.status === ActiveJobCard.STATUSES.ATTENTION))
    const jobCardsInProgress = jobCards.filter(card => (card.status === ActiveJobCard.STATUSES.IN_PROGRESS))

    let jobCardsDateGrouped = {}
    jobCards
      .filter(card => (card.status !== ActiveJobCard.STATUSES.ATTENTION))
      .map(job => {
        const dateKey = moment(job.date).startOf('day').format(dateFormat)
        jobCardsDateGrouped[dateKey] = (jobCardsDateGrouped[dateKey] || []).concat([job])
      })

    return jobCards == null ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
          <div className={css.titleStats}>
            <div>
              <h2 className={css.titleStatsCounter}>{jobCardsAttention.length}</h2>
              <div className={css.medium}>To Pay</div>
            </div>
            <div>
              <h2 className={css.titleStatsCounter}>{jobCardsInProgress.length}</h2>
              <div>In Progress</div>
            </div>
            <div>
              <h2 className={css.titleStatsCounter}>{jobCards.length}</h2>
              <div>Active</div>
            </div>
          </div>
        </div>
        <div className={css.content}>
          { jobCardsAttention.length > 0 &&
            <div className={css.section}>
              <h3>Review & Pay</h3>
              {jobCardsAttention.map((card) => (<ActiveJobCard {...card} key={uniqid()} />))}
            </div>
          }
          {
            Object.keys(jobCardsDateGrouped).map(dateKey => (
              <div className={css.section}>
                <h3>{dateKey}</h3>
                {jobCardsDateGrouped[dateKey].map((card) => (<ActiveJobCard {...card} key={uniqid()} />))}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (/*state*/) {
  return {
    jobCards: [
      {
        jobName: 'Install 10 Gas Ovens',
        hourlyRate: 20,
        totalHours: 4,
        workerName: 'James Harvey',
        workerIcon: '/static/temp/worker.jpg',
        recruiterName: 'Anna German',
        recruiterIcon: '/static/temp/recruiter.jpg',
        workedTime: 9000,
        date: new Date(new Date().getTime() + 86400000),
        status: ActiveJobCard.STATUSES.ATTENTION,
      },
      {
        jobName: 'Install 10 Gas Ovens',
        hourlyRate: 20,
        totalHours: 4,
        workerName: 'James Harvey',
        workerIcon: '/static/temp/worker.jpg',
        recruiterName: 'Anna German',
        recruiterIcon: '/static/temp/recruiter.jpg',
        workedTime: 9000,
        date: new Date(new Date().getTime() + 86400000),
        status: ActiveJobCard.STATUSES.IN_PROGRESS,
      },
      {
        jobName: 'Install 10 Gas Ovens',
        hourlyRate: 20,
        totalHours: 4,
        workerName: 'James Harvey',
        workerIcon: '/static/temp/worker.jpg',
        recruiterName: 'Anna German',
        recruiterIcon: '/static/temp/recruiter.jpg',
        workedTime: 9000,
        date: new Date(new Date().getTime() + 86400000),
        status: ActiveJobCard.STATUSES.APPROVED,
      },
      {
        jobName: 'Install 10 Gas Ovens',
        hourlyRate: 20,
        totalHours: 4,
        workerName: 'James Harvey',
        workerIcon: '/static/temp/worker.jpg',
        recruiterName: 'Anna German',
        recruiterIcon: '/static/temp/recruiter.jpg',
        workedTime: 9000,
        date: new Date(new Date().getTime() + 86400000 * 2),
        status: ActiveJobCard.STATUSES.IN_PROGRESS,
      },
      {
        jobName: 'Install 10 Gas Ovens',
        hourlyRate: 20,
        totalHours: 4,
        workerName: 'James Harvey',
        workerIcon: '/static/temp/worker.jpg',
        recruiterName: 'Anna German',
        recruiterIcon: '/static/temp/recruiter.jpg',
        workedTime: 9000,
        date: new Date(new Date().getTime() + 86400000 * 2),
        status: ActiveJobCard.STATUSES.APPROVED,
      },
    ],
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsContent)
