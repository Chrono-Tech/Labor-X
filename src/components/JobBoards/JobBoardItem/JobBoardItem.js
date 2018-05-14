import {reduxForm, Field} from 'redux-form'

import React from 'react'

import { Translate, Input } from 'components/common'
import css from './JobBoardItem.scss'


export default class JobBoardItem extends React.Component {
  getRatingStars() {
    let starsArray = []
    let count = 5
    
    for (let i = 0; i < count; i++){
      starsArray.push(
        <span key={i} className={css.star}>
          <img src='/static/images/svg/star-active.svg' alt='' width='20' />
        </span>
      )
    }
    
    return starsArray
  }
  
  render () {
    return (
      <div className={css.main}>
        <div className={css.logoBlock}>
          <button className={css.logoLink}>
            <img src='/static/images/become-full.jpg' alt='' />
          </button>
        </div>
        <div className={css.contentBlock}>
          <div className={css.titleBlock}>
            <div>
              <button className={css.title} onClick={() => {}}>
                Become Involved
              </button>
            </div>
            
            <div className={css.categoryWrapper}>
              <button className={css.category} onClick={() => {}}>
                Building, Industrial
              </button>
            </div>
            
          </div>
          
          <div className={css.ratingBlock}>
            <span className={css.starsWrapper}>
              { this.getRatingStars() }
            </span>
            
            <span className={css.securityBadge}>
              <img src='/static/images/svg/secure-none.svg' alt='' width='24' height='24' />
            </span>
          </div>
          
          <div className={css.aboutJob}>
            <div className={css.jobInfo}>
              
              <div className={css.jobInfoBlock}>
                <div className={css.jobInfoCount}>245</div>
                <div className={css.jobInfoDescribe}>Jobs</div>
              </div>
              
              <div className={css.jobInfoBlock}>
                <div className={css.jobInfoCount}>150</div>
                <div className={css.jobInfoDescribe}>Clients</div>
              </div>
              
            </div>
            
            <div className={css.actionsWrapper}>
              <button className={css.actionButton} onClick={() => {}}>
                Join the Board
                <span className={css.actionButtonTooltip}>
                  <img src='/static/images/svg/help-white-clear.svg' alt='' width='24' height='24' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

