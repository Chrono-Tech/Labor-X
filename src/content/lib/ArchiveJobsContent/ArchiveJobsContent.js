import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { groupBy } from 'lodash'
import { SignerModel, JOB_STATE_FINISHED, JOB_STATE_FINALIZED } from 'src/models'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector, profileSelector } from 'src/store'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './ArchiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ArchiveJobsContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    totalCount: PropTypes.number.isRequired,
    finishedCount: PropTypes.number.isRequired,
    finalizedCount: PropTypes.number.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape(ActiveJobCard.propTypes)),
      })
    ),
  }

  renderHead ({ finishedCount, finalizedCount, totalCount }) {
    return (
      <div className={css.title}>
        <div className={css.titleText}><Translate value='nav.archivedJobs' /></div>
        <div className={css.titleStats}>
          <div>
            <h2 className={css.titleStatsCounter}>{finalizedCount}</h2>
            <div className={css.medium}>Finalized</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{finishedCount}</h2>
            <div>Finished</div>
          </div>
          <div>
            <h2 className={css.titleStatsCounter}>{totalCount}</h2>
            <div>Total</div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { groups, totalCount, finishedCount, finalizedCount } = this.props
    return groups == null ? null : (
      <div className={css.main}>
        {!groups.length ? null : this.renderHead({ totalCount, finishedCount, finalizedCount })}
        <div className={css.content}>
          {groups.map(({ key, date, cards }) => (
            <div className={css.section} key={key}>
              <h3>{moment(date).format(dateFormat)}</h3>
              {cards.map((card) => (
                <ActiveJobCard {...card} key={card.job.key} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsListSelector()(state)

  const allowedStatuses = [ JOB_STATE_FINISHED, JOB_STATE_FINALIZED ]
  const cards = jobs
    .filter((job) => allowedStatuses.find(state => {
      return job.state === state
    }))
    .map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: newJobNoticeSelector(signer.address, job.id)(state),
      worker: profileSelector(job.worker)(state),
      recruiter: profileSelector(job.recruiter)(state),
    }))

  const finalizedCount = cards
    .filter(card => card.worker != null)
    .length

  const groups = groupBy(cards, card => moment(card.job.extra.createdAt).format('YYYY-MM-DD'))
  return {
    signer,
    totalCount: cards.length,
    finishedCount: cards.length - finalizedCount,
    finalizedCount,
    groups: Object.entries(groups)
      .map(([key, cards]) => ({
        key,
        date: cards[0].job.extra.createdAt,
        cards,
      }))
      .sort((a, b) => -moment(a.date).diff(moment(b.date))),
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveJobsContent)
