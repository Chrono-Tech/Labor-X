import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, Link } from 'components/common'
import React from 'react'
import css from './SecondMenu.scss'
import {userSelector} from "../../../store/user/selectors";

class SecondMenu extends React.Component {
  static propTypes = {
    accountTypes: PropTypes.shape({
      worker: PropTypes.bool,
      client: PropTypes.bool,
      recruiter: PropTypes.bool,
    }),
  }

  render () {
    return (
      <nav className={css.root}>
        <div className={css.section}>
          <div className={css.icons}>
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.WALLET}
              color={Image.COLORS.BLACK}
              faded
            />
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.SETTINGS}
              color={Image.COLORS.BLACK}
              faded
            />
            <Image
              className={css.iconsItem}
              icon={Image.ICONS.ACCOUNT}
              color={Image.COLORS.RED}
              faded
            />
            <span className={css.completed}>20%</span>
          </div>
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={[ css.link, css.selected ].join(' ')} label='nav.dashboard' />
        </div>
        <div className={css.section}>
          <Link href='/my-profile' className={css.link} label='nav.validation' />
        </div>
        <div className={css.section}>
          <Link href='/validation-requests' className={css.link} label='nav.service' />
        </div>
        {
          this.props.accountTypes.worker ? (
            <div className={css.section}>
              <Link href='/to-do' className={css.link} label='nav.worker' />
              <Link href='/to-do' className={css.subLink} label='nav.toDo' />
              <Link href='/applications-and-offers' className={css.subLink} label='nav.applicationsAndOffers' />
              <Link href='/opportunities' className={css.subLink} label='nav.Opportunities' />
              <Link href='/completed-jobs' className={css.subLink} label='nav.completedJobs' />
            </div>
          ) : null
        }
        {
          this.props.accountTypes.client ? (
            <div className={css.section}>
              <Link href='/active-jobs' className={css.link} label='nav.client' />
              <Link href='/active-jobs' className={css.subLink} label='nav.activeJobs' />
              <Link href='/posted-jobs' className={css.subLink} label='nav.postedJobs' />
              <Link href='/jobs-archive' className={css.subLink} label='nav.jobsArchive' />
            </div>
          ) : null
        }
        {
          this.props.accountTypes.recruiter ? (
            <div className={css.section}>
              <Link href='/my-jobs-boards' className={css.link} label='nav.recruiter' />
              <Link href='/my-jobs-boards' className={css.subLink} label='nav.myJobsBoards' />
              <Link href='/recruiter-jobs' className={css.subLink} label='nav.jobs' />
            </div>
          ) : null
        }
        <div className={css.section}>
          <Link href='/schedule' className={css.link} label='nav.tools' />
          <Link href='/schedule' className={css.subLink} label='nav.schedule' />
          <Link href='/worker-stats' className={css.subLink} label='nav.workerStats' />
          <Link href='/client-stats' className={css.subLink} label='nav.clientStats' />
          <Link href='/saved' className={css.subLink} label='nav.saved' />
          <Link href='/earn-activity-points' className={css.subLink} label='nav.earnActivityPoints' />
        </div>
        <div className={css.section}>
          <Link href='/reports-and-claims' className={css.link} label='nav.reportsAndClaims' />
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  accountTypes: userSelector()(state).accountTypes,
})

export default connect(mapStateToProps)(SecondMenu)
