import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Translate } from 'components/common'
import { jobsListSelector, boardByIdSelector } from 'src/store'
import { JobModel, BoardModel } from 'src/models'
import TabContent from './TabContent/TabContent'
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
      job: PropTypes.instanceOf(JobModel).isRequired,
      board: PropTypes.instanceOf(BoardModel).isRequired,
    })),
    offers: PropTypes.arrayOf(PropTypes.shape({
      job: PropTypes.instanceOf(JobModel).isRequired,
      board: PropTypes.instanceOf(BoardModel).isRequired,
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
    const { applications, offers } = this.props

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
            <TabContent cards={applications} />
            <TabContent cards={offers} />
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  // TODO @aevalyakin get only offers for this worker
  const jobs = jobsListSelector()(state) || []
  const cards = jobs.map(job => ({
    job,
    board: boardByIdSelector(job.boardId)(state),
  }))
  return {
    applications: cards,
    offers: cards,
  }
}

export default connect(mapStateToProps)(ApplicationsAndOffersContent)
