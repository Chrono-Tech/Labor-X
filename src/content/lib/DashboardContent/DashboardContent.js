import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Translate } from 'src/components/common'
import { MyFundsWidget, CompleteProfileWidget, CreateJobBoardWidget,
  MyJobBoardsWidget, HrReviewWidget, StartJobSearchWidget,
  ToDoWidget, OpportunitiesWidget, PostJobWidget,
  MyPostedJobsWidget, JobsProgressWidget, ValidationRequestsWidget, ReportsAndClaimsWidget } from 'src/partials'
import { SignerModel, UserModel } from 'src/models'
import { signerSelector, userSelector } from 'src/store'
import css from './DashboardContent.scss'

export class DashboardContent extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel),
    user: PropTypes.instanceOf(UserModel),
  }

  render () {
    const { signer, user } = this.props
    return signer == null ? null : (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.dashboard' /></div>
        </div>
        <div className={css.content}>
          <div className={css.block}>
            <div className={css.widgetRow}>
              <CompleteProfileWidget accountTypes={user.accountTypes} className={css.longWidget} />
              <MyFundsWidget />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Recruiters</h2>
            <div className={css.widgetRow}>
              <CreateJobBoardWidget />
              <MyJobBoardsWidget />
              <HrReviewWidget />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Workers</h2>
            <div className={css.widgetRow}>
              <StartJobSearchWidget />
              <ToDoWidget />
              <OpportunitiesWidget />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>For Clients</h2>
            <div className={css.widgetRow}>
              <PostJobWidget />
              <MyPostedJobsWidget />
              <JobsProgressWidget />
            </div>
          </div>
          <div className={css.block}>
            <h2 className={css.blockTitle}>Validation Service</h2>
            <div className={css.widgetRow}>
              <ValidationRequestsWidget />
              <ReportsAndClaimsWidget />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  return {
    signer,
    user: userSelector()(state),
  }
}

export default connect(mapStateToProps, null)(DashboardContent)
