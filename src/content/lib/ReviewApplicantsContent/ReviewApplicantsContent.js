import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Router } from 'src/routes'
import { JobModel, WorkerModel } from 'src/models'
import { Button, Input, Image, Icon, WorkerCard } from 'src/components/common'
import css from './ReviewApplicantsContent.scss'

const FORM_REVIEW_APPLICANTS = 'form/review-applicants'

export class ReviewApplicantsContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      worker: PropTypes.instanceOf(WorkerModel),
      data: PropTypes.instanceOf(Date),
      offer: PropTypes.number,
    })),
    cardsOfferSent: PropTypes.arrayOf(PropTypes.shape({
      worker: PropTypes.instanceOf(WorkerModel),
      data: PropTypes.instanceOf(Date),
      offer: PropTypes.number,
    })),
  }

  constructor (props) {
    super(props)
  }

  handleBack () {
    Router.push('/active-jobs')
  }

  renderEmptyListMessage (){
    return (
      <div className={css.emptyListMessage}>
        Worker list is empty
      </div>
    )
  }

  render () {
    const { job, cards, cardsOfferSent } = this.props
    return !cards ? null : (
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
              label='Posted Jobs'
              onClick={this.handleBack}
            />
          </div>
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h2 className={css.jobHeader}>Review Workers</h2>
            <div className={css.jobName}>
              <h4>{job.ipfs.name}</h4>
              <div className={css.jobMenu}>
                <Icon
                  icon={Icon.ICONS.MORE}
                  color={Icon.COLORS.WHITE}
                  size={32}
                />
                <div className={css.jobDropdown}>
                  <div className={css.jobDropdownEntry}>Job Details</div>
                  <div className={css.jobDropdownEntry}>Message Recruiter</div>
                </div>
              </div>
            </div>
          </div>
          <form className={css.contentContainer} name={FORM_REVIEW_APPLICANTS}>
            <div className={css.filterRow}>
              <div className={css.searchRow}>
                <Image
                  icon={Image.ICONS.SEARCH}
                  color={Image.COLORS.BLACK}
                />
                <Field
                  component={Input}
                  className={css.search}
                  name='searchReviewApplicants'
                  placeholder='Search by keyword'
                  materialInput
                  defaultTheme={false}
                />
              </div>
              <Image
                icon={Image.ICONS.FILTER}
                color={Image.COLORS.BLACK}
              />
            </div>
            <div className={css.block}>
              <h4>Sent Offer</h4>
              <div className={css.cards}>
                { cardsOfferSent &&  cardsOfferSent.map((card) => (<WorkerCard offerSent {...card} key={card.worker.key} />))}
                { cardsOfferSent && !cardsOfferSent.length && this.renderEmptyListMessage() }
              </div>
            </div>
            <div className={css.block}>
              <h4>Job Applicants ({cards.length})</h4>
              <div className={css.cards}>
                { cards &&  cards.map((card) => (<WorkerCard {...card} key={card.worker.key} />))}
                { cards && !cards.length && this.renderEmptyListMessage() }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps () {
  // TODO aevalyakin get workers and data from backend
  const cards = [
    {
      worker: new WorkerModel({}),
      date: new Date(),
      offer: 10,
    },
    {
      worker: new WorkerModel({}),
      date: new Date(),
    },
    {
      worker: new WorkerModel({}),
      date: new Date(),
    },
    {
      worker: new WorkerModel({}),
      date: new Date(),
    },
    {
      worker: new WorkerModel({}),
      date: new Date(),
    },
  ]

  const cardsOfferSent = [
    {
      worker: new WorkerModel({}),
      date: new Date(),
      offer: 9,
    },
  ]

  return {
    cardsOfferSent,
    cards,
  }
}

function mapDispatchToProps () {
  return {}
}

const form = reduxForm({
  form: FORM_REVIEW_APPLICANTS,
  fields: ['searchReviewApplicants'],
})(ReviewApplicantsContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
