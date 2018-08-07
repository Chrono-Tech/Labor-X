// @flow
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { groupBy } from 'lodash'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { cancelJob, modalsPush } from 'src/store'
import { PayInvoiceDialog } from 'src/partials'
import { Translate } from 'src/components/common'
import { getToPayCards, getOtherCards } from "src/store/activeJobs"
import ActiveTabContent from "./ActiveTabContent/ActiveTabContent"
import DeclineTabContent from "./DeclineTabContent/DeclineTabContent"
import css from './ActiveJobsContent.scss'

const TabContainer = (props) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

class ActiveJobsContent extends React.Component {
  static propTypes = {
    pushModal: PropTypes.func.isRequired,
    cancelJob: PropTypes.func.isRequired,
    toPayCards: PropTypes.arrayOf(PropTypes.shape({})),
    otherCardsGroupedByCreatedAt: PropTypes.shape({}),
  }

  state = {
    value: 0,
  };

  handleOnClickReview = (job, worker) => {
    const { cancelJob } = this.props
    const modal = {
      component: PayInvoiceDialog,
      props: { job, worker, cancelJob },
    }
    this.props.pushModal(modal)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  };

  render () {
    const { value } = this.state
    const { toPayCards, otherCardsGroupedByCreatedAt } = this.props
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.activeJobs' /></div>
          <AppBar position='static' className={css.appBar}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label='ACTIVE' />
              <Tab label='DECLINED' />
            </Tabs>
          </AppBar>
        </div>

        <div className={css.content}>
          { value === 0 && (
            <ActiveTabContent
              toPayCards={toPayCards}
              otherCardsGroupedByCreatedAt={otherCardsGroupedByCreatedAt}
              onHandleOnClickReview={this.handleOnClickReview}
            />
          )
          }
          { value === 1 && <DeclineTabContent /> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  toPayCards: getToPayCards(state),
  otherCardsGroupedByCreatedAt: groupBy(getOtherCards(state), (card) => moment(card.job.extra.createdAt).format('YYYY-MM-DD')),
})

const mapDispatchToProps = (dispatch) => ({
  pushModal: (modal) => dispatch(modalsPush(modal)),
  cancelJob: (jobId: Number) => dispatch(cancelJob(jobId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobsContent)
