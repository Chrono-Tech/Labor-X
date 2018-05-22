import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { Translate, JobCard } from 'src/components/common'
import { signerSelector } from 'src/store'
import css from './PostedJobsContent.scss'

class PostedJobsContent extends React.Component {
  static propTypes = {
    jobCards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)),
  }

  render () {
    const { jobCards } = this.props

    return jobCards == null ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.postedJobs' /></div>
        </div>
        <div className={css.content}>
          {jobCards.map((card) => (<JobCard {...card} key={uniqid()} />))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  let jobs = state.jobs.list
  if(signer == null || jobs == null) { return {} }

  jobs = jobs.filter(job => job.client.toLowerCase() === signer.address)

  // TODO remove filtering inconsistent jobCards
  // jobs = jobs.filter(job => (
  //   job.ipfs.name != null &&
  //   job.ipfs.boardName != null &&
  //   job.ipfs.startDateString != null &&
  //   job.ipfs.hourlyRate != null &&
  //   job.ipfs.totalHours != null
  // ))

  return {
    jobCards: jobs.map( job => ({
      jobName: job.ipfs.name,
      title: job.ipfs.boardName,
      date: new Date(job.ipfs.startDateString),
      award: job.ipfs.totalHours * job.ipfs.hourlyRate,
      // TODO jobCard statuses
      status: JobCard.STATUSES.APPROVED,
      // TODO extra data
      icon: '/static/temp/get-started.png',
      applicants: 120,
      offers: 1,
      applicantsNew: 1,
      offersNew: 1,
    })),
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsContent)
