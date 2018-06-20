import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import { Tip } from 'components/common'
import { CircularProgress } from 'material-ui'
import { Image, Button, Tag } from 'src/components/common'
import { JobModel } from 'src/models'
import css from './DescriptionTab.scss'

const dateFormat = 'DD MMM, YYYY'

export default class DescriptionTab extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    isOfferPosting: PropTypes.bool,
    onPostOffer: PropTypes.func.isRequired,
    onMakeOffer: PropTypes.func.isRequired,
  }

  handleSave = () => {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleSave')
  }

  handleApply = async () => {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleApply')
    return this.props.onPostOffer()
  }

  handleReport = () => {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleReport')
  }

  getRequirements = () => {
    const { job } = this.props
    const requirements = []

    if (typeof job.ipfs.profileRequirements.reviewCount !== 'undefined') {
      requirements.push({ key: 'reviewCount', message: `${job.ipfs.profileRequirements.reviewCount} Reviews` })
    }

    if (typeof job.ipfs.profileRequirements.rating !== 'undefined') {
      requirements.push({ key: 'rating', message: `Rating ${job.ipfs.profileRequirements.rating}+` })
    }

    if (typeof job.ipfs.profileRequirements.validationLevel !== 'undefined') {
      requirements.push({ key: 'validationLevel', message: `Account Validation Level ${job.ipfs.profileRequirements.validationLevel}+` })
    }

    return requirements
  }

  getApplyButton = () => {
    const button = (<Button
      type='button'
      label='APPLY'
      disabled
      className={css.applyButton}
      mods={Button.MODS.FLAT}
      onClick={this.handleApply}
    />)

    if (this.isSkillsFit()) {
      return button
    }

    return (
      <Tip
        position='center'
        title='Attention'
        tip='Your skills are not appropriate for this opportunity'
      >
        {button}
      </Tip>)
  }

  isSkillsFit = () => {
    return false
  }

  render () {
    const { isOfferPosting, job, onMakeOffer } = this.props
    return (
      <div>
        <div className={css.block}>
          <h4>RESPONSIBILITIES</h4>
          <ul>
            {job.ipfs.responsibilities.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.block}>
          <h4>MINIMUM REQUIREMENTS</h4>
          <ul>
            {job.ipfs.minimumRequirements.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.block}>
          <h4>PREFERRED REQUIREMENTS</h4>
          <ul>
            {job.ipfs.preferredRequirements.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.delimiter} />
        {job.ipfs.profileRequirements.isSpecified &&
        <div className={css.profile}>
          <h3>laborX Profile Requirements</h3>
          {this.getRequirements().map((requirement) => {
            return (
              <div key={requirement.key} className={css.profileRequirement}>
                <Image
                  icon={Image.ICONS.CHECKBOX_CIRCLE}
                  color={Image.COLORS.GREEN}
                />
                <p>{requirement.message}</p>
              </div>)
          })}
        </div>}
        <div className={css.delimiter} />
        <div className={css.infoBlock}>
          <div className={css.infoRow}>
            <div className={css.infoColumn}>
              <div className={css.regular}>Category</div>
              <Tag value={job.category.name} />
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Starts at</div>
              <p>{moment(job.ipfs.period.since).format(dateFormat)}</p>
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Deadline</div>
              <p>{moment(job.ipfs.period.until).format(dateFormat)}</p>
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Location</div>
              <p>{job.ipfs.address.location}</p>
            </div>
          </div>
          { job.ipfs.budget.isSpecified && (
            <div className={css.infoRow}>
              <div className={css.infoColumn}>
                <div className={css.bold}>LHAU / HR</div>
                <div className={css.bold}>{job.ipfs.budget.hourlyRate}</div>
              </div>
              <div className={css.infoColumn}>
                <div className={css.bold}>HOURS</div>
                <div className={css.bold}>{job.ipfs.budget.totalHours}</div>
              </div>
              <div className={css.infoColumn}>
                <div className={css.bold}>EST. BUDGET</div>
                <div className={css.budgetRow}>
                  <span className={css.bold}>{job.ipfs.budget.award.toString()}</span>
                  <span> (${job.ipfs.budget.awardUSD.toString()})</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={css.delimiter} />
        <div className={css.actionsBlock}>
          <Button
            label='REPORT'
            icon={{
              icon: Image.ICONS.ERROR,
              color: Image.COLORS.GREY30,
            }}
            className={css.reportButton}
            mods={Button.MODS.FLAT}
            onClick={this.handleReport}
          />
          <div className={css.actionsSaveApply}>
            <Button
              label='SAVE'
              className={css.saveButton}
              mods={Button.MODS.FLAT}
              onClick={this.handleSave}
            />
            { !job.ipfs.allowCustomOffer ? null : (
              <Button
                label='Make Your Offer!'
                className={css.makeOfferButton}
                mods={Button.MODS.FLAT}
                onClick={onMakeOffer}
              />
            )}
            {!isOfferPosting ? null : <CircularProgress className={css.submitProgress} size={24} />}
            {this.getApplyButton()}
          </div>
        </div>
      </div>
    )
  }
}
