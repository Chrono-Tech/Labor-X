import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import ProfileModel from 'src/api/backend/model/ProfileModel'
import ProfileClientModel from 'src/api/backend/model/ProfileClientModel'
import ProfileWorkerModel from 'src/api/backend/model/ProfileWorkerModel'
import ProfileRecruiterModel from 'src/api/backend/model/ProfileRecruiterModel'

import { Widget, Translate, Icon } from 'src/components/common'
import { MyFundsWidget, ForWorkersWidget, ForClientsWidget, ForRecruitersWidget } from 'src/partials'
import { SignerModel, UserModel } from 'src/models'
import { signerSelector } from 'src/store'
import {
  getPageData,
  pageDataLoadingSelector,
  pageDataFailureSelector,
  pageDataSelector,
} from 'src/store/dashboard'
import { userSelector } from 'src/store/user/selectors'
import css from './DashboardContent.scss'

export class DashboardContent extends React.Component {
  static propTypes = {
    user: PropTypes.instanceOf(UserModel),
    signer: PropTypes.instanceOf(SignerModel),
    getPageData: PropTypes.func.isRequired,
    pageDataLoading: PropTypes.bool.isRequired,
    pageDataFailure: PropTypes.instanceOf(Error),
    pageData: PropTypes.shape({
      profile:  PropTypes.shape({
        profile: PropTypes.instanceOf(ProfileModel),
        client: PropTypes.instanceOf(ProfileClientModel),
        worker: PropTypes.instanceOf(ProfileWorkerModel),
        recruiter: PropTypes.instanceOf(ProfileRecruiterModel),
      }),
    }),
  }

  componentDidMount () {
    this.props.getPageData()
  }

  reloadPage = () => {
    document && document.location.reload(true)
  }

  renderRecruiterBlock = () => (
    <div className={css.block}>
      <h2 className={css.blockTitle}>For Recruiters</h2>
      <ForRecruitersWidget signer={this.props.signer} />
    </div>
  )

  renderWorkerBlock = () => (
    <div className={css.block}>
      <h2 className={css.blockTitle}>For Workers</h2>
      <ForWorkersWidget signer={this.props.signer} />
    </div>
  )

  renderClientBlock = () => (
    <div className={css.block}>
      <h2 className={css.blockTitle}>For Clients</h2>
      <ForClientsWidget signer={this.props.signer} />
    </div>
  )

  renderContent = () => {
    const { user, pageData } = this.props
    const { profile, worker, client, recruiter } = pageData.profile
    const { level1, level2, level3, level4 } = profile
    return (
      <div className={css.content}>
        <div className={css.block}>
          <MyFundsWidget />
        </div>
        <div className={css.block}>
          {this.renderCompletePercentBadge()}
          <Widget
            href='/my-profile'
            title='ui.dashboard.general.completeYourProfile'
            subtitle='ui.dashboard.general.general'
            actions={[
              {
                href: '/general-profile',
                label: 'nav.generalProfile',
                isLink: true,
                ...(([level1, level2, level3, level4].filter(level => level.submitted && level.submitted.validationComment != null).length > 0) && { secondIcon: Icon.SETS.MESSAGE_WARNING }),
              },

              ...(user.accountTypes.client ? [ {
                href: '/client-profile',
                label: 'nav.clientProfile',
                isLink: true,
                ...((client.submitted && client.submitted.validationComment != null) && { secondIcon: Icon.SETS.MESSAGE_WARNING }),
              } ] : []),
              ...(user.accountTypes.worker  ? [ {
                href: '/worker-profile',
                label: 'nav.workerProfile',
                isLink: true,
                ...((worker.submitted && worker.submitted.validationComment != null) && { secondIcon: Icon.SETS.MESSAGE_WARNING }),
              } ] : []),
              ...(user.accountTypes.recruiter ? [ {
                href: '/recruiter-profile',
                label: 'nav.recruiterProfile',
                isLink: true,
                ...((recruiter.submitted && recruiter.submitted.validationComment != null) && { secondIcon: Icon.SETS.MESSAGE_WARNING }),
              } ] : []),
            ]}
          >
            If you&apos;d like you may continue to use LaborX network anonymous.
            We care about our network integrity and asks our members to pass validation
            process done by our team to ensure every profile does meet our quality data
            standards. Verification will give you an access to Job Boards with higher
            skilled and trustworthy workers and clients. Complete the following tasks
            to gain higher validation level.
          </Widget>
        </div>

        {user.accountTypes.recruiter ? this.renderRecruiterBlock() : null}
        {user.accountTypes.worker ? this.renderWorkerBlock() : null}
        {user.accountTypes.client ? this.renderClientBlock() : null}

        <div className={css.block}>
          <h2 className={css.blockTitle}>Validation Service</h2>
          <div className={css.highlightsRow}>
            <Widget
              title='ui.dashboard.validationService.validationRequests'
              subtitle='ui.dashboard.validationService.validationService'
              actions={[
                {
                  label: 'New Requests',
                  counter: { value: 1 },
                  isLink: true,
                },
                {
                  label: 'In Progress',
                  counter: { value: 1 },
                  isLink: true,
                },
              ]}
            />
            <Widget
              title='ui.dashboard.validationService.reportsAndClaims'
              subtitle='ui.dashboard.validationService.validationService'
              actions={[
                {
                  label: 'New Reports',
                  counter: { value: 1 },
                  isLink: true,
                },
                {
                  label: 'New Refund Claims',
                  counter: { value: 1 },
                  isLink: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    )
  }

  renderCompletePercentBadge = () => {
    const { level1, level2, level3, level4 } = this.props.pageData.profile.profile
    const percent = [ level1, level2, level3, level4 ].filter(level => level.approved != null).length * 25
    return (
      <div className={cn(css.completeBadge, percent === 100 ? css.badgeGreen : css.badgeRed )}>
        <Icon
          size={22}
          icon={Icon.ICONS.PROFILE}
          color={Icon.COLORS.WHITE}
        />
        <span className={css.completePercent}>{percent}%</span>
      </div>
    )
  }

  renderError = () => (
    <div className={css.contentError}>
      <h3>Error loading data</h3>
      <Button className={css.buttonReload} onClick={this.reloadPage}>Reload page</Button>
    </div>
  )

  render () {
    const { signer, pageDataFailure, pageDataLoading } = this.props
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleText}><Translate value='nav.dashboard' /></div>
        </div>
        {
          signer == null || pageDataLoading
            ? <div className={css.contentLoading}><CircularProgress style={{ color: '#00A0D2' }} size={40} /></div>
            : pageDataFailure
              ? this.renderError()
              : this.renderContent()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signer: signerSelector()(state),
  user: userSelector()(state),

  pageDataLoading: pageDataLoadingSelector(state),
  pageDataFailure: pageDataFailureSelector(state),
  pageData: pageDataSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getPageData: () => dispatch(getPageData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent)
