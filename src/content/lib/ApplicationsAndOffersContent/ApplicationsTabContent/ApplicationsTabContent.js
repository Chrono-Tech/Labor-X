import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PersonModel from 'src/api/backend/model/PersonModel'
import { JobModel, BoardModel } from 'src/models'
import { WorkerJobCard } from 'components/common'
import css from './ApplicationsTabContent.scss'

class ApplicationsTabContent extends React.Component {
  static propTypes = {
    applications: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      client: PropTypes.instanceOf(PersonModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    applicationsApproved: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      client: PropTypes.instanceOf(PersonModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    push: PropTypes.func,
  }

  handleClickReviewOffer = (jobId) => {
    this.props.push(`/client-job-view/${jobId}`)
    // eslint-disable-next-line no-console
    console.log('---ApplicationsTabContent handleClickReviewOffer')
  }

  handleClickDismiss = () => {
    // eslint-disable-next-line no-console
    console.log('---ApplicationsTabContent handleClickDismiss')
  }

  render () {
    return (
      <div className={css.content}>
        { this.props.applicationsApproved.map(card => (<WorkerJobCard {...card} onClickReviewOffer={this.handleClickReviewOffer} key={card.offer.id} />)) }
        { this.props.applications.map(card => (<WorkerJobCard {...card} onClickDismiss={this.handleClickDismiss} key={card.offer.id} />)) }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (url) => dispatch(push(url)),
})

export default connect(null, mapDispatchToProps)(ApplicationsTabContent)
