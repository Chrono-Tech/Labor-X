import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import DonutChart from "react-svg-donut-chart"
import AutoComplete from 'material-ui/AutoComplete'
import { Field, reduxForm } from 'redux-form'
import { CircularProgress } from 'material-ui'
import { MenuItem } from 'material-ui/Menu'
import { SelectField } from 'redux-form-material-ui'

import { Image, Chip, Input, Button, Icon, Checkbox, RadioIcon, VerificationLevelSelector } from 'components/common'
import {
  TagModel,
  TAGS_LIST,
  TAG_AREAS_LIST,
  TAG_CATEGORIES_LIST,
  BOARD_REQUIREMENTS_LIST,
  BOARD_REQUIREMENTS,
  BOARD_POST_FEE_LIST,
} from 'src/models'

import css from './CreateJobBoardForm.scss'
import validate from "./validate"

export const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

class CreateJobBoardForm extends React.Component {
  static propTypes = {
    joinRequirement: PropTypes.number,
    change: PropTypes.func,
    submitFailed: PropTypes.bool,
    isLoading: PropTypes.bool,
    handleSubmit: PropTypes.func,
    formErrors: PropTypes.shape({
      searchTagsError: PropTypes.string,
    }),
    canJoinAmount: PropTypes.shape({
      clients: PropTypes.number,
      workers: PropTypes.number,
    }),
  }

  constructor (props) {
    super(props)

    this.state = {
      tags: [],
    }
  }

  handleAddTag = (tag) => {
    const { change } = this.props

    if (tag instanceof TagModel && !this.state.tags.find(item => item.index === tag.index)) {

      const newTags = [...this.state.tags, tag]

      this.setState({ tags: newTags }, () => {
        change('tags', newTags)
      })
    }

    change('searchTags', '')
  }

  getTagsList () {
    return TAGS_LIST
  }

  onRemoveTag (tag) {
    const { tags } = this.state
    const { change } = this.props

    const newTags = tags.filter(item => item.index !== tag.index)

    this.setState({ tags: newTags })

    change('tags', newTags)
  }

  searchTagFilter = (searchText, key) => {
    return searchText !== '' &&
      String(key || '').toLowerCase().indexOf(String(searchText || '').toLowerCase()) !== -1
  }

  renderTags () {
    const { tags } = this.state

    return tags && tags.map((item) => (
      <Chip
        key={uniqid()}
        value={item.name}
        // eslint-disable-next-line react/jsx-no-bind
        onRemove={() => this.onRemoveTag(item)}
      />
    ))
  }

  renderDonutChart = () => {
    const { canJoinAmount } = this.props
    return (
      <DonutChart
        data={[
          {
            stroke: '#92cc72',
            strokeWidth: 6,
            value: canJoinAmount.workers,
          },
          {
            stroke: '#ddffb2',
            strokeWidth: 6,
            value: canJoinAmount.clients,
          },
        ]}
        spacing={1}
      />
    )
  }

