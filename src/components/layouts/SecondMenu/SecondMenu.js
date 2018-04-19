import { Image, Link } from 'components/common'
import React from 'react'
import css from './SecondMenu.scss'

export default class SecondMenu extends React.Component {
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
          <div className={[ css.link, css.selected ].join(' ')}>Dashboard</div>
        </div>
        <div className={css.section}>
          <Link href='/my-profile' className={css.link} label='nav.validation' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.service' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.worker' />
          <Link href='/dashboard' className={css.subLink}>To-Do</Link>
          <Link href='/dashboard' className={css.subLink} label='nav.applicationsAndOffers' />
          <Link href='/dashboard' className={css.subLink} label='nav.Opportunities' />
          <Link href='/dashboard' className={css.subLink} label='nav.completedJobs' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.client' />
          <Link href='/dashboard' className={css.subLink} label='nav.activeJobs' />
          <Link href='/dashboard' className={css.subLink} label='nav.postedJobs' />
          <Link href='/dashboard' className={css.subLink} label='nav.jobsArchive' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.recruiter' />
          <Link href='/dashboard' className={css.subLink} label='nav.myJobsBoards' />
          <Link href='/dashboard' className={css.subLink} label='nav.jobs' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.tools' />
          <Link href='/dashboard' className={css.subLink} label='nav.schedule' />
          <Link href='/dashboard' className={css.subLink} label='nav.workerStats' />
          <Link href='/dashboard' className={css.subLink} label='nav.clientStats' />
          <Link href='/dashboard' className={css.subLink} label='nav.saved' />
          <Link href='/dashboard' className={css.subLink} label='nav.earnActivityPoints' />
        </div>
        <div className={css.section}>
          <Link href='/dashboard' className={css.link} label='nav.reportsAndClaims' />
        </div>
      </nav>
    )
  }
}
