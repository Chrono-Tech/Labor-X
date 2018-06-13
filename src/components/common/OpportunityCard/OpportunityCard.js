import React from 'react'
import { JobModel, BoardModel } from 'src/models'
import { Link } from 'src/components/common'
import PropTypes from 'prop-types'
import css from './OpportunityCard.scss'

export default class OpportunityCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
  }

  render () {
    const { job, board } = this.props
    return (
      <div className={css.root}>
        {board
          ? (
            <div>
              {!board.ipfs.logo ? null : (
                <img className={css.icon} src={board.ipfs.logo} alt={board.ipfs.name} />
              )}
              <p>{board.ipfs.name}</p>
            </div>
          )
          : (
            <div>
              <img className={css.icon} src='/static/temp/get-started.png' alt='' />
              <p>No Board</p>
            </div>
          )
        }
        <div className={css.jobInfo}>
          <Link className={css.jobName} href={`/opportunity-view/${job.id}`}><h4>{job.ipfs.name}</h4></Link>
          {!(job.ipfs.budget.isSpecified && job.ipfs.budget.award) ? null : (
            <div className={css.jobPay}>
              <p>LHUS {job.ipfs.budget.hourlyRateAward.toFixed(2)} (${job.ipfs.budget.hourlyRateAward.multipliedBy(30).toFixed(2)}) / h</p>
              <p>LHUS {job.ipfs.budget.award.toFixed(2)} (${job.ipfs.budget.award.multipliedBy(30).toFixed(2)})</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
