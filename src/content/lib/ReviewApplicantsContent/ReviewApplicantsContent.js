import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Router } from 'src/routes'
import { JobModel, WorkerModel } from 'src/models'
import { Button, Input, Image, Icon, WorkerCard } from 'src/components/common'
import css from './ReviewApplicantsContent.scss'
import { getJobOffers } from "../../../store"

const FORM_REVIEW_APPLICANTS = 'form/review-applicants'

export class ReviewApplicantsContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    applicants: PropTypes.arrayOf(PropTypes.shape({
      worker: PropTypes.instanceOf(WorkerModel),
      data: PropTypes.instanceOf(Date),
      offer: PropTypes.number,
    })),
    worker: PropTypes.shape({
      worker: PropTypes.instanceOf(WorkerModel),
      data: PropTypes.instanceOf(Date),
      offer: PropTypes.number,
    }),
    getJobOffers: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getJobOffers()
  }

  handleBack () {
    Router.pushRoute('/active-jobs')
  }

  renderEmptyListMessage (){
    return (
      <div className={css.emptyListMessage}>
        Worker list is empty
      </div>
    )
  }

  render () {
    const { job, applicants, worker } = this.props
    return !applicants ? null : (
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
              <h4>Selected Worker</h4>
              <div className={css.cards}>
                { worker ? <WorkerCard offerSent {...worker} /> : this.renderEmptyListMessage() }
              </div>
            </div>
            <div className={css.block}>
              <h4>Job Applicants ({applicants.length})</h4>
              <div className={css.cards}>
                { applicants &&  applicants.map((card) => (<WorkerCard {...card} key={card.worker.key} />))}
                { applicants && !applicants.length && this.renderEmptyListMessage() }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  // TODO aevalyakin get workers and data from backend
  const applicants = state.jobs.offers.offers
    ? state.jobs.offers.offers.map(x => ({
      worker: new WorkerModel({ id: x.worker }),
      date: new Date(),
      offer: x.rate,
    })) : null
  const worker = ownProps.job.worker && state.jobs.offers.offers ? {
    worker: new WorkerModel({}),
    date: new Date(),
    offer: state.jobs.offers.offers.find(x => x.worker.toLowerCase() === ownProps.job.worker.toLowerCase()).rate,
  } : null
  return {
    worker,
    applicants,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getJobOffers: () => dispatch(getJobOffers(ownProps.job.id)),
})

const form = reduxForm({
  form: FORM_REVIEW_APPLICANTS,
  fields: ['searchReviewApplicants'],
})(ReviewApplicantsContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
