import PropTypes from 'prop-types'
import React from 'react'
import { Image, Button, Tag } from 'components/common'
import uniqid from 'uniqid'
import moment from 'moment'
import css from './DescriptionTab.scss'

const dateFormat = 'DD MMM, YYYY'

export default class DescriptionTab extends React.Component {
  static propTypes = {
    responsibilities: PropTypes.arrayOf(PropTypes.string),
    minimumRequirements: PropTypes.arrayOf(PropTypes.string),
    preferredRequirements: PropTypes.arrayOf(PropTypes.string),
    profileRequirements: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    starts: PropTypes.instanceOf(Date),
    deadline: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    payHour: PropTypes.number,
    totalHours: PropTypes.number,
  }

  constructor (props, context) {
    super(props, context)
    this.budget = this.budget.bind(this)
  }

  handleSave () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleSave')
  }

  handleApply () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleApply')
  }

  handleReport () {
    // eslint-disable-next-line no-console
    console.log('Opportunity-view-handleReport')
  }

  budget () {
    return this.props.totalHours * this.props.payHour
  }

  render () {
    return (
      <div>
        <div className={css.block}>
          <h4>RESPONSIBILITIES</h4>
          <ul>
            {this.props.responsibilities.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.block}>
          <h4>MINIMUM REQUIREMENTS</h4>
          <ul>
            {this.props.minimumRequirements.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.block}>
          <h4>PREFERRED REQUIREMENTS</h4>
          <ul>
            {this.props.preferredRequirements.map((e) => (<li key={uniqid()}><span>{e}</span></li>))}
          </ul>
        </div>
        <div className={css.delimiter} />
        <div className={css.profile}>
          <h3>laborX Profile Requirements</h3>
          {this.props.profileRequirements.map((e) => (
            <div className={css.profileRequirement} key={uniqid()}>
              <Image
                icon={Image.ICONS.CHECKBOX_CIRCLE}
                color={Image.COLORS.GREEN}
              />
              <p>{e}</p>
            </div>
          ))}
        </div>
        <div className={css.delimiter} />
        <div className={css.infoBlock}>
          <div className={css.infoRow}>
            <div className={css.infoColumn}>
              <div className={css.regular}>Category</div>
              <Tag value={this.props.category} />
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Starts at</div>
              <p>{moment(this.props.starts).format(dateFormat)}</p>
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Deadline</div>
              <p>{moment(this.props.deadline).format(dateFormat)}</p>
            </div>
            <div className={css.infoColumn}>
              <div className={css.regular}>Location</div>
              <p>{this.props.location}</p>
            </div>
          </div>
          <div className={css.infoRow}>
            <div className={css.infoColumn}>
              <div className={css.bold}>LHAU / HR</div>
              <div className={css.bold}>{this.props.payHour}</div>
            </div>
            <div className={css.infoColumn}>
              <div className={css.bold}>HOURS</div>
              <div className={css.bold}>{this.props.totalHours}</div>
            </div>
            <div className={css.infoColumn}>
              <div className={css.bold}>EST. BUDGET</div>
              <div className={css.budgetRow}>
                <span className={css.bold}>{this.budget()}</span>
                <span> (${this.budget() * 40})</span>
              </div>
            </div>
          </div>
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
            <Button
              label='APPLY'
              className={css.applyButton}
              mods={Button.MODS.FLAT}
              onClick={this.handleApply}
            />
          </div>
        </div>
      </div>
    )
  }
}
