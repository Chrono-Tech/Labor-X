import React from 'react'
import PropTypes from 'prop-types'

import { Popover, Icon } from 'components/common'
import { BoardModel } from 'src/models'
import css from './JobBoardItem.scss'

export default class JobBoardItem extends React.Component {
  static propTypes = {
    jobBoard: PropTypes.instanceOf(BoardModel),
  }

  static defaultProps = {
    jobBoard: new BoardModel(),
  }

  constructor () {
    super()

    this.state = {
      starsPopover: false,
      securityPopover: false,
      actionPopover: false,
    }
  }

  getRatingStars () {
    const { jobBoard } = this.props

    let starsArray = []
    let count = jobBoard.rating

    for (let i = 0; i < count; i++) {
      starsArray.push(
        <span key={i} className={css.star}>
          <img src='/static/images/svg/star-active.svg' alt='' width='20' />
        </span>
      )
    }

    return starsArray
  }

  handleStarsPopoverOpen () {
    this.setState({ starsPopover: true })
  }

  handleStarsPopoverClose () {
    this.setState({ starsPopover: false })
  }

  handleSecurityPopoverOpen () {
    this.setState({ securityPopover: true })
  }

  handleSecurityPopoverClose () {
    this.setState({ securityPopover: false })
  }

  handleActionsPopoverOpen () {
    this.setState({ actionPopover: true })
  }

  handleActionsPopoverClose () {
    this.setState({ actionPopover: false })
  }

  renderDefaultActionButton (text, onClick) {
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
        {buttonText}
        {this.renderActionsTooltip({
          src: '/static/images/svg/help-white-clear.svg',
          popoverContent,
          popoverClassName: css.actionPopover,
        })}
      </button>
    )
  }

  renderNeedVerifyButton (text, onClick) {
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
          <li className={css.listItem}>Validate your ID</li>
          <li className={css.listItem}>Validate your home address</li>
          <li className={css.listItem}>Validate your legal documents (Worker or Client)</li>
          <li className={css.listItem}>At least one skill should be endorsed by other people. new comers may get an
            endorsement by our validation team
          </li>
          <li className={css.listItem}>Your rating should be 3+</li>
        </ul>
      </div>
    )

    return (
      <button className={css.actionButton} onClick={handleClick}>
        {buttonText}
        {this.renderActionsTooltip({
          src: '/static/images/svg/help-white-clear.svg',
          popoverContent,
          popoverClassName: css.actionPopover,
        })}
      </button>
    )
  }

  renderJoinedActions () {
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

  renderApprovalActions () {
    const popoverContent = (
      <div>
        <div className={css.popoverHeader}>Your Request is processing</div>
        <div className={css.popoverDescription}>
          You have requested to join the board. Moderators of the board are reviewing your request and will back to
          you soon!
        </div>
      </div>
    )

    return (
      <div className={css.actionButtonApproval}>
        On Approval
        {this.renderActionsTooltip({
          src: '/static/images/svg/help-clean.svg',
          popoverContent,
          popoverClassName: css.approvalPopover,
        })}
      </div>
    )
  }

  renderActions () {
    const { jobBoard } = this.props

    switch (jobBoard.status) {
      case BoardModel.STATUS.UNASSIGNED:
        return this.renderDefaultActionButton()

      case BoardModel.STATUS.NEED_VERIFY:
        return this.renderNeedVerifyButton()

      case BoardModel.STATUS.JOINED:
        return this.renderJoinedActions()

      case BoardModel.STATUS.ON_APPROVAL:
        return this.renderApprovalActions()

      default:
        return this.renderDefaultActionButton()
    }
  }

  getStarsPopover () {
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
              <td className={css.countRating}><span className={css.countRatingTrack} /></td>
            </tr>
            <tr>
              <td className={css.countStars}>4 stars</td>
              <td className={css.countStarsVotes}>220</td>
              <td className={css.countRating}><span className={css.countRatingTrack} /></td>
            </tr>
            <tr>
              <td className={css.countStars}>3 stars</td>
              <td className={css.countStarsVotes}>220</td>
              <td className={css.countRating}><span className={css.countRatingTrack} /></td>
            </tr>
            <tr>
              <td className={css.countStars}>2 stars</td>
              <td className={css.countStarsVotes}>220</td>
              <td className={css.countRating}><span className={css.countRatingTrack} /></td>
            </tr>
            <tr>
              <td className={css.countStars}>1 stars</td>
              <td className={css.countStarsVotes}>220</td>
              <td className={css.countRating}><span className={css.countRatingTrack} /></td>
            </tr>
            <tr className={css.totalRow}>
              <td>Total</td>
              <td>860</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Popover>
    )
  }

  getSecurityPopover () {
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

  renderActionsTooltip ({ src, popoverContent, popoverClassName = '' }) {
    const { actionPopover } = this.state

    return (
      <span
        className={css.actionButtonTooltip}
        onMouseOver={this.handleActionsPopoverOpen.bind(this)}
        onMouseOut={this.handleActionsPopoverClose.bind(this)}
      >
        <img src={src} alt='' width='24' height='24' />
        {popoverContent ? (
          <Popover
            open={actionPopover}
            arrowPosition={Popover.ARROW_POSITION.RIGHT}
            className={popoverClassName}
          >
            {popoverContent}
          </Popover>)
          : null}
      </span>
    )
  }

  renderSecurityTooltip (){
    const { jobBoard } = this.props

    const level = jobBoard.validationLevel
    const securityIcon = level ? Icon.SETS.SECURITY : Icon.SETS.SECURITY_NONE

    return (
      <div className={css.securityRatingWrapper}>
        <Icon className={css.securityRatingShield} size={31} {...securityIcon} />
        { level ? (<span className={css.securityRating}>{level}</span>) : null }
      </div>
    )
  }

  renderBoardTags (){
    const { jobBoard } = this.props

    return jobBoard.categories && jobBoard.categories.map(item => item.name).join(', ')
  }

  renderLogo(){
    const { jobBoard } = this.props

    return jobBoard.logoSrc ? (
      <button className={css.logoLink}>
        <img src={jobBoard.logoSrc} alt='' />
      </button>
    ) : null
  }

  render () {
    const { jobBoard } = this.props
    console.log('job board item', jobBoard)

    return (
      <div className={css.main}>
        <div className={css.logoBlock}>
          { this.renderLogo() }
        </div>
        <div className={css.contentBlock}>
          <div className={css.titleBlock}>
            <div>
              <button className={css.title} onClick={() => {}}>
                { jobBoard.name }
              </button>
            </div>

            <div className={css.categoryWrapper}>
              <button className={css.category} onClick={() => {}}>
                { this.renderBoardTags() }
              </button>
            </div>

          </div>

          <div className={css.ratingBlock}>
            <div
              className={css.starsWrapper}
              onMouseOver={this.handleStarsPopoverOpen.bind(this)}
              onMouseOut={this.handleStarsPopoverClose.bind(this)}
            >
              {this.getRatingStars()}
              {this.getStarsPopover()}
            </div>

            <div
              className={css.securityBadge}
              onMouseOver={this.handleSecurityPopoverOpen.bind(this)}
              onMouseLeave={this.handleSecurityPopoverClose.bind(this)}
            >
              { this.renderSecurityTooltip() }
              { this.getSecurityPopover() }
            </div>
          </div>

          <div className={css.aboutJob}>
            <div className={css.jobInfo}>

              <div className={css.jobInfoBlock}>
                <div className={css.jobInfoCount}>{ jobBoard.jobsCounts }</div>
                <div className={css.jobInfoDescribe}>Jobs</div>
              </div>

              <div className={css.jobInfoBlock}>
                <div className={css.jobInfoCount}>{ jobBoard.clientsCounts }</div>
                <div className={css.jobInfoDescribe}>Clients</div>
              </div>

            </div>

            <div className={css.actionsWrapper}>
              {this.renderActions()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

