import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pluralize from 'pluralize'
import { Popover, Icon } from 'src/components/common'
import { BoardModel } from 'src/models'
import { joinBoard, terminateBoard } from 'src/store'
import css from './JobBoardItem.scss'
import { Button } from "../../common"
import Dialog from "../../common/Dialog/Dialog"
import RaisedButton from "material-ui/RaisedButton"
import FlatButton from "material-ui/FlatButton"

export class JobBoardItem extends React.Component {
  static propTypes = {
    jobBoard: PropTypes.instanceOf(BoardModel),
    onJoinBoard: PropTypes.func,
    onTerminateBoard: PropTypes.func,
    isMyJobBoard: PropTypes.bool,
  }

  constructor () {
    super()

    this.state = {
      starsPopover: false,
      securityPopover: false,
      actionPopover: false,
      isJoinInProgress: false,
      isTerminateDialogOpen: false,
      isTerminateProgress: false,
    }
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

  handleJoinBoard = async (boardId) => {
    this.setState({
      isJoinInProgress: true,
    })
    try {
      await this.props.onJoinBoard(boardId)
    } finally {
      this.setState({
        isJoinInProgress: false,
      })
    }
  }

  handleTerminateClick = () => this.setState({ isTerminateDialogOpen: true })

  handleTerminateApproveClick = async () => {
    this.setState({ isTerminateProgress: true })
    try {
      await this.props.onTerminateBoard(this.props.jobBoard.id)
    } finally {
      this.setState({ isTerminateProgress: false, isTerminateDialogOpen: false })
    }
  }

  handleTerminateRejectClick = () => this.setState({ isTerminateDialogOpen: false })

  handleTerminateDialogClose = () => this.setState({ isTerminateDialogOpen: false })

  getRatingStars () {
    const { jobBoard } = this.props

    let starsArray = []
    let count = jobBoard.extra.rating

    for (let i = 0; i < count; i++) {
      starsArray.push(
        <span key={i} className={css.star}>
          <img src='/static/images/svg/star-active.svg' alt='' width='20' />
        </span>
      )
    }

    return starsArray
  }

  getStarsPopover () {
    const { starsPopover } = this.state

    return (
      <Popover
        open={starsPopover}
        arrowPosition={Popover.ARROW_POSITION.LEFT}
        className={css.starsPopover}
      >
        <div>
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
        </div>
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
        <div>
          <div className={css.popoverHeader}>Validation</div>
          <div className={css.popoverDescription}>The Job Board Owner has successfully passed our Validation</div>
          <ul className={css.securityDoneList}>
            <li className={css.listItem}>Email is validated</li>
            <li className={css.listItem}>ID is validated</li>
            <li className={css.listItem}>Address is validated</li>
            <li className={css.listItem}>Certificates are validated</li>
          </ul>
        </div>
      </Popover>
    )
  }

  renderDefaultActionButton (text, isDisabled, onClick) {
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
      <button key='join' className={css.actionButton} onClick={onClick} disabled={isDisabled}>
        {text}
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
    return [
      <button key='view' className={css.actionButtonView}>
        View
      </button>,
      <span key='joined' className={css.actionButtonJoined}>
        Joined
      </span>,
    ]
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
    const { jobBoard, isMyJobBoard } = this.props
    return (
      <div>
        {
          isMyJobBoard
            ? <button key='terminate' disabled={this.state.isTerminateProgress} className={css.actionButtonTerminate} onClick={this.handleTerminateClick}>Terminate</button>
            : null
        }
        {
          jobBoard.extra.isSignerJoined
            ? this.renderJoinedActions()
            : this.renderDefaultActionButton('Join the Board', this.state.isJoinInProgress, () => this.handleJoinBoard(jobBoard.id))
        }
      </div>
    )
    // switch (jobBoard.status) {
    //   case BoardModel.STATUS.UNASSIGNED:
    //     return this.renderDefaultActionButton()
    //   case BoardModel.STATUS.NEED_VERIFY:
    //     return this.renderNeedVerifyButton()
    //   case BoardModel.STATUS.JOINED:
    //     return this.renderJoinedActions()
    //   case BoardModel.STATUS.ON_APPROVAL:
    //     return this.renderApprovalActions()
    //   default:
    //     return this.renderDefaultActionButton()
    // }
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

  renderSecurityTooltip () {
    const { jobBoard } = this.props

    const level = jobBoard.extra.validationLevel
    const securityIcon = level ? Icon.SETS.SECURITY : Icon.SETS.SECURITY_NONE

    return (
      <div className={css.securityRatingWrapper}>
        <Icon className={css.securityRatingShield} size={31} {...securityIcon} />
        { level ? (<span className={css.securityRating}>{level}</span>) : null }
      </div>
    )
  }

  renderBoardTags () {
    const { jobBoard } = this.props
    const tags = [
      jobBoard.tagsCategory.map(t => t.name),
      ...jobBoard.tags.map(t => t.name),
    ]
    return tags.join(', ')
  }

  renderLogo () {
    const { jobBoard } = this.props

    return jobBoard.ipfs.logo ? (
      <button className={css.logoLink}>
        <img src={jobBoard.ipfs.logo} alt='' />
      </button>
    ) : null
  }

  renderTerminateDialog () {
    return (
      <Dialog
        title='Are you absolutely sure?'
        open={this.state.isTerminateDialogOpen}
        onRequestClose={this.handleTerminateDialogClose}
        actions={[
          <FlatButton
            disabled={this.state.isTerminateProgress}
            label='NO'
            onClick={this.handleTerminateRejectClick}
            type={Button.TYPES.SUBMIT}
          />,
          <RaisedButton
            primary
            disabled={this.state.isTerminateProgress}
            label={this.state.isTerminateProgress ? 'Loading' : 'YES'}
            onClick={this.handleTerminateApproveClick}
            type={Button.TYPES.SUBMIT}
          />,
        ]}
      >
        This action cannot be undone. This will permanently terminate this job board
      </Dialog>
    )
  }

  render () {
    const { jobBoard } = this.props

    return (
      <div className={css.main}>
        <div className={css.logoBlock}>
          { this.renderLogo() }
        </div>
        <div className={css.contentBlock}>
          <div className={css.titleBlock}>
            <div>
              <button className={css.title}>
                { jobBoard.ipfs.name }
              </button>
            </div>

            <div className={css.categoryWrapper}>
              <button className={css.category}>
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
                <div className={css.jobInfoCount}>{jobBoard.extra.jobsCount}</div>
                <div className={css.jobInfoDescribe}>{pluralize('Job', jobBoard.extra.jobsCount)}</div>
              </div>

              <div className={css.jobInfoBlock}>
                <div className={css.jobInfoCount}>{ jobBoard.extra.clientsCount }</div>
                <div className={css.jobInfoDescribe}>{pluralize('Client', jobBoard.extra.clientsCount)}</div>
              </div>

            </div>

            <div className={css.actionsWrapper}>
              {this.renderActions()}
            </div>
          </div>
        </div>
        { this.renderTerminateDialog() }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMyJobBoard: state.wallet.selectedWallet.encrypted[0].address === ownProps.jobBoard.creator.slice(2).toLowerCase(),
})

function mapDispatchToProps (dispatch) {
  return {
    onJoinBoard: (boardId) => dispatch(joinBoard(boardId)),
    onTerminateBoard: (boardId) => dispatch(terminateBoard(boardId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobBoardItem)