  renderSpecificRequirementsContent (){
    return (
      <div>
        <div className={css.specificRequirementsBlock}>
          <div className={css.specificRequirement}>
            <h3 className={css.cardTitle}>
              Rating Requirements
            </h3>
            <div className={css.subtitle}>
              Specify which requirements should be met in order to join the board.
            </div>
            <div className={css.ratingRow}>
              <Field
                component={RadioIcon}
                radioButtonClassName={css.field}
                name='ratingRequirements'
                label='Rating'
                checkedIcon={(
                  <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                    <Icon className={css.star} size={36} {...Icon.SETS.STAR} />
                  </div>
                )}
                uncheckedIcon={(
                  <div className={[css.iconWrapper, css.checkedIconWrapper].join(' ')}>
                    <Icon className={css.semiTransparentStar} size={36} {...Icon.SETS.STAR} />
                  </div>
                )}
                values={[
                  { value: 1 },
                  { value: 2 },
                  { value: 3 },
                  { value: 4 },
                  { value: 5 },
                ]}
                material
              />
            </div>
          </div>

          <div className={[css.specificRequirement, css.specificRequirementRight].join(' ')}>
            <h3 className={css.cardTitle}>
              Validation Level Requirements
            </h3>
            <div className={css.subtitle}>
              Indicates which users&apos; information are validated.
            </div>
            <Field name='verificationRequirements' component={VerificationLevelSelector} />
          </div>
        </div>

        <div className={css.specificRequirementsBlock}>
          <div className={css.specificRequirement}>
            <h3 className={css.cardTitle}>
              Skills
            </h3>
            <div className={css.subtitle}>
              <Field
                component={Checkbox}
                className={css.field}
                name='endorsingSkills'
                label='Worker skills must be endorsed'
                material
                defaultTheme
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { handleSubmit, isLoading, submitFailed, joinRequirement, formErrors, canJoinAmount } = this.props
    return (
      <form name={FORM_CREATE_JOB_BOARD} className={css.main} onSubmit={handleSubmit}>
        <div className={css.title}>
          <div className={css.titleBar}>
            <Button
              className={css.cancelButton}
              icon={Image.SETS.ARROW_BACK}
              type={Button.TYPES.SUBMIT}
              mods={Button.MODS.FLAT}
            />
            <div className={css.titleBarRight}>
              <Button
                className={css.helpButton}
                icon={Image.SETS.HELP_INVERT}
                mods={Button.MODS.FLAT}
              />
              {!isLoading ? null : <CircularProgress className={css.submitProgress} size={24} />}
              <Button
                className={css.doneButton}
                label='terms.done'
                mods={Button.MODS.FLAT}
                onClick={this.props.handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className={css.content}>
          <div className={css.headline}>
            <Field
              className={css.boardHeadline}
              component={Input}
              placeholder='Enter Job Board Headline'
              mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
              name='name'
            />
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Area</h3>
            <div className={css.flexRow}>
              <Field
                component={SelectField}
                name='tagsArea'
                selectedMenuItemStyle={{ fontSize: 14 }}
                menuItemStyle={{ fontSize: 14 }}
                labelStyle={{ fontSize: 14 }}
                style={{ width: 300 }}
              >
                {
                  TAG_AREAS_LIST.map((item) => (
                    <MenuItem key={uniqid()} value={item} primaryText={item.name} />
                  ))
                }
              </Field>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Categories</h3>
            <div className={css.flexRow}>
              <Field
                component={SelectField}
                name='tagsCategory'
                selectedMenuItemStyle={{ fontSize: 14 }}
                menuItemStyle={{ fontSize: 14 }}
                labelStyle={{ fontSize: 14 }}
                style={{ width: 300 }}
              >
                {
                  TAG_CATEGORIES_LIST.map((item) => (
                    <MenuItem key={uniqid()} value={item} primaryText={item.name} />
                  ))
                }
              </Field>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Skills</h3>
            <div className={css.flexRow}>
              <Field
                className={css.find}
                style={{ marginRight: 10 }}
                component={AutoComplete}
                onNewRequest={this.handleAddTag}
                filter={this.searchTagFilter}
                dataSourceConfig={{
                  text: 'name',
                  value: 'name',
                }}
                errorText={formErrors.tags && submitFailed ? formErrors.tags : null}
                dataSource={this.getTagsList()}
                name='searchTags'
                hintText='Find'
              />
              <Field
                component='input'
                type='hidden'
                name='tags'
                readOnly
              />
              { this.renderTags() }
            </div>
          </div>

          <div className={[css.card, css.noMarginBottom].join(' ')}>
            <h3 className={css.cardTitle}>
                Join requirements
            </h3>
            <div className={css.subtitle}>
                Specify which requirements should be met in order to join the board.
            </div>
            <Field
              component={SelectField}
              className={css.requirementsSelect}
              name='joinRequirement'
              selectedMenuItemStyle={{ fontSize: 14 }}
              menuItemStyle={{ fontSize: 14 }}
              labelStyle={{ fontSize: 14 }}
              style={{ width: 300 }}
            >
              {
                BOARD_REQUIREMENTS_LIST.map((item) => (
                  <MenuItem key={uniqid()} value={item.index} primaryText={item.label} />
                ))
              }
            </Field>

            {
              joinRequirement === BOARD_REQUIREMENTS.SPECIFIC_LEVELS.index ? this.renderSpecificRequirementsContent() : null
            }

          </div>

          {
            joinRequirement === BOARD_REQUIREMENTS.INVITATION_ONLY.index ? null : (
              <div className={css.chartContainer}>
                <h4>How much people can join?</h4>
                <p>Check our estimates for worker and clients based on your parameters</p>
                <div className={css.chart}>
                  { this.renderDonutChart() }
                  <div className={css.chartLabel}>
                    <h2 className={css.chartLabelTitle}>{ canJoinAmount.clients + canJoinAmount.workers }</h2>
                    <p>Workers and</p>
                    <p>Clients</p>
                  </div>
                </div>
              </div>
            )
          }

          <div className={css.card}>
            <h3 className={css.cardTitle}>Job Post Fee</h3>
            <div className={css.subtitle}>Specify fee amount for posting job on the Job Board</div>
            <div className={css.cardContent}>
              <div className={css.feeInputs}>
                <Field
                  component={SelectField}
                  hintText='Fixed Fee'
                  hintStyle={{ fontStyle: 'italic' }}
                  name='fee'
                >
                  {
                    BOARD_POST_FEE_LIST.map((item) => (
                      <MenuItem key={uniqid()} value={item.index} primaryText={item.name} />
                    ))
                  }
                </Field>
                <Field
                  lineEnabled
                  className={css.match}
                  type={Input.TYPES.TEXT}
                  component={Input}
                  name='lhus'
                  mods={Input.MODS.ALIGN_LEFT}
                  placeholder='ui.createJobBoard.value'
                  floatingLabelStyle={{ visibility: 'hidden' }}
                  floatingLabelText='empty'
                  floatingLabelFixed
                />
              </div>
              <div className={css.delimiter} />
              <h3>Job Post Service Agreement</h3>
              <div><span>By default Clients will be provided with our </span><a href='/'>Standard Agreement.</a></div>
              <div className={css.delimiter} />
              <div className={css.feeActions}>
                <div className={css.feeActionsIcon}>
                  <Image
                    icon='file_upload'
                    color={Image.COLORS.BLUE}
                  />
                </div>
                <div>
                  <a href='/'>Upload Custom Agreement</a>
                </div>
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}>Visuals</h3>
            <div className={css.visuals} >
              <div className={css.visualsContainer}>
                <img src='/static/temp/become.png' alt='Logo' />
                <a href='/'>UPLOAD LOGO</a>
              </div>
              <div className={css.visualsContainer}>
                <img src='/static/temp/example_bg.jpg' alt='Background' />
                <a href='/'>UPLOAD BACKGROUND</a>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: FORM_CREATE_JOB_BOARD,
  initialValues: {
    requirements: 0,
    fee: 0,
    endorsingSkills: false,
    joinRequirement: 0,
    ratingRequirements: 0,
    verificationRequirements: 0,
  },
  validate,
})(CreateJobBoardForm)
