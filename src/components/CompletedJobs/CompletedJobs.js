import { Translate } from 'components/common'
import { CompletedJobCard } from 'components/common'
import { connect } from 'react-redux'
import { signerSelector, countFinishedJobsByWorkerSelector, finishedJobsByWorkerSelector, finalizedJobsByWorkerSelector, pendingFinishJobsByWorkerSelector } from 'src/store'
import React from 'react'
import css from './CompletedJobs.scss'

class CompletedJobs extends React.Component {
  render() {
    const { finishedCount, finishedJobs, finalizedJobs, pendingFinishJobs } = this.props;
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.completedJobs' /></div>
          <div className={css.completedJobsStatsBlock}>

            <div className={css.blockCounterCompleted}>
              <div className={css.blockCounterCompletedCount}>
                {finishedCount}
              </div>
              <div className={css.blockCounterCompletedText}>
                Completed
              </div>
            </div>

            <div className={css.blockTotalEarned}>
              <div className={css.blockTotalEarnedLx}>
                <span className={css.lxIcon}>lh-light</span>
                <span className={css.earnedTotalLx}>28.85</span>
              </div>
              <div className={css.blockTotalEarnedUsd}>
                Earned Total ($1,154.20)
              </div>
            </div>

            <div className={css.blockMonthEarned}>
              <div className={css.blockTotalEarnedLx}>
                <span className={css.lxIcon}>lh-light</span>
                <span className={css.earnedMonthLx}>15.00</span>
              </div>
              <div className={css.blockTotalEarnedUsd}>
                Earned this month ($450.00)
              </div>
            </div>

          </div>
        </div>
        <div className={css.content}>
          <div className={css.invoiceSentTitle}>
            Invoice Sent
          </div>

          {
            pendingFinishJobs.map((job) => <CompletedJobCard key={job.id} job={job} />)
          }

          <div className={css.completedTitle}>
            Completed
          </div>
          {
            finishedJobs.map((job) => <CompletedJobCard key={job.id} job={job} />)
          }

          <div className={css.finalizedTitle}>
            Finalized
          </div>
          {
            finalizedJobs.map((job) => <CompletedJobCard key={job.id} job={job} />)
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const signer = signerSelector()(state)
  const finishedCount = countFinishedJobsByWorkerSelector(signer.address)(state)
  const finishedJobs = finishedJobsByWorkerSelector(signer.address)(state);
  const finalizedJobs = finalizedJobsByWorkerSelector(signer.address)(state);
  const pendingFinishJobs = pendingFinishJobsByWorkerSelector(signer.address)(state);
  return {
    signer,
    finishedCount,
    finishedJobs,
    pendingFinishJobs,
    finalizedJobs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPostOffer: () => { },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CompletedJobs);