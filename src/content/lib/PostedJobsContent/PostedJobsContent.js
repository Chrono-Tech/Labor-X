import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Translate, JobCard } from 'src/components/common'
import { jobsListSelector, boardByIdSelector, offersCountForJobSelector/* , newJobNoticeSelector, signerSelector */ } from 'src/store'
import css from './PostedJobsContent.scss'

class PostedJobsContent extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)).isRequired,
    push: PropTypes.func,
  }

  handleOnClickReview = (jobId) => {
    this.props.push(`/review-applicants/${jobId}`)
  }

  render () {
    const { cards } = this.props
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.postedJobs' /></div>
        </div>
        <div className={css.content}>
          {cards.sort(x => x.job.id).map((card) => (<JobCard {...card} onClickReview={this.handleOnClickReview} key={card.job.id} />))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const jobs = jobsListSelector()(state)

  return {
    cards: jobs.map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      applicantsCount: offersCountForJobSelector(job.id)(state),
      // notice: newJobNoticeSelector(signer.address, job.id)(state),
    })),
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (url) => dispatch(push(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsContent)
