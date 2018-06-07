import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { groupBy } from 'lodash'
import { SignerModel, JobModel, ProfileModel } from 'src/models'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector, profileSelector, modalsPush } from 'src/store'
import { PayInvoiceDialog, PaidInvoiceDialog, DeclineInvoiceDialog } from 'src/partials'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './ActiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ActiveJobsContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    totalCount: PropTypes.number.isRequired,
    toPayCount: PropTypes.number.isRequired,
    inProgressCount: PropTypes.number.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape(ActiveJobCard.propTypes)),
      })
    ),
    pushModal: PropTypes.func.isRequired,
  }

  constructor (...args) {
    super(...args)
    this.handleOnClickReview = this.handleOnClickReview.bind(this)
    this.handlePaidInvoice = this.handlePaidInvoice.bind(this)
    this.handleDeclineInvoice = this.handleDeclineInvoice.bind(this)
  }

  handleOnClickReview (job, worker) {
    const modal = {
      component: PayInvoiceDialog,
      props: { job, worker },
    }
    this.props.pushModal(modal)
  }

  handlePaidInvoice () {
    // TODO aevalyakin pickin any suitable card, need to be placed on appropriate card
    const card = this.props.groups[0].cards.filter(({ job, worker }) => job && worker )[0]
    card.recruiter = new ProfileModel({})

    const modal = {
      component: PaidInvoiceDialog,
      props: { ...card },
    }
    this.props.pushModal(modal)
  }
  handleDeclineInvoice () {
    // TODO aevalyakin pickin any suitable card, need to be placed on appropriate card
    const card = this.props.groups[0].cards.filter(({ job, worker }) => job && worker )[0]
    card.recruiter = new ProfileModel({})

    const modal = {
      component: DeclineInvoiceDialog,
      props: { ...card },
    }
    this.props.pushModal(modal)
  }

  renderHead ({ toPayCount, inProgressCount, totalCount }) {
    return (
      <div className={css.title}>
        <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
        <div className={css.titleStats}>
          <div>
            <h2 className={css.titleStatsCounter}>{toPayCount}</h2>
            <div className={css.medium}>To Pay</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{inProgressCount}</h2>
            <div>In Progress</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{totalCount}</h2>
            <div>Active</div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { groups, totalCount, toPayCount, inProgressCount } = this.props
    return groups == null ? null : (
      <div className={css.main}>
        {!groups.length ? null : this.renderHead({ totalCount, toPayCount, inProgressCount })}
        <div className={css.content}>
          {groups.map(({ key, date, cards }) => (
            <div className={css.section} key={key}>
              <h3>{moment(date).format(dateFormat)}</h3>
              {cards.map((card) => (
                <ActiveJobCard {...card} onClickReview={this.handleOnClickReview} key={card.job.key} />
              ))}
            </div>
          ))}
          <div
            onClick={this.handlePaidInvoice}
            onKeyPress={this.handlePaidInvoice}
            role='button'
            tabIndex={0}
          >
            CASE: PAID INVOICE
          </div>
          <div
            onClick={this.handleDeclineInvoice}
            onKeyPress={this.handleDeclineInvoice}
            role='button'
            tabIndex={0}
          >
            CASE: DECLINE INVOICE
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsListSelector()(state)

  const cards = jobs
    .filter((/*job*/) => true) // TODO @ipavlenko: Only active jobs
    .filter(job => job instanceof JobModel )
    .map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: newJobNoticeSelector(signer.address, job.id)(state),
      worker: profileSelector(job.worker)(state),
      recruiter: profileSelector(job.recruiter)(state),
    }))

  const inProgressCount = cards
    .filter(card => card.worker != null)
    .length

  const groups = groupBy(cards, card => moment(card.job.extra.publishedAt).format('YYYY-MM-DD'))
  return {
    signer,
    totalCount: cards.length,
    toPayCount: cards.length - inProgressCount,
    inProgressCount,
    groups: Object.entries(groups)
      .map(([key, cards]) => ({
        key,
        date: cards[0].job.extra.publishedAt,
        cards,
      }))
      .sort((a, b) => -moment(a.date).diff(moment(b.date))),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushModal (modal) {
      dispatch(modalsPush(modal))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsContent)
