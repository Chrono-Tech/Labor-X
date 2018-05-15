import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'

import { Translate, Input, Popover } from 'components/common'
import css from './JobBoardItem.scss'

export default class JobBoardItem extends React.Component {
  static STATUS = {
    DEFAULT: 'default',
    NEED_VERIFY: 'needVerify',
    JOINED: 'joined',
    APPROVAL: 'approval'
  }
  
  static propTypes = {
    status: PropTypes.oneOf([
      JobBoardItem.STATUS.DEFAULT,
      JobBoardItem.STATUS.NEED_VERIFY,
      JobBoardItem.STATUS.JOINED,
      JobBoardItem.STATUS.APPROVAL,
    ]),
  }
  
  static defaultProps = {
    status: JobBoardItem.STATUS.DEFAULT,
  }
  
  constructor(){
    super()
    
    this.state = {
      starsPopover: false,
      securityPopover: false,
      actionPopover: false,
    }
  }
  
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
  
  renderActionsTooltip({src, popoverContent, popoverClassName = ''}){
    const { actionPopover } = this.state
    
    return (
      <span className={css.actionButtonTooltip} onMouseOver={this.handleActionsPopoverOpen.bind(this)} onMouseOut={this.handleActionsPopoverClose.bind(this)} >
        <img src={src} alt='' width='24' height='24' />
        { popoverContent ? (
          <Popover
            open={actionPopover}
            arrowPosition={Popover.ARROW_POSITION.RIGHT}
            className={popoverClassName}
          >
            { popoverContent }
          </Popover>)
          : null }
      </span>
    )
  }
  
  renderDefaultActionButton(text, onClick){
    const { actionPopover } = this.state
    const handleClick = onClick ? onClick : () => {}
    const buttonText = text || 'Join the Board'
    
    const popoverContent = (
      <div>
        <div className={css.popoverHeader}>Join the Board</div>
        <div className={css.popoverDescription}>
          In order to apply for jobs or receive new jobs notifications click on&nbsp;
          <b>Join the Board</b> and wait for approval notification from the Board Moderators
        </div>
        <div className={css.popoverDescription}>
          <b>Job Post fee:</b> LHUS 3.00 ($90.00)
        </div>
        <div className={css.popoverDescription}>
          <b>Recruiting Services:</b> LHUS 10.00‒ 30.00 ($300.00 ‒ $900.00)
        </div>
      </div>
    )
    
    return (
      <button className={css.actionButton} onClick={handleClick}>
        { buttonText }
        { this.renderActionsTooltip({ src: '/static/images/svg/help-white-clear.svg', popoverContent, popoverClassName: css.actionPopover }) }
      </button>
    )
  }
  
  renderNeedVerifyButton(text, onClick){
    const { actionPopover } = this.state
    const handleClick = onClick ? onClick : () => {}
    const buttonText = text || 'Verify Me to Join'
    
    const popoverContent = (
      <div>
        <div className={css.popoverHeader}>Requirements are not met</div>
        <div className={css.popoverDescription}>
          Sorry, requirements to join the board are not met. Board owner requires the following to be completed:
        </div>
        <ul className={css.popoverVerifyList}>
          <li className={css.listItem}>Validate your email or phone</li>
          <li className={css.listItem}>Validate  your ID</li>
          <li className={css.listItem}>Validate your home address</li>
          <li className={css.listItem}>Validate your legal documents (Worker or Client)</li>
          <li className={css.listItem}>At least one skill should be endorsed by other people. new comers may get an endorsement by our validation team</li>
          <li className={css.listItem}>Your rating should be 3+</li>
        </ul>
      </div>
    )
    
    return (
      <button className={css.actionButton} onClick={handleClick}>
        { buttonText }
        { this.renderActionsTooltip({ src: '/static/images/svg/help-white-clear.svg', popoverContent, popoverClassName: css.actionPopover }) }
      </button>
    )
  }
  
  renderJoinedActions(){
    return (
      <div>
        <button className={css.actionButtonView}>
          View
        </button>
        <span className={css.actionButtonJoined}>
          Joined
        </span>
      </div>
    )
  }
  
  renderApprovalActions(){
    const { actionPopover } = this.state
  
    const popoverContent = (
      <div>
        <div className={css.popoverHeader}>Your Request is processing</div>
        <div className={css.popoverDescription}>
          You have requested to join the board. Moderators  of the board are reviewing your request and will back to you soon!
        </div>
      </div>
    )
  
    return (
      <div className={css.actionButtonApproval}>
        On Approval
        { this.renderActionsTooltip({ src: '/static/images/svg/help-clean.svg', popoverContent, popoverClassName: css.approvalPopover }) }
      </div>
    )
  }
  
