import {Link, Carousel, Button, ParallaxBox} from 'components/common'
import {LoginOptions} from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import {bootstrap} from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './index.scss'

class Index extends React.Component {
  static getInitialProps({store}) {
    store.dispatch(bootstrap())
  }
  
  constructor() {
    super()
    
    this.state = {
      activeIndex: 0,
    }
  }
  
  updateBlocksVisibility(offset) {
    const {womanBlock, workersBlock, clientsBlock} = this.refs
    
  }
  
  componentDidMount() {
    window.addEventListener('scroll', () => {
      let offset = window.pageYOffset || document.documentElement.scrollTop;
      // console.log('offset', offset)
      // console.dir(this.refs.womanBlock)
      // console.log('offset', offset)
    })
  }
  
  goToNextSlide() {
    this.setState({activeIndex: this.state.activeIndex})
  }
  
  render() {
    return (
      <div className={css.root}>
        <div className={css.navWrapper}>
          <Button
            label='New account'
            onClick={() => {
            }}
            className={css.createButton}
          />
          <Button
            label='Login'
            onClick={() => {
            }}
            className={css.loginButton}
          />
        </div>
        <div className={css.sliderContainer}>
          <div className={css.logo}>
            <Link href='/'>
              <img src='/static/images/laborx-promo-head.jpg' className={css.logoImg}/>
            </Link>
          </div>
          <Carousel>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-01_together-tobetter-future.jpg'/>
            </a>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-02_work.jpg'/>
            </a>
            <a href='/'>
              <img src='/static/images/laborx-promo-slider-03_labor-hour.jpg'/>
            </a>
          </Carousel>
        </div>
        <div className={css.benefitsBlock}>
          <h1 className={css.benefitsHeader}>Our Network Benefits</h1>
          <p className={css.benefitsText}>
            We took the most secure technology
            <br/>
            and have built this global, autonomous and versatile platform.
            <br/>
            We aim to make short-term employment as accessible and rewarding<br/>as long-term employment.
          </p>
        </div>
        <div ref='womanBlock' className={css.advantageBlockWrapper}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-woman-watching-time-1.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsWoman,].join(' ')}>
              <div className={css.advantageCountsInner}>
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
            </div>
            <div className={[css.advantageContent, css.advantageContentWoman].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
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
                    Our smart automated technologies will save your time removing<br/>
                    big portion of paperwork and routines.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Trust
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Get access to our reliable database of Workers and Clients<br/>
                    verified by out professional team. LaborX is using an innovative<br/>
                    technology and guarantees reliable contacts reputation.
                  </div>
                
                </div>
              </div>
            </div>
          
          </ParallaxBox>
        </div>
        <div ref='workersBlock' className={css.advantageBlockWrapper}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-hero-2.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsWorkers].join(' ')}>
              <div className={css.advantageCountsInner}>
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
            </div>
            <div className={[css.advantageContent, css.advantageContentWorkers].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
                  Workers
                </div>
                <div className={css.advantageContentBlock}>
                  <div className={css.advantageContentBlockTitle}>
                    Payment
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our automated digital contracts guarantees real-time payment.<br/>
                    Your high skills, responsibility and rating can demand higher<br/>
                    hourly fee.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Inflation Resistance
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our LaborHour digital currency is linked to 1 hour average<br/>
                    learning in your location which keeps the currency stable.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Scheduling
                  </div>
                  <div className={css.advantageContentBlockText}>
                    LaborX is a fully automated solution with ability to track you<br/>
                    time, view reports and plan your schedule.
                  </div>
                
                </div>
              </div>
            </div>
          </ParallaxBox>
        
        </div>
        <div ref='clientsBlock' className={[css.advantageBlockWrapper, css.advantageBlockWrapperLast].join(' ')}>
          <ParallaxBox imgSrc='/static/images/laborx-promo-client-3.jpg' deflectionPercent={3}>
            <div className={[css.advantageCounts, css.advantageCountsClients].join(' ')}>
              <div className={css.advantageCountsInner}>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                    10,250 Workers
                  </div>
                  <div className={css.advantageCountBlockText}>
                    are already using LaborX
                  </div>
                </div>
                <div className={css.advantageCountBlock}>
                  <div className={css.advantageCountBlockHeader}>
                    1,450 Jobs
                  </div>
                  <div className={css.advantageCountBlockText}>
                    had been done in September 2018
                  </div>
                </div>
              </div>
            </div>
            
            <div className={[css.advantageContent, css.advantageContentClients].join(' ')}>
              <div className={css.advantageContentInner}>
                <div className={css.advantageTitle}>
                  <span className={css.advantageTitleFirstWord}>for</span>
                  Clients
                </div>
                <div className={css.advantageContentBlock}>
                  <div className={css.advantageContentBlockTitle}>
                    Spend Less
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our solution allows us to reduce recruitment fees compared with<br/>
                    traditional recruitment industry.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Get Your Job Done
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Public Worker Rating System is reliable and contains real people<br/>
                    profiles, histories and ratings which make your choice easier.
                  </div>
                  <div className={css.advantageContentBlockTitle}>
                    Access Immediate
                  </div>
                  <div className={css.advantageContentBlockText}>
                    Our solution is fast, reliable, secure, and permanently available.<br/>
                    The ability to pay with a variety of digital tokens makes the<br/>
                    system universal and not tied to any particular country or region.
                  </div>
                
                </div>
              </div>
            </div>
          </ParallaxBox>
        </div>
        <div className={css.footer}>
          <div className={css.footerLogo}>
            <a href='/'>
              <img src='/static/images/labor-x-logo.svg'/>
            </a>
          </div>
          <ul className={css.footerMenu}>
            <li><a href='/'>LaborX Whitepaper</a></li>
            <li><a href='/'>Chronobank Whitepaper</a></li>
            <li><a href='/'>Q&A</a></li>
            <li><a href='/'>Privacy Policy</a></li>
            <li><a href='/'>Terms of Use</a></li>
          </ul>
          <div className={css.footerCopyright}>© 2018 LaborX</div>
        </div>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
