import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './JobsArchiveContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class JobsArchiveContent extends React.Component {
  static propTypes = {
    jobCards: PropTypes.arrayOf(PropTypes.shape(ActiveJobCard.propTypes)),
  }

  // TODO @aevalyakin copied from ActiveJobsContent
  render () {
    const { jobCards } = this.props

    return jobCards == null ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.nav.jobsArchive' /></div>
          <div className={css.titleStats}>
            <div>
              <h2 className={css.titleStatsCounter}>{jobCards.length}</h2>
              <div className={css.medium}>Total cards</div>
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.section}>
            <h3>{moment().format(dateFormat)}</h3>
            {jobCards.map((card) => (<ActiveJobCard {...card} key={uniqid()} />))}
          </div>
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
        status: ActiveJobCard.STATUSES.APPLIED,
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
        status: ActiveJobCard.STATUSES.APPLIED,
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
        status: ActiveJobCard.STATUSES.APPLIED,
      },
    ],
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsArchiveContent)
