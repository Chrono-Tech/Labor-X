import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getCardsByGroupDays, getTotalCardsCount, getFinalizedCardsCount, getFinishedCardsCount } from 'src/store/archiveJobs/selectors'
import { Translate, ActiveJobCard } from 'src/components/common'
import css from './ArchiveJobsContent.scss'

const dateFormat = 'DD MMMM YYYY, ddd'

class ArchiveJobsContent extends React.Component {
  static propTypes = {
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

  renderHead({ finishedCount, finalizedCount, totalCount }) {
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

  render() {
    const { groups, totalCount, finishedCount, finalizedCount } = this.props
    return groups == null ? null : (
      <div className={css.main}>
        {!groups.length ? null : this.renderHead({ totalCount, finishedCount, finalizedCount })}
        <div className={css.content}>
          {groups.map(({ key, date, cards }) => (
            <div className={css.section} key={key}>
              <h3>{moment(date).format(dateFormat)}</h3>
              {cards.map((card) => (
                <ActiveJobCard
                  key={card.job.key}
                  job={card.job}
                  board={card.board}
                  workerPerson={card.worker}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    totalCount: getTotalCardsCount(state),
    finishedCount: getFinishedCardsCount(state),
    finalizedCount: getFinalizedCardsCount(state),
    groups: getCardsByGroupDays(state)
  }
}

function mapDispatchToProps(/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveJobsContent)
