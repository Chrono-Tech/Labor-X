import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'

import { Image, Button, Icon, Rating } from 'components/common'
import css from './WorkerProfileContent.scss'


export default class WorkerProfileContent extends React.Component {
  static propTypes = {
  }

  renderSecurityTooltip () {
    const level = 4
    const securityIcon = level ? Icon.SETS.SECURITY : Icon.SETS.SECURITY_NONE
    
    return (
      <div className={css.securityRatingWrapper}>
        <Icon className={css.securityRatingShield} size={31} {...securityIcon} />
        { level ? (<span className={css.securityRating}>{level}</span>) : null }
      </div>
    )
  }
  
  render () {
    const jobsDone = 100, experience = 10, lhus = '20-27', name = 'Gogi',
      subtitle = 'Worker Profile', logo = '/static/images/worker-crop.jpg'
    
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
              <div className={css.logoBlock}>
                <img src={logo} alt='' />
              </div>
  
              <div className={css.contentBlock}>
                <div className={css.titleBlock}>
                  <div>
                    <button className={css.title}>
                      { name }
                    </button>
                  </div>
    
                  <div className={css.subtitle}>
                    { subtitle }
                  </div>
  
                </div>
  
                <div className={css.ratingBlock}>
                  <div className={css.starsWrapper}>
                    <Rating
                      rating={3}
                      title='Job Board Rating'
                      description='Rating given by the board participants.'
                    />
                  </div>
    
                  <div
                    className={css.securityBadge}
                  >
                    { this.renderSecurityTooltip() }
                  </div>
                </div>
  
                <div className={css.aboutJob}>
                  <div className={css.jobInfo}>
      
                    <div className={css.jobInfoBlock}>
                      <div className={css.jobInfoCount}>{jobsDone}</div>
                      <div className={css.jobInfoDescribe}>{pluralize('Jobs done', jobsDone)}</div>
                    </div>
      
                    <div className={css.jobInfoBlock}>
                      <div className={css.jobInfoCount}>{ experience }</div>
                      <div className={css.jobInfoDescribe}>{pluralize('Years exp.', experience)}</div>
                    </div>
    
                    <div className={css.jobInfoBlock}>
                      <div className={css.jobInfoCount}>{ lhus }</div>
                      <div className={css.jobInfoDescribe}>Lhus per hour</div>
                    </div>
    
                  </div>
                  
                </div>
                

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
