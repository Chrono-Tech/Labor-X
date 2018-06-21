import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Translate } from 'components/common'
import { offersListSelector, boardByIdSelector, jobByIdSelector } from 'src/store'
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
  };

  render () {
    const { applications, applicationsApproved, offers } = this.props

    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.applicationsAndOffers' /></div>
          <div className={css.titleStats}>
            <div>
              <h2 className={css.titleStatsCounter}>{applicationsApproved.length}</h2>
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

  const myOffers = offersListSelector()(state)

  const applicationsApproved = myOffers.map((offer) => {
    const job = jobByIdSelector(offer.jobId)(state)
    return {
      job,
      board: boardByIdSelector(job.boardId)(state),
      notice: {
        label: 'ON REVIEW',
        description: 'Your application is under review. We will send you a notification once decision has been made.',
        date: new Date('12-12-2017'),
      },
    }
  })
  
  return {
    applications:[],
    applicationsApproved,
    offers: [],
  }
}

export default connect(mapStateToProps)(ApplicationsAndOffersContent)
