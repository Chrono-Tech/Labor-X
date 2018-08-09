import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Image, Link, Icon } from 'src/components/common'
import { userSelector } from 'src/store/user/selectors'
import { schemaFactory as accountTypesSchemaFactory } from 'src/models/app/UserAccountTypesModel'
import css from './SecondMenu.scss'

class SecondMenu extends React.Component {
  static propTypes = {
    accountTypes: PropTypes.shape(accountTypesSchemaFactory()),
  }

  render () {
    return (
      <nav className={css.root}>
        <div className={css.section}>
          <div className={css.icons}>
            <Link href='/my-wallet'>
              <Image
                className={css.iconsItem}
                icon={Image.ICONS.WALLET}
                color={Image.COLORS.BLACK}
                faded
              />
            </Link>
            <div className={cn(css.iconsItem, css.iconProfile)}>
              <Icon
                size={24}
                icon={Icon.ICONS.PROFILE}
                color={Icon.COLORS.BLACK}
                faded
              />
              <span className={css.completed}>75%</span>
            </div>
          </div>
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} activeClassName={css.selected} label='nav.dashboard' />
        </div>
        <div className={css.section}>
          <Link href='/my-profile' className={css.link} activeClassName={css.selected} label='nav.validation' />
        </div>
        <div className={css.section}>
          <Link href='/validation-requests' className={css.link} activeClassName={css.selected} label='nav.service' />
        </div>
        {
          this.props.accountTypes.worker ? (
            <div className={css.section} id='worker-menu'>
              <Link href='/to-do' className={css.link} label='nav.worker' />
              <Link href='/to-do' className={css.subLink} activeClassName={css.selected} label='nav.toDo' />
              <Link href='/applications-and-offers' className={css.subLink} activeClassName={css.selected} label='nav.applicationsAndOffers' />
              <Link href='/opportunities' className={css.subLink} activeClassName={css.selected} label='nav.Opportunities' />
              <Link href='/completed-jobs' className={css.subLink} activeClassName={css.selected} label='nav.completedJobs' />
            </div>
          ) : null
        }
        {
          this.props.accountTypes.client ? (
            <div className={css.section} id='client-menu'>
              <Link href='/active-jobs' className={css.link} label='nav.client' />
              <Link href='/active-jobs' className={css.subLink} activeClassName={css.selected} label='nav.activeJobs' />
              <Link href='/posted-jobs' className={css.subLink} activeClassName={css.selected} label='nav.postedJobs' />
              <Link href='/jobs-archive' className={css.subLink} activeClassName={css.selected} label='nav.jobsArchive' />
            </div>
          ) : null
        }
        {
          this.props.accountTypes.recruiter ? (
            <div className={css.section} id='recruiter-menu'>
              <Link href='/my-jobs-boards' className={css.link} label='nav.recruiter' />
              <Link href='/my-jobs-boards' className={css.subLink} activeClassName={css.selected} label='nav.myJobsBoards' />
              <Link href='/recruiter-jobs' className={css.subLink} activeClassName={css.selected} label='nav.jobs' />
            </div>
          ) : null
        }
        <div className={css.section}>
          <Link href='/schedule' className={css.link} label='nav.tools' />
          <Link href='/schedule' className={css.subLink} activeClassName={css.selected} label='nav.schedule' />
          <Link href='/worker-stats' className={css.subLink} activeClassName={css.selected} label='nav.workerStats' />
          <Link href='/client-stats' className={css.subLink} activeClassName={css.selected} label='nav.clientStats' />
          <Link href='/saved' className={css.subLink} activeClassName={css.selected} label='nav.saved' />
          <Link href='/earn-activity-points' className={css.subLink} activeClassName={css.selected} label='nav.earnActivityPoints' />
        </div>
        <div className={css.section}>
          <Link href='/reports-and-claims' className={css.link} activeClassName={css.selected} label='nav.reportsAndClaims' />
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  accountTypes: userSelector()(state).accountTypes,
})

export default connect(mapStateToProps)(SecondMenu)
