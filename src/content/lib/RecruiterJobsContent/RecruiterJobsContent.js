import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { JOB_STATE_FINISHED, JOB_STATE_FINALIZED, JOB_STATE_PENDING_FINISH } from 'src/models'
import { signerSelector, jobsListSelector, boardByIdSelector, newJobNoticeSelector } from 'src/store'
import { Translate, Tab } from 'src/components/common'
import ReviewTab from './ReviewTab/ReviewTab'
import ActiveTab from './ActiveTab/ActiveTab'
import CompletedTab from './CompletedTab/CompletedTab'
import css from './RecruiterJobsContent.scss'

class RecruiterJobsContent extends React.Component {
  static propTypes = {
    expectedRewards: PropTypes.number,
    earned: PropTypes.number,

    reviewTab: PropTypes.shape(ReviewTab.propTypes),
    activeTab: PropTypes.shape(ActiveTab.propTypes),
    completedTab: PropTypes.shape(CompletedTab.propTypes),
  }

  constructor (props, context){
    super(props, context)
    this.handleTabClick = this.handleTabClick.bind(this)

    this.state = {
      currentTab: 0,
    }
  }

  handleTabClick (index) {
    this.setState({ currentTab: index })
  }

  tabs = [
    {
      key: 'review',
      title: 'HR Review',
      content: (props) => <ReviewTab {...props.reviewTab} />,
    },
    {
      key: 'active',
      title: 'Active',
      content: (props) => <ActiveTab {...props.activeTab} />,
    },
    {
      key: 'completed',
      title: 'Completed',
      content: (props) => <CompletedTab {...props.completedTab} />,
    },
  ]

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.jobs' /></div>
          <div className={css.titleStats}>
            <div>
              <div className={css.reviewCounter}>{this.props.reviewTab.cards.length}</div>
              <div className={css.counterText}>For Review</div>
            </div>
            <div>
              <div className={css.statAmount}>
                <i className='material-icons'>star</i>
                <div>{this.props.expectedRewards.toFixed(2)}</div>
              </div>
              <div className={css.statText}>Expected Rewards (${(this.props.expectedRewards * 30).toFixed(2)})</div>
            </div>
            <div>
              <div className={css.statAmount}>
                <i className='material-icons'>star</i>
                <div>{this.props.earned.toFixed(2)}</div>
              </div>
              <div className={css.statText}>Earned this month (${(this.props.earned * 30).toFixed(2)})</div>
            </div>
          </div>
          <div className={css.tabs}>
            {this.tabs.map((tab, index) => (
              <Tab
                key={tab.key}
                className={css.tab}
                classActive={css.tabActive}
                isActive={this.state.currentTab === index}
                onClick={this.handleTabClick}
                title={tab.title}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className={css.content}>
          {this.tabs[this.state.currentTab].content(this.props)}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  const jobs = jobsListSelector()(state)
  const cards = jobs
    // .filter() // Filter by recruiter
    .map(job => ({
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: newJobNoticeSelector(signer.address, job.id)(state),
    }))
  return {
    expectedRewards: 10,
    earned: 7,
    reviewTab: {
      cards: cards.filter(card => [JOB_STATE_PENDING_FINISH].indexOf(card.job.state) >= 0),
      feedback: [],
    },
    activeTab: {
      cards: cards.filter(card => [JOB_STATE_PENDING_FINISH, JOB_STATE_FINISHED, JOB_STATE_FINALIZED].indexOf(card.job.state) < 0),
    },
    completedTab: {
      cards: cards.filter(card => [JOB_STATE_FINISHED, JOB_STATE_FINALIZED].indexOf(card.job.state) >= 0),
    },
  }
}

export default connect(mapStateToProps)(RecruiterJobsContent)
