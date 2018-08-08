import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import cn from 'classnames'
import { connect } from 'react-redux'
import { Image, Link, Icon } from 'src/components/common'
import { userSelector } from 'src/store/user/selectors'
import PersonModel from 'src/api/backend/model/PersonModel'
import { personProfile, personProfileLoadingStateSelector, personProfileSelector } from 'src/store/secondMenu'
import { schemaFactory as accountTypesSchemaFactory } from 'src/models/app/UserAccountTypesModel'
import css from './SecondMenu.scss'

class SecondMenu extends React.Component {
  static propTypes = {
    accountTypes: PropTypes.shape(accountTypesSchemaFactory()),
    personProfile: PropTypes.instanceOf(PersonModel),
    loadPersonProfile: PropTypes.func,
  }

  componentDidMount () {
    this.props.loadPersonProfile()
  }

  getFillPercentageProfile (personProfile) {
    const validationLevel = get(personProfile, 'validationLevel')
    if (validationLevel === 4) return "100%"
    if (validationLevel === 3) return "75%"
    if (validationLevel === 2) return "50%"
    if (validationLevel === 1) return "25%"
    return "0%"
  }

  render () {
    const { personProfile } = this.props
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
            <Link className={css.completedProfileLink} href='/general-profile'>
              <div className={cn(css.iconsItem, css.iconProfile)}>
                <Icon
                  size={24}
                  icon={Icon.ICONS.PROFILE}
                  color={Icon.COLORS.BLACK}
                  faded
                />
                <span className={css.completed}>{this.getFillPercentageProfile(personProfile)}</span>
              </div>
            </Link>
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
            <div className={css.section}>
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
            <div className={css.section}>
              <Link href='/active-jobs' className={css.link} label='nav.client' />
              <Link href='/active-jobs' className={css.subLink} activeClassName={css.selected} label='nav.activeJobs' />
              <Link href='/posted-jobs' className={css.subLink} activeClassName={css.selected} label='nav.postedJobs' />
              <Link href='/jobs-archive' className={css.subLink} activeClassName={css.selected} label='nav.jobsArchive' />
            </div>
          ) : null
        }
        {
          this.props.accountTypes.recruiter ? (
            <div className={css.section}>
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
  personProfileLoadingState: personProfileLoadingStateSelector(state),
  personProfile: personProfileSelector(state),
})

function mapDispatchToProps (dispatch) {
  return {
    loadPersonProfile: () => dispatch(personProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondMenu)
