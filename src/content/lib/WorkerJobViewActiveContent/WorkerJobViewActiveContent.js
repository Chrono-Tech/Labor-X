import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { JobModel, BoardModel, ClientModel, JobStateModel } from 'src/models'
import { signerSelector, boardByIdSelector } from 'src/store'
import { Image, Button, Tab, Icon } from 'src/components/common'
import DocsTab from './DocsTab/DocsTab'
import LogTab from './LogTab/LogTab'
import InfoTab from './InfoTab/InfoTab'
import InvoiceTab from './InvoiceTab/InvoiceTab'
import css from './WorkerJobViewActiveContent.scss'

export class WorkerJobViewActiveContent extends React.Component {
  static propTypes = {
  }

  state = {
    currentTab: 0,
  }

  handleBack () {
    this.props.push('/posted-jobs')
  }

  handleTabClick = (index) => {
    this.setState({ currentTab: index })
  }

  tabs = [
    {
      key: 'general',
      title: 'General',
      content: (props) => (
        <DocsTab job={props.job} />
      ),
    },
    {
      key: 'info',
      title: 'Info',
      content: (props) => (
        <InfoTab job={props.job} />
      ),
    },
    {
      key: 'log',
      title: 'Log',
      content: (props) => (
        <LogTab job={props.job} />
      ),
    },
     {
      key: 'contract',
      title: 'Contract',
      content: (props) => (
        <InvoiceTab job={props.job} />
      ),
    },
  ]

  render () {
    return (
      <div className={css.main}>
        <div className={css.title}>
          <div className={css.titleBar}>
            <Button
              icon={{
                icon: Image.ICONS.ARROW_BACK,
                color: Image.COLORS.WHITE,
              }}
              className={css.backButton}
              mods={Button.MODS.FLAT}
              onClick={this.handleBack}
            />
          </div>
        </div>
        <div className={css.content}>
          <div className={cn(css.header, job.state === JobStateModel.JOB_STATE_STARTED ? css.bgGreen : css.bgGrey)}>
            <div>
              <h2 className={css.jobName}>job.ipfs.name</h2>
              <div className={css.jobInfoContainer}>
                <p className={css.jobInfo}>Ref job.ipfs.refString</p>
                <p className={css.jobInfo}>client.ipfs.name (Client)</p>
              </div>
            </div>
            {/* { 
              job.ipfs.budget.isSpecified && job.state === JobStateModel.JOB_STATE_STARTED &&
              <div className={css.jobProgressContainer}>
                <div><strong>PROGRESS 0%</strong> 0 / {job.ipfs.budget.award.toString()} LHUS   $0 / ${job.ipfs.budget.awardUSD.toString()}</div>
              </div>
            } */}
            <div className={css.jobMenu}>
              <Icon
                icon={Icon.ICONS.MORE}
                color={Icon.COLORS.WHITE}
                size={24}
              />
              <div className={css.jobDropdown}>
                <div className={css.jobDropdownEntry}>Edit</div>
                <div className={css.jobDropdownEntry}>View Public Page</div>
                <div className={css.jobDropdownEntry}>Terminate</div>
              </div>
            </div>
            <Icon
              className={css.messageIcon}
              icon={Icon.ICONS.MESSAGE}
              color={Icon.COLORS.WHITE}
              size={24}
            />
          </div>
          <div className={cn(css.bgGreen)}>
            {this.tabs.map((tab, index) => tab && (
              <Tab
                key={tab.key}
                className={css.tab}
                classActive={css.tabActive}
                index={index}
                title={tab.title}
                isActive={this.state.currentTab === index}
                onClick={this.handleTabClick}
              />
            ))}
          </div>
          <div className={css.tabContent}>
            {this.tabs[this.state.currentTab].content(this.props, this.state)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, op) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerJobViewActiveContent)
