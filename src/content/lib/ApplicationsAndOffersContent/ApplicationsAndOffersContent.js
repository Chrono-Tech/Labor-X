import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Translate } from 'components/common'
import { getCards, getCardsApproved, getApplicationsCount } from 'src/store/applicationsAndOffers/selectors'
import { JobModel, BoardModel } from 'src/models'
import PersonModel from 'src/api/backend/model/PersonModel'
import OffersTabContent from './OffersTabContent/OffersTabContent'
import ApplicationsTabContent from './ApplicationsTabContent/ApplicationsTabContent'
import css from './ApplicationsAndOffersContent.scss'
// import {reloadJobsOffers} from "../../../store";

class ApplicationsAndOffersContent extends React.Component {
  static propTypes = {
    applicationsCount: PropTypes.number,
    applications: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      client: PropTypes.instanceOf(PersonModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    applicationsApproved: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      client: PropTypes.instanceOf(PersonModel),
      notice: PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.instanceOf(Date),
      }),
    })),
    offers: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel),
      board: PropTypes.instanceOf(BoardModel),
      client: PropTypes.instanceOf(PersonModel),
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

  componentDidMount () {
    // this.props.getOffers()
  }

  handleChangeIndex = (index) => this.setState({ slideIndex: index })

  handleTabChange = (e, index) => this.setState({ slideIndex: index })

  render () {
    const { applications, applicationsApproved, applicationsCount, offers } = this.props
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.applicationsAndOffers' /></div>
          <div className={css.titleStats}>
            <div>
              <h2 className={css.titleStatsCounter}>{applicationsCount}</h2>
              <div>Applications</div>
            </div>
            <div>
              <h2 className={css.titleStatsCounter}>{offers.length}</h2>
              <div>Offers</div>
            </div>
          </div>
          <Tabs
            onChange={this.handleTabChange}
            value={this.state.slideIndex}
          >
            <Tab label='APPLICATIONS' value={0} />
            <Tab label='OFFERS' value={1} />
          </Tabs>
        </div>
        <div className={css.content}>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            <ApplicationsTabContent applications={applications} applicationsApproved={applicationsApproved} />
            <OffersTabContent offers={offers} />
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    applications: getCards(state),
    applicationsApproved: getCardsApproved(state),
    applicationsCount: getApplicationsCount(state),
    offers: [],
  }
}

// const mapDispatchToProps = dispatch => ({
//   // getOffers: () => dispatch(reloadJobsOffers(45)),
// })

export default connect(mapStateToProps)(ApplicationsAndOffersContent)
