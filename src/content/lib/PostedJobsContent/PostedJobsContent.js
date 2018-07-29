import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Translate, JobCard } from 'src/components/common'
import { getCards } from 'src/store/postedJobs/selectors'
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
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.postedJobs' /></div>
        </div>
        <div className={css.content}>
          {this.props.cards.sort(x => x.job.id).map((card) => (<JobCard {...card} onClickReview={this.handleOnClickReview} key={card.job.id} />))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: getCards(state),
})

const mapDispatchToProps = (dispatch) => ({
  push: (url) => dispatch(push(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsContent)
