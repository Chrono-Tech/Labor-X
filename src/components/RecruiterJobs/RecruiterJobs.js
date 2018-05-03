import { Translate } from 'components/common'
import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import ReviewTab from './ReviewTab/ReviewTab'
import ActiveTab from './ActiveTab/ActiveTab'
import CompletedTab from './CompletedTab/CompletedTab'
import css from './RecruiterJobs.scss'

export default class RecruiterJobs extends React.Component {
  static propTypes = {
    reviewTab: PropTypes.shape(
      ReviewTab.propTypes
    ),
    expectedRewards: PropTypes.number,
    earned: PropTypes.number,
  }

  constructor (props, context){
    super(props, context)
    this.handleTabClick = this.handleTabClick.bind(this)

    this.state = {
      currentTab: 0,
      tabs: [
        {
          title: 'HR Review',
          content: <ReviewTab {...props.reviewTab} />,
        },
        {
          title: 'Active',
          content: <ActiveTab />,
        },
        {
          title: 'Completed',
          content: <CompletedTab />,
        },
      ],
    }
  }

  handleTabClick (index) {
    this.setState({ currentTab: index })
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.jobs' /></div>
          <div className={css.titleStats}>
            <div>
              <h2>2</h2>
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
            {this.state.tabs.map((tab, index) => (
              <Tab
                key={uniqid()}
                isActive={this.state.currentTab === index}
                onClick={this.handleTabClick}
                title={tab.title}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className={css.content}>
          {this.state.tabs[this.state.currentTab].content}
        </div>
      </div>
    )
  }
}

class Tab extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    title: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.index)
  }

  render () {
    return (
      <div
        className={[css.tab, this.props.isActive ? css.tabActive : null].join(' ')}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        tabIndex={0}
        role='button'
      >
        <Translate value={this.props.title} />
      </div>
    )
  }
}
