import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'

import { Translate, Input } from 'components/common'
import css from './JobBoardItem.scss'

class Popover extends React.Component {
  static ARROW_POSITION = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
  }
  
  static propTypes = {
    arrowPosition: PropTypes.oneOf([
      Popover.ARROW_POSITION.LEFT,
      Popover.ARROW_POSITION.CENTER,
      Popover.ARROW_POSITION.RIGHT,
    ]),
    open: PropTypes.bool,
    className: PropTypes.string,
  }
  
  static defaultProps = {
    arrowPosition: Popover.ARROW_POSITION.LEFT,
    open: false,
    className: '',
  }
  
  render(){
    const { children, arrowPosition, open, className, ...props } = this.props
    
    let arrowPositionStyle
    
    switch (arrowPosition) {
      case Popover.ARROW_POSITION.LEFT:
        arrowPositionStyle = css.arrowLeft
        break
      
      case Popover.ARROW_POSITION.CENTER:
        arrowPositionStyle = css.arrowCenter
        break
      
      case Popover.ARROW_POSITION.RIGHT:
        arrowPositionStyle = css.arrowRight
        break
      
      default:
        arrowPositionStyle = css.arrowLeft
    }
    
    let styles = [css.popover, open ? css.popoverVisible : '', arrowPositionStyle, className]
    
    
    return(
      <div className={styles.join(' ')} {...props}>
        { children }
      </div>
    )
  }
}

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
      starsPopover: null,
      securityPopover: null,
      actionPopover: null,
      popperOpen: false,
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
  
  renderActionsTooltip({src, popoverContent}){
    const { actionPopover } = this.state
    
    return (
      <span className={css.actionButtonTooltip} onMouseOver={this.handleActionsPopoverOpen.bind(this)} onMouseOut={this.handleActionsPopoverClose.bind(this)} >
        <img src={src} alt='' width='24' height='24' />
        { popoverContent ? (
          <Popover
            open={actionPopover}
            arrowPosition={Popover.ARROW_POSITION.RIGHT}
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
      <div className={css.actionPopover}>
        <div className={css.popoverHeader}>Join the Board</div>
        <div className={css.popoverDescription}>
          In order to apply for jobs or receive new jobs notifications click on
          <b>Join the Board</b> and wait for approval notification from the Board Moderators
        </div>
      </div>
    )
    
    return (
      <button className={css.actionButton} onClick={handleClick}>
        { buttonText }
        { this.renderActionsTooltip({ src: '/static/images/svg/help-white-clear.svg', popoverContent }) }
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
    
    const popover = (<Popover open={actionPopover} onClose={this.handleActionsPopoverClose.bind(this)} >
      <div>asdf</div>
    </Popover>)
  
    return (
      <div className={css.actionButtonApproval}>
        On Approval
        { this.renderActionsTooltip({ src: '/static/images/svg/help-clean.svg', popover: popover }) }
      </div>
    )
  }
  
  renderActions(){
    const { status } = this.props
    
    switch(status) {
      case JobBoardItem.STATUS.DEFAULT:
        return this.renderDefaultActionButton()
      
      case JobBoardItem.STATUS.NEED_VERIFY:
        return this.renderDefaultActionButton()
      
      case JobBoardItem.STATUS.JOINED:
        return this.renderJoinedActions()
      
      case JobBoardItem.STATUS.APPROVAL:
        return this.renderApprovalActions()
      
      default:
        return this.renderDefaultActionButton()
    }
  }
  
  handleStarsPopoverOpen(e){
    e.preventDefault();
    e.stopPropagation();
    console.log('open')
    this.setState({ starsPopover: true })
  }
  
  handleStarsPopoverClose(e){
    e.preventDefault();
    e.stopPropagation();
    console.log('close')
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
  
  render () {
    const { actionPopover, securityPopover, starsPopover, popperOpen } = this.state
    
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
              <Popover
                open={starsPopover}
                arrowPosition={Popover.ARROW_POSITION.LEFT}
              >
                <div className={css.starsPopover}>
                  <div className={css.popoverHeader}>Job Board Rating</div>
                  <div className={css.popoverDescription}>Rating given by the board participants.</div>
                  <table className={css.starsRatingTable}>
                    <tbody>
                      <tr>
                        <td className={css.countStars}>5 stars</td>
                        <td className={css.countStarsVotes}>220</td>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td className={css.countStars}>4 stars</td>
                        <td className={css.countStarsVotes}>220</td>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td className={css.countStars}>3 stars</td>
                        <td className={css.countStarsVotes}>220</td>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td className={css.countStars}>2 stars</td>
                        <td className={css.countStarsVotes}>220</td>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td className={css.countStars}>1</td>
                        <td className={css.countStarsVotes}>220</td>
                        <td>  </td>
                      </tr>
                      <tr>
                        <td className={css.countStars}>Total</td>
                        <td className={css.countStarsVotes}>860</td>
                        <td>  </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Popover>
            </div>
            
            <span className={css.securityBadge} onMouseOver={this.handleSecurityPopoverOpen.bind(this)} onMouseLeave={this.handleSecurityPopoverClose.bind(this)}>
              <img src='/static/images/svg/security.svg' alt='' width='24' height='24' />

              <Popover
                open={securityPopover}
                arrowPosition={Popover.ARROW_POSITION.LEFT}
              >
                <div className={css.securityPopover}>
                  <div className={css.popoverHeader}>Validation</div>
                  <div className={css.popoverDescription}>The Job Board Owner has successfully passed our Validation</div>
                </div>
              </Popover>
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

