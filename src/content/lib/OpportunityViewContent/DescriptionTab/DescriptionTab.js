import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import { CircularProgress, MuiThemeProvider } from 'material-ui'
import { Image, Button, Tag } from 'src/components/common'
import { JobModel } from 'src/models'
import css from './DescriptionTab.scss'

const dateFormat = 'DD MMM, YYYY'

export default class DescriptionTab extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    isOfferPosting: PropTypes.bool,
    onPostOffer: PropTypes.func.isRequired,
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

  render () {
    const { isOfferPosting, job } = this.props
    return (
      <MuiThemeProvider>
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
          <div className={css.profile}>
            <h3>laborX Profile Requirements</h3>
            <div className={css.profileRequirement}>
              <Image
                icon={Image.ICONS.CHECKBOX_CIRCLE}
                color={Image.COLORS.GREEN}
              />
              <p>{`${job.ipfs.profileRequirements.reviewCount} Reviews`}</p>
            </div>
            <div className={css.profileRequirement}>
              <Image
                icon={Image.ICONS.CHECKBOX_CIRCLE}
                color={Image.COLORS.GREEN}
              />
              <p>{`Rating ${job.ipfs.profileRequirements.rating}+`}</p>
            </div>
            <div className={css.profileRequirement}>
              <Image
                icon={Image.ICONS.CHECKBOX_CIRCLE}
                color={Image.COLORS.GREEN}
              />
              <p>{`Account Validation Level ${job.ipfs.profileRequirements.validationLevel}`}</p>
            </div>
          </div>
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
              {!isOfferPosting ? null : <CircularProgress className={css.submitProgress} size={24} />}
              <Button
                type='button'
                label='APPLY'
                className={css.applyButton}
                mods={Button.MODS.FLAT}
                onClick={this.handleApply}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
