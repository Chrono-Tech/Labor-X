// @flow
import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { JobModel, BoardModel, JobOfferFormModel, ClientModel, WORKFLOW_TM } from 'src/models'
import { createJobOffer, createJobOfferWithPrice, signerSelector, boardByIdSelector, modalsPush } from 'src/store'
import { Image, Button, Tab, ScheduleWidget } from 'src/components/common'
import { MakeOfferDialog } from 'src/partials'
import DescriptionTab from './DescriptionTab/DescriptionTab'
import CompanyTab from './CompanyTab/CompanyTab'
import css from './OpportunityViewContent.scss'

export class OpportunityViewContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    client: PropTypes.instanceOf(ClientModel),
    onPostOffer: PropTypes.func.isRequired,
    pushModal: PropTypes.func.isRequired,
    onPostOfferWithPrice: PropTypes.func,
    push: PropTypes.func,
  }

  state = {
    currentTab: 0,
    isOfferPosting: false,
    isScheduleVisible: false,
  }

  handleBack = () => {
    this.props.push('/opportunities')
  }

  handleClickCalendar = (e) => {
    e.stopPropagation()
    this.setState(prevState => ({
      isScheduleVisible: !prevState.isScheduleVisible,
    }))
  }

  handleClickPage = () => {
    this.setState({
      isScheduleVisible: false,
    })
  }

  handleTabClick = (index) => {
    this.setState({ currentTab: index })
  }

  handleMakeOffer = () => {
    // eslint-disable-next-line no-console
    console.log('OpportunityViewContent-handleMakeOffer')
    const modal = {
      component: MakeOfferDialog,
      props: { job: this.props.job, makeOfferApply: this.handleMakeOfferApply },
    }
    this.props.pushModal(modal)
  }

  handleMakeOfferApply = async ({ fixedPrice, hourlyRate, totalHours }) => {
    try {
      this.setState({
        isOfferPosting: true,
      })
      const { job } = this.props
      switch (Number(job.flowType)) {
        case WORKFLOW_TM.index:
          await this.props.onPostOffer(
            new JobOfferFormModel({
              jobId: job.id,
              rate: new BigNumber(hourlyRate),
              estimate: new BigNumber(totalHours),
              ontop: new BigNumber(0),
            })
          )
          break
        default: //fixed price workflow and another
          await this.props.onPostOfferWithPrice(
            new JobOfferFormModel({
              jobId: job.id,
              fixedPrice: new BigNumber(fixedPrice),
            })
          )
          break
      }
      this.setState({
        isOfferPosting: false,
      }, () => {
        this.props.push('/applications-and-offers')
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      this.setState({ isOfferPosting: false })
    }
  }

  handlePostOffer = async () => {
    try {
      this.setState({
        isOfferPosting: true,
      })
      const { job } = this.props
      const { hourlyRate, totalHours, fixedPrice } = job.ipfs.budget
      switch (Number(job.flowType)) {
        case WORKFLOW_TM.index:
          await this.props.onPostOffer(
            new JobOfferFormModel({
              jobId: job.id,
              rate: new BigNumber(hourlyRate),
              estimate: new BigNumber(totalHours),
              ontop: new BigNumber(0),
            })
          )
          break
        default: //fixed price workflow and another
          await this.props.onPostOfferWithPrice(
            new JobOfferFormModel({
              jobId: job.id,
              fixedPrice: new BigNumber(fixedPrice),
            })
          )
          break
      }
      this.setState({
        isOfferPosting: false,
      }, () => {
        this.props.push('/applications-and-offers')
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      this.setState({ isOfferPosting: false })
    }
  }

  tabs = [
    {
      key: 'description',
      title: 'Description',
      content: (props, state, handlePostOffer, handleMakeOffer) => (
        <DescriptionTab job={props.job} isOfferPosting={state.isOfferPosting} onPostOffer={handlePostOffer} onMakeOffer={handleMakeOffer} />
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

  renderSchedule = () => {
    return this.state.isScheduleVisible ? (
      <ScheduleWidget
        events={[
          {
            date: new Date(),
            description: 'blah blah',
          },
          {
            date: new Date(),
            description: 'blah2 blah2',
          },
          {
            date: moment(new Date()).add(1, 'd').toDate(),
            description: 'blah3 blah3',
          },
        ]}
      />
    ) : null
  }

  render () {
    const { job } = this.props
    return (
      <div className={css.main} onClick={this.handleClickPage}>
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
              onClick={this.handleClickCalendar}
            />
          </div>
        </div>
        <div className={css.content}>
          {this.renderSchedule()}
          <div className={css.header}>
            <h2>{job.ipfs.name}</h2>
            <p>Ref {job.id}</p>
            <p className={css.opportunityAge}>{moment(job.extra.createdAt).fromNow()}</p>
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
            {this.tabs[this.state.currentTab].content(this.props, this.state, this.handlePostOffer, this.handleMakeOffer)}
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
    onPostOfferWithPrice: async (form: JobOfferFormModel) => dispatch(createJobOfferWithPrice(form)),
    pushModal (modal) { dispatch(modalsPush(modal)) },
    push: (url) => dispatch(push(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityViewContent)
