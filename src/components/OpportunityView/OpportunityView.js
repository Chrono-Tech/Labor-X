import { Image, Tag, Button } from 'components/common'
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import moment from 'moment'
import css from './OpportunityView.scss'

const dateFormat = 'DD MMM, YYYY'

export default class OpportunityView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    refString: PropTypes.string.isRequired,
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
    console.log('Opportunity-view-handleSave')
  }

  handleApply () {
    console.log('Opportunity-view-handleApply')
  }

  handleBack () {
    Router.push('/opportunities')
  }

  handleCalendar () {
    console.log('Opportunity-view-handleCalendar')
  }

  budget () {
    return this.props.totalHours * this.props.payHour
  }

  render () {
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
            <h2>{this.props.title}</h2>
            <p>{this.props.refString}</p>
            <p className={css.opportunityAge}>1h ago</p>
          </div>
          <div className={css.tabs}>
            <div className={[css.tab, css.tabActive].join(' ')}>DESCRIPTION</div>
            <div className={css.tab}>COMPANY INFO</div>
          </div>
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
              onClick={this.handleSave}
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
      </div>
    )
  }
}
