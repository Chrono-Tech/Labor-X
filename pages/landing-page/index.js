import { Link, Carousel, Button } from 'components/common'
import { LoginOptions } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './index.scss'

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }
  
  constructor (){
    super()
    
    this.state = {
      activeIndex: 0,
    }
  }
  
  goToNextSlide (){
    this.setState({ activeIndex: this.state.activeIndex })
  }
  
  render () {
    return (
      <div className={css.root}>
        <div className={css.navWrapper}>
          <Button
            label='New account'
            onClick={() => {}}
            className={css.createButton}
          />
          <Button
            label='Login'
            onClick={() => {}}
            className={css.loginButton}
          />
        </div>
        <div className={css.sliderContainer}>
          <div className={css.logo}>
            <Link href='/'>
              <img src='/static/images/laborx-promo-head.jpg' className={css.logoImg} />
            </Link>
          </div>
          <Carousel>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-01_together-tobetter-future.jpg' />
            </a>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-02_work.jpg' />
            </a>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-03_labor-hour.jpg' />
            </a>
          </Carousel>
          <div className={css.benefitsBlockWrapper}>
            <div className={css.benefitsBlock}>
              <p className={css.benefitsHeader}>Our Network Benefits</p>
              <p className={css.benefitsText}>
                We took the most secure technology
                and have built this global, autonomous and versatile platform.
                <br/>
                We aim to make short-term employment as accessible and rewarding as long-term employment.
              </p>
            </div>
          </div>
          <div className={css.advantageBlockWrapper}>
            <img src='' />
            <div className={css.advantageCounts}>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  1,250 Recruiters
                </div>
                <div className={css.advantageCountBlockText}>
                  are already using LaborX
                </div>
              </div>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  USD 50,945
                </div>
                <div className={css.advantageCountBlockText}>
                  earned by Recruiters in September 2018
                </div>
              </div>
            </div>
            <div className={css.advantageContent}>
              <div className={css.advantageTitle}>
                <div className={css.advantageTitleILetter}>for</div>
                Recruiters
              </div>
              <div className={css.advantageContentBlock}>
                <div className={css.advantageContentBlockTitle}>
                  Earn
                </div>
                <div className={css.advantageContentBlockText}>
                  Create and manage your Job Boards and get paid for your work.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Save Time
                </div>
                <div className={css.advantageContentBlockText}>
                  Our smart automated technologies will save your time removing big portion of paperwork and routines.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Trust
                </div>
                <div className={css.advantageContentBlockText}>
                  Get access to our reliable database of Workers and Clients verified by out professional team. LaborX is using an innovative technology and guarantees reliable contacts reputation.
                </div>
                
              </div>
            </div>
          </div>
          <div className={css.advantageBlockWrapper}>
            <img src='' />
            <div className={css.advantageCounts}>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  USD 8,000
                </div>
                <div className={css.advantageCountBlockText}>
                  Earned by Workers in past 24h
                </div>
              </div>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  5,001 Clients
                </div>
                <div className={css.advantageCountBlockText}>
                  posted their jobs
                  
                </div>
              </div>
            </div>
            <div className={css.advantageContent}>
              <div className={css.advantageTitle}>
                <div className={css.advantageTitleILetter}>for</div>
                Workers
              </div>
              <div className={css.advantageContentBlock}>
                <div className={css.advantageContentBlockTitle}>
                  Payment
                </div>
                <div className={css.advantageContentBlockText}>
                  Our automated digital contracts guarantees real-time payment. Your high skills, responsibility and rating can demand higher hourly fee.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Inflation Resistance
                </div>
                <div className={css.advantageContentBlockText}>
                  Our LaborHour digital currency is linked to 1 hour average earning in your location which keeps the currency stable.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Scheduling
                </div>
                <div className={css.advantageContentBlockText}>
                  LaborX is a fully automated solution with ability to track you time, view reports and plan your schedule.
                </div>
      
              </div>
            </div>
          </div>
          <div className={css.advantageBlockWrapper}>
            <img src='' />
            <div className={css.advantageCounts}>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  1,250 Recruiters
                </div>
                <div className={css.advantageCountBlockText}>
                  are already using LaborX
                </div>
              </div>
              <div className={css.advantageCountBlock}>
                <div className={css.advantageCountBlockHeader}>
                  USD 50,945
                </div>
                <div className={css.advantageCountBlockText}>
                  earned by Recruiters in September 2018
                </div>
              </div>
            </div>
            <div className={css.advantageContent}>
              <div className={css.advantageTitle}>
                <div className={css.advantageTitleILetter}>for</div>
                Recruiters
              </div>
              <div className={css.advantageContentBlock}>
                <div className={css.advantageContentBlockTitle}>
                  Earn
                </div>
                <div className={css.advantageContentBlockText}>
                  Create and manage your Job Boards and get paid for your work.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Save Time
                </div>
                <div className={css.advantageContentBlockText}>
                  Our smart automated technologies will save your time removing big portion of paperwork and routines.
                </div>
                <div className={css.advantageContentBlockTitle}>
                  Trust
                </div>
                <div className={css.advantageContentBlockText}>
                  Get access to our reliable database of Workers and Clients verified by out professional team. LaborX is using an innovative technology and guarantees reliable contacts reputation.
                </div>
      
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