  renderActions(){
    const { status } = this.props
    
    switch(status) {
      case JobBoardItem.STATUS.DEFAULT:
        return this.renderDefaultActionButton()
      
      case JobBoardItem.STATUS.NEED_VERIFY:
        return this.renderNeedVerifyButton()
      
      case JobBoardItem.STATUS.JOINED:
        return this.renderJoinedActions()
      
      case JobBoardItem.STATUS.APPROVAL:
        return this.renderApprovalActions()
      
      default:
        return this.renderDefaultActionButton()
    }
  }
  
  handleStarsPopoverOpen(e){
    this.setState({ starsPopover: true })
  }
  
  handleStarsPopoverClose(e){
    this.setState({ starsPopover: false })
  }
  
  handleSecurityPopoverOpen(e){
    this.setState({ securityPopover: true })
  }
  
  handleSecurityPopoverClose(){
    this.setState({ securityPopover: false })
  }
  
  handleActionsPopoverOpen(e){
    this.setState({ actionPopover: true })
  }
  
  handleActionsPopoverClose(){
    this.setState({ actionPopover: false })
  }
  
  getStarsPopover(){
    const { starsPopover } = this.state
    
    return (
      <Popover
        open={starsPopover}
        arrowPosition={Popover.ARROW_POSITION.LEFT}
        className={css.starsPopover}
      >
        <div className={css.popoverHeader}>Job Board Rating</div>
        <div className={css.popoverDescription}>Rating given by the board participants.</div>
        <table className={css.starsRatingTable}>
          <tbody>
          <tr>
            <td className={css.countStars}>5 stars</td>
            <td className={css.countStarsVotes}>220</td>
            <td className={css.countRating}><span className={css.countRatingTrack}/></td>
          </tr>
          <tr>
            <td className={css.countStars}>4 stars</td>
            <td className={css.countStarsVotes}>220</td>
            <td className={css.countRating}><span className={css.countRatingTrack}/></td>
          </tr>
          <tr>
            <td className={css.countStars}>3 stars</td>
            <td className={css.countStarsVotes}>220</td>
            <td className={css.countRating}><span className={css.countRatingTrack}/></td>
          </tr>
          <tr>
            <td className={css.countStars}>2 stars</td>
            <td className={css.countStarsVotes}>220</td>
            <td className={css.countRating}><span className={css.countRatingTrack}/></td>
          </tr>
          <tr>
            <td className={css.countStars}>1 stars</td>
            <td className={css.countStarsVotes}>220</td>
            <td className={css.countRating}><span className={css.countRatingTrack}/></td>
          </tr>
          <tr className={css.totalRow}>
            <td>Total</td>
            <td>860</td>
            <td>  </td>
          </tr>
          </tbody>
        </table>
      </Popover>
    )
  }
  
  getSecurityPopover(){
    const { securityPopover } = this.state
    
    return (
      <Popover
        open={securityPopover}
        arrowPosition={Popover.ARROW_POSITION.LEFT}
        className={css.securityPopover}
      >
        <div className={css.popoverHeader}>Validation</div>
        <div className={css.popoverDescription}>The Job Board Owner has successfully passed our Validation</div>
        <ul className={css.securityDoneList}>
          <li className={css.listItem}>Email is validated</li>
          <li className={css.listItem}>ID is validated</li>
          <li className={css.listItem}>Address is validated</li>
          <li className={css.listItem}>Certificates are validated</li>
        </ul>
      </Popover>
    )
  }
  
  render () {
    const { actionPopover, securityPopover, starsPopover } = this.state
    
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
            <div className={css.starsWrapper} onMouseOver={this.handleStarsPopoverOpen.bind(this)} onMouseOut={this.handleStarsPopoverClose.bind(this)}>
              { this.getRatingStars() }
              { this.getStarsPopover() }
            </div>
            
            <span className={css.securityBadge} onMouseOver={this.handleSecurityPopoverOpen.bind(this)} onMouseLeave={this.handleSecurityPopoverClose.bind(this)}>
              <img src='/static/images/svg/security.svg' alt='' width='24' height='24' />
              { this.getSecurityPopover() }
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
              { this.renderActions() }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

