import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import { Image, Button, Icon, Rating, SecurityShield, Tip } from 'components/common'
import css from './WorkerResumeContent.scss'


export default class WorkerResumeContent extends React.Component {
  static propTypes = {
  }

  renderStatusPopoverContent(){

    return (
      <div className={css.statusPopover}>
        <div className={css.popoverHeader}>Availability</div>
        <div className={css.popoverDescription}>
          James Harvey is available to do job on:
        </div>
        <div className={css.daysBlock}>
          <span className={css.inactiveDay}>Sun</span>
          <span>Mo</span>
          <span className={css.inactiveDay}>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
      </div>
    )
  }

  renderSecurityDoneList(){
    return (
      <ul className={css.securityDoneList}>
        <li className={css.listItem}>Email is validated</li>
        <li className={css.listItem}>ID is validated</li>
        <li className={css.listItem}>Address is validated</li>
        <li className={css.listItem}>Certificates are validated</li>
      </ul>
    )
  }

  render () {
    const jobsDone = 100, experience = 10, lhus = '20–27', name = 'Gogi',
      subtitle = 'Worker Profile', logo = '/static/images/worker-crop.jpg', status = 'Available'

    return (
      <div className={css.main}>

        <div className={css.header}>

          <div className={css.headerBlock}>

            <div className={css.titleBlock}>
              <div className={css.titleBar}>
                <Button
                  className={css.cancelButton}
                  icon={Image.SETS.ARROW_BACK}
                  type={Button.TYPES.SUBMIT}
                  mods={Button.MODS.FLAT}
                  label='Back'
                />
              </div>
            </div>

            <div className={css.workerBlock}>
              <div className={css.workerBlockInner}>
                <div className={css.logoBlock}>
                  <img src={logo} alt='' />
                </div>

                <div className={css.workerContentBlock}>
                  <div className={css.titleBlock}>
                    <div className={css.title}>
                      { name }
                    </div>

                    <div className={css.subtitle}>
                      { subtitle }
                    </div>

                  </div>

                  <div className={css.ratingBlock}>
                    <div className={css.starsWrapper}>
                      <Rating
                        rating={3}
                        tip={{
                          title: 'Rating',
                          description: 'Rating given by Clients and high skilled workers.'
                        }}
                      />
                    </div>

                    <div className={css.securityBadge}>
                      <SecurityShield
                        tip={{
                          title: 'Validation',
                          description: 'James Harvey had successfully passed our Validation Process.',
                          doneList: this.renderSecurityDoneList()
                        }}
                        level={4} />
                    </div>

                    <div className={css.workerBadge}>
                      <Tip
                        tipContent={this.renderStatusPopoverContent()}
                        position={Tip.POSITION.LEFT}
                      >
                        <div className={css.workerStatus}>
                          { status }
                        </div>
                      </Tip>
                    </div>
                  </div>

                  <div className={css.aboutJob}>
                    <div className={css.jobInfo}>

                      <div className={css.jobInfoBlock}>
                        <div className={css.jobInfoCount}>{jobsDone}</div>
                        <div className={css.jobInfoDescribe}>{pluralize('Job', jobsDone)} done</div>
                      </div>

                      <div className={css.jobInfoBlock}>
                        <div className={css.jobInfoCount}>{ experience }</div>
                        <div className={css.jobInfoDescribe}>{pluralize('Year', experience)} exp.</div>
                      </div>

                      <div className={css.jobInfoBlock}>
                        <div className={css.jobInfoCount}>{ lhus }</div>
                        <div className={css.jobInfoDescribe}>Lhus per hour</div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

              <div className={css.headerMenu}>
                <button className={[css.headerLink, css.linkActive].join(' ')}>Resume</button>
                <button className={css.headerLink}>Feedback</button>
                <button className={css.messageLink}>
                  <Icon className={css.messageIcon} size={28} icon={Icon.ICONS.MESSAGE} />
                </button>
              </div>

            </div>



          </div>

        </div>

        <div className={css.contentWrapper}>

        </div>
      </div>

    )
  }
}
