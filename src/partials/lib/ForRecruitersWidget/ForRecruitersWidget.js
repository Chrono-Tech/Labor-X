import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Widget, Icon } from 'src/components/common'
import {
  getRecruiterBoardsJobs,
  recruiterBoardsSelector,
} from 'src/store/dashboard'
import { SignerModel, BoardModel } from 'src/models'
import css from './ForRecruitersWidget.scss'

export class ForRecruitersWidget extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    getRecruiterBoardsJobs: PropTypes.func.isRequired,
    recruiterBoards: PropTypes.arrayOf(PropTypes.instanceOf(BoardModel)),
  }

  componentDidMount () {
    this.props.getRecruiterBoardsJobs()
  }

  render () {
    const { recruiterBoards, signer } = this.props
    return signer && (
      <div className={css.main}>
        <div className={css.row}>
          <Widget
            href='/create-job-board'
            title='ui.dashboard.recruiter.createYourJobBoard'
            subtitle='ui.dashboard.recruiter.recruiter'
            actions={[
              {
                href: '/create-job-board',
                label: 'Create a job board',
                secondIcon: Icon.SETS.HELP_OUTLINE,
                secondIconTip: {
                  tip: 'tip.createJobBoard',
                },
                isLink: true,
              },
              {
                href: '/create-client-job-board',
                label: 'Create a client job board',
                secondIcon: Icon.SETS.HELP_OUTLINE,
                secondIconTip: {
                  tip: 'tip.createClientJobBoard',
                },
                isLink: true,
              },
            ]}
          >
        Create you first Job Board and start to build your network of Clients
        and Workers to receive fees on job completed.
          </Widget>
          <Widget
            href='/recruiter-jobs'
            title='ui.dashboard.recruiter.hrReview'
            subtitle='ui.dashboard.recruiter.recruiter'
            actions={[
              {
                href: '/',
                label: 'Install 10 Gas Ovens',
                date: '20 Dec',
              },
              {
                href: '/',
                label: 'Pick-up 3 sofas',
                date: '21 Dec',
              },
            ]}
          />

        </div>
        { recruiterBoards.length > 0 ? (
          <div className={css.row}>
            <Widget
              title='ui.dashboard.recruiter.createYourJobBoard'
              subtitle='ui.dashboard.recruiter.recruiter'
              actions={
                recruiterBoards.filter(board => board.ipfs.name).map(board => ({
                  href: `/board/${board.id}`,
                  label: board.ipfs.name,
                  ...(board.ipfs.logo
                    ? { firstImage: board.ipfs.logo }
                    : { firstIcon: {
                      icon: Icon.ICONS.COMPANY,
                      color: Icon.COLORS.BLUE,
                    } }
                  ),
                  isLink: true,
                }))
              }
            />
          </div>
        ) : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const recruiterBoards = recruiterBoardsSelector(state)
  return {
    recruiterBoards: recruiterBoards || [],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRecruiterBoardsJobs: () => dispatch(getRecruiterBoardsJobs(ownProps.signer.address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForRecruitersWidget)
