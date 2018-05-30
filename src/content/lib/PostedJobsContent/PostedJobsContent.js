import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Translate, JobCard } from 'src/components/common'
import { PayInvoiceDialog } from 'src/partials'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector, modalsPush } from 'src/store'
import css from './PostedJobsContent.scss'

class PostedJobsContent extends React.Component {
  static propTypes = {
    pushModal: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape(JobCard.propTypes)).isRequired,
  }

  componentDidMount () {
    const modal = {
      component: PayInvoiceDialog,
      props: {},
    }
    this.props.pushModal(modal)
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

function mapDispatchToProps (dispatch) {
  return {
    pushModal (modal) {
      dispatch(modalsPush(modal))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsContent)
