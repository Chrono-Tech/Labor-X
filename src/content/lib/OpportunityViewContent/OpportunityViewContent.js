import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { Router } from 'src/routes'
import { JobModel, BoardModel, JobOfferFormModel, ClientModel } from 'src/models'
import { createJobOffer, signerSelector, boardByIdSelector } from 'src/store'
import { Image, Button, Tab } from 'src/components/common'
import DescriptionTab from './DescriptionTab/DescriptionTab'
import CompanyTab from './CompanyTab/CompanyTab'
import css from './OpportunityViewContent.scss'

export class OpportunityViewContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    client: PropTypes.instanceOf(ClientModel),
    onPostOffer: PropTypes.func.isRequired,
  }

  state = {
    currentTab: 0,
    isOfferPosting: false,
  }

  handleBack () {
    Router.push('/opportunities')
  }

  handleCalendar = () => {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleCalendar')
  }

  handleTabClick = (index) => {
    this.setState({ currentTab: index })
  }

  handlePostOffer = async () => {
    this.setState({
      isOfferPosting: true,
    })
    try {
      await this.props.onPostOffer(
        new JobOfferFormModel({
          jobId: this.props.job.id,
          rate: new BigNumber(10),
          estimate: new BigNumber(10),
          ontop: new BigNumber(0),
        })
      )
      Router.push('/opportunities')
    } finally {
      this.setState({
        isOfferPosting: false,
      })
    }
  }

  tabs = [
    {
      key: 'description',
      title: 'Description',
      content: (props, state, handlePostOffer) => (
        <DescriptionTab job={props.job} isOfferPosting={state.isOfferPosting} onPostOffer={handlePostOffer} />
      ),
    },
    {
      key: 'info',
      title: 'Company info',
      content: (props) => (
        <CompanyTab {...props.company} board={props.board} client={props.client} />
      ),
    },
  ]

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
            <p>Ref {job.ipfs.refString}</p>
            <p className={css.opportunityAge}>{moment(job.ipfs.period.since).fromNow()}</p>
          </div>
          <div className={css.tabs}>
            {this.tabs.map((tab, index) => (
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
            {this.tabs[this.state.currentTab].content(this.props, this.state, this.handlePostOffer)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, op) {
  const signer = signerSelector()(state)
  const board = boardByIdSelector(op.job.boardId)(state)
  // TODO aevalyakin recieve client data from blockchain
  const client = new ClientModel({})
  return {
    signer,
    board,
    client,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onPostOffer: async (form: JobOfferFormModel) => dispatch(createJobOffer(form)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityViewContent)
