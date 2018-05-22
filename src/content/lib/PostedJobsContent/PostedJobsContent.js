import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Translate, JobCard } from 'src/components/common'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector } from 'src/store'
import css from './PostedJobsContent.scss'

class PostedJobsContent extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)).isRequired,
  }

  render () {
    const { cards } = this.props

    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.postedJobs' /></div>
        </div>
        <div className={css.content}>
          {cards.map((card) => (<JobCard {...card} key={card.job.id} />))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsListSelector()(state)

  return {
    cards: jobs.map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: newJobNoticeSelector(signer.address, job.id)(state),
    })),
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsContent)
