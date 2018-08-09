import React from 'react'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import get from "lodash/get"
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

import { JobModel, ProfileModel, JobOfferModel } from 'src/models'
import { applicantsSelector, jobSelector } from 'src/store/review-applicants/selectors'
import { Button, Image, Icon } from 'src/components/common'
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
    const { job, applicants, worker } = this.props
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
              <h4>{get(job, "ipfs.name")}</h4>
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
            <div className={css.searchContainer}>
              <Field
                fullwidth
                component={TextField}
                className={css.searchInput}
                name='searchReviewApplicants'
                placeholder='Search by keyword'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon size={24} icon={Icon.ICONS.SEARCH} color={Icon.COLORS.BLACK} />
                    </InputAdornment>
                  ),
                }}
              />
              <div className={css.currentFilterContainer}>
                <div className={css.filterText}>Sydney, Building, Industrial</div>
                <Icon size={24} icon={Icon.ICONS.FILTER} color={Icon.COLORS.GREY50} />
              </div>
            </div>
            <div className={css.block}>
              <h4>Selected Worker</h4>
              <div className={css.cards}>
                {worker ? <WorkerCard offerSent workerProfile={worker} /> : this.renderEmptyListMessage()}
              </div>
            </div>
            <div className={css.block}>
              <h4>Job Applicants ({applicants.length})</h4>
              <div className={css.cards}>
                {applicants.map((applicant) => (<WorkerCard
                  offer={applicant.offer}
                  key={uniqid()}
                  jobId={job.id}
                  job={job}
                  workerProfile={applicant.workerProfile}
                  profile={applicant.profile}
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

function mapStateToProps (state) {
  const applicants = applicantsSelector(state)
  const job = jobSelector(state)
  const worker = job.worker && applicants && applicants.length
    ? applicants.find(x => x.worker.address.toLowerCase() === job.worker.toLowerCase())
    : null

  return {
    job,
    applicants,
    worker,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    push: (url) => dispatch(push(url)),
  }
}

const form = reduxForm({
  form: FORM_REVIEW_APPLICANTS,
  fields: ['searchReviewApplicants'],
})(ReviewApplicantsContent)

export default connect(mapStateToProps, mapDispatchToProps)(form)
