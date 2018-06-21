import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Translate } from 'components/common'
import { jobsListSelector, boardByIdSelector } from 'src/store'
import { JobModel, BoardModel } from 'src/models'
import OffersTabContent from './OffersTabContent/OffersTabContent'
import ApplicationsTabContent from './ApplicationsTabContent/ApplicationsTabContent'
import css from './ApplicationsAndOffersContent.scss'

const style = {
  backgroundColor: 'transparent',
}

const inkBarStyle = {
  backgroundColor: '#fff',
  height: '5px',
}

class ApplicationsAndOffersContent extends React.Component {
  static propTypes = {
    applications: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    applicationsApproved: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    offers: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    })
  }

  render () {
    const { applications, applicationsApproved, offers } = this.props

    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.applicationsAndOffers' /></div>
          <div className={css.titleStats}>
            <div>
              <h2 className={css.titleStatsCounter}>{applications.length}</h2>
              <div>Applications</div>
            </div>
            <div>
              <h2 className={css.titleStatsCounter}>{offers.length}</h2>
              <div>Offers</div>
            </div>
          </div>
          <Tabs
            className={css.tabs}
            onChange={this.handleChange}
            value={this.state.slideIndex}
            tabItemContainerStyle={style}
            inkBarStyle={inkBarStyle}
          >
            <Tab className={css.tab} label='APPLICATIONS' value={0} />
            <Tab className={css.tab} label='OFFERS' value={1} />
          </Tabs>
        </div>
        <div className={css.content}>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <ApplicationsTabContent applicationsApproved={applicationsApproved} applications={applications} />
            <OffersTabContent offers={offers} />
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  // TODO @aevalyakin bind data
  const jobs = jobsListSelector()(state)
  const filteredJobs = jobs.filter(job => job.boardId > 0)
  if (filteredJobs && filteredJobs.length > 0) {
    const job = filteredJobs[0]
    return {
      // Applied by worker and approved by client
      applicationsApproved: [
        {
          job: jobs[0],
          board: boardByIdSelector(job.boardId)(state),
          notice: {
            label: 'UPDATED',
            description: 'Get Started has picked you to do this job! Please review contract and we will send notification about your decision to the client.',
            date: moment().subtract(2, 'hours').toDate(),
          },
        },
      ],
      // Applied by worker but not approved by client yet
      applications: [
        {
          job: jobs[0],
          board: boardByIdSelector(job.boardId)(state),
          notice: {
            label: 'ON REVIEW',
            description: 'Your application is under review. We will send you a notification once decision has been made.',
            date: new Date('12-12-2017'),
          },
        },
      ],
      // Offers from client
      offers: [
        {
          job: jobs[0],
          board: boardByIdSelector(job.boardId)(state),
          notice: {
            label: 'ENDS IN 1 DAY',
            description: 'Get Started has sent you an offer! Please review the offer and we will send notification about your decision to the client.',
            date: moment().subtract(2, 'hours').toDate(),
          },
        },
      ],
    }
  } else {
    return {
      applications: [],
      applicationsApproved: [],
      offers: [],
    }
  }
}

export default connect(mapStateToProps)(ApplicationsAndOffersContent)
