import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import Router from 'next/router'
import { JobModel, BoardModel } from 'src/models'
import { signerSelector, boardByIdSelector } from 'src/store'
import { Image, Button, Tab } from 'src/components/common'
import DescriptionTab from './DescriptionTab/DescriptionTab'
import CompanyTab from './CompanyTab/CompanyTab'
import css from './OpportunityViewContent.scss'

export class OpportunityViewContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    title: PropTypes.string.isRequired,
    refString: PropTypes.string.isRequired,
    description: PropTypes.shape(DescriptionTab.propTypes).isRequired,
    company: PropTypes.shape(CompanyTab.propTypes).isRequired,
  }

  constructor (props, context) {
    super(props, context)
    this.handleTabClick = this.handleTabClick.bind(this)

    this.state = {
      currentTab: 0,
      tabs: [
        {
          title: 'Description',
          content: <DescriptionTab key={uniqid()} {...this.props.description} />,
        },
        {
          title: 'Company info',
          content: <CompanyTab key={uniqid()} {...this.props.company} />,
        },
      ],
    }
  }

  handleBack () {
    Router.push('/opportunities')
  }

  handleCalendar () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleCalendar')
  }

  handleTabClick (index) {
    this.setState({ currentTab: index })
  }

  render () {
    const { job } = this.props
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
              label='Opportunities'
              onClick={this.handleBack}
            />
            <Button
              icon={{
                icon: Image.ICONS.CALENDAR,
                color: Image.COLORS.WHITE,
              }}
              className={css.calendarButton}
              mods={Button.MODS.FLAT}
              onClick={this.handleCalendar}
            />
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2>{job.ipfs.name}</h2>
            <p>{this.props.refString}</p>
            <p className={css.opportunityAge}>1h ago</p>
          </div>
          <div className={css.tabs}>
            {this.state.tabs.map((tab, index) => (
              <Tab
                key={uniqid()}
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
            {this.state.tabs[this.state.currentTab].content}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, op) {
  const signer = signerSelector()(state)
  const board = boardByIdSelector(op.job.boardId)(state)
  return {
    signer,
    board,
  }
}

export default connect(mapStateToProps)(OpportunityViewContent)
