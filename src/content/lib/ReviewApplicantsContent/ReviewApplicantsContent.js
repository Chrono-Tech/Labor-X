import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { JobModel, ProfileModel, JobOfferModel } from 'src/models'
import { reloadJobsOffers, jobsOffersSelector, profileSelector, workerProfile } from 'src/store'
import { getState } from 'src/store/review-applicants/selectors'
import { Button, Input, Image, Icon } from 'src/components/common'
import { WorkerCard } from 'src/partials'
import css from './ReviewApplicantsContent.scss'

const FORM_REVIEW_APPLICANTS = 'form/review-applicants'

export class ReviewApplicantsContent extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    reloadJobsOffers: PropTypes.func.isRequired,
    applicants: PropTypes.arrayOf(PropTypes.shape({
      offer: PropTypes.instanceOf(JobOfferModel),
      worker: PropTypes.instanceOf(ProfileModel),
    })),
    worker: PropTypes.instanceOf(ProfileModel),
    push: PropTypes.func,
    workerByAddressKey: PropTypes.shape({}),
    profileByAddressKey: PropTypes.shape({}),
    getWorkerProfile: PropTypes.func,
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { reloadJobsOffers, applicants, getWorkerProfile } = this.props
    reloadJobsOffers()
    applicants.forEach((applicant) => {
      getWorkerProfile(applicant.worker.address)
    })
  }

  handleBack = () => {
    this.props.push('/posted-jobs')
  }

  renderEmptyListMessage () {
    return (
      <div className={css.emptyListMessage}>
        Worker list is empty
      </div>
    )
  }

  render () {
    const { job, applicants, worker, workerByAddressKey, profileByAddressKey } = this.props
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
                {worker ? <WorkerCard offerSent {...worker} /> : this.renderEmptyListMessage()}
              </div>
            </div>
            <div className={css.block}>
              <h4>Job Applicants ({applicants.length})</h4>
              <div className={css.cards}>
                {applicants.map((applicant) => (<WorkerCard
                  {...applicant}
                  key={uniqid()}
                  jobId={this.props.job.id}
                  job={this.props.job}
                  workerProfile={workerByAddressKey[applicant.worker.address]}
                  profile={profileByAddressKey[applicant.worker.address]}
                />))}
                {!applicants.length && this.renderEmptyListMessage()}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, op) {
  const offers = jobsOffersSelector(op.job.id)(state)
  const applicants = !offers ? [] : offers.map(offer => ({
    offer,
    worker: profileSelector(offer.worker)(state),
  }))

  const worker = op.job.worker && applicants && applicants.length
    ? applicants.find(x => x.worker.address.toLowerCase() === op.job.worker.toLowerCase())
    : null

  const pageState = getState(state)

  return {
    applicants: worker ? applicants.filter(x => x.worker.address.toLowerCase() !== op.job.worker.toLowerCase()) : applicants,
    worker,
    workerByAddressKey: pageState.workerProfilesByAddress,
    profileByAddressKey: pageState.profilesByAddress,
  }
}

function mapDispatchToProps (dispatch, op) {
  return {
    push: (url) => dispatch(push(url)),
    reloadJobsOffers: () => dispatch(reloadJobsOffers(op.job.id)),
    getWorkerProfile: (address) => dispatch(workerProfile(address)),
  }
}

const form = reduxForm({
  form: FORM_REVIEW_APPLICANTS,
  fields: ['searchReviewApplicants'],
})(ReviewApplicantsContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
