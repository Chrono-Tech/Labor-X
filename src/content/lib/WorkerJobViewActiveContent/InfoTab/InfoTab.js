import React from 'react'
import css from './InfoTab.scss'

export default class InfoTab extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        <div className={css.header}>

          <div className={css.user}>
            <div className={css.avatar}>
              <div
                className={css.avatarImg}
                style={{ "background": `url(${'/static/temp/icon-profile.jpg'}) no-repeat center/cover` }}
              />
            </div>
            <div className={css.userText}>
              <span className={css.userName}>
                Get Started
              </span>
              (Client)
            </div>
          </div>

          <div className={css.user}>
            <div className={css.avatar}>
              <div
                className={css.avatarImg}
                style={{ "background": `url(${'/static/temp/icon-profile.jpg'}) no-repeat center/cover` }}
              />
            </div>
            <div className={css.userText}>
              <span className={css.userName}>
                James Harvey
              </span>
              (Worker)
            </div>
          </div>

          <div className={css.user}>
            <div className={css.avatar}>
              <div
                className={css.avatarImg}
                style={{ "background": `url(${'/static/temp/icon-profile.jpg'}) no-repeat center/cover` }}
              />
            </div>
            <div className={css.userText}>
              <span className={css.userName}>
                Anna German
              </span>
              (Recruiter)
            </div>
          </div>

        </div>


        <div className={css.content}>
          <div className={css.periodAndBudget}>
            <div className={css.periodAndBudgetItem}>
              <div className={css.label}>Starts at</div>
              <div className={css.value}>20 Dec, 2017</div>
            </div>
            <div className={css.periodAndBudgetItem}>
              <div className={css.label}>Deadline </div>
              <div className={css.value}>23 Dec, 2017 </div>
            </div>
            <div className={css.periodAndBudgetItem}>
              <div className={css.label}>Hours</div>
              <div className={css.value}>40</div>
            </div>
            <div className={css.periodAndBudgetItem}>
              <div className={css.label}>Est. Budget</div>
              <div className={css.value}>LHUS 80 ($3,200)</div>
            </div>
          </div>
          <div className={css.map}>
            <div className={css.mapItem}>
            </div>
          </div>
        </div>

        <div className={css.footer}>
          <div className={css.responsibilities}>
            <h4>RESPONSIBILITIES</h4>
            <ul>
              <li>Maintain appearance and conditions of lawn, plants, shrubs, trees and irrigation systems.</li>
              <li>Ability to perform duties and use equipment for snow removal.</li>
              <li>Ability to follow and complete work orders and preventative maintenance duties and provide   updates on the work order status.</li>
              <li>Ability to work efficiently, productively, and with minimal supervision.</li>
              <li>Follow safety precautions with appropriate PPE; providing an environment for personal and   public safety.</li>
              <li>Follow department policies.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
