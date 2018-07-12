import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import cn from 'classnames'
import DonutChart from "react-svg-donut-chart"
import AutoComplete from 'material-ui/AutoComplete'
import { Field, reduxForm } from 'redux-form'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MenuItem } from 'material-ui/Menu'
import { SelectField, TextField } from 'redux-form-material-ui'

import { Image, Chip, Input, Button, Icon, Checkbox, RadioIcon, VerificationLevelSelector, Translate } from 'components/common'
import {
  TagModel,
  TAGS_LIST,
  TAG_AREAS_LIST,
  TAG_CATEGORIES_LIST,
  BOARD_REQUIREMENTS_LIST,
  BOARD_REQUIREMENTS,
  BOARD_POST_FEES,
} from 'src/models'

import css from './CreateJobBoardForm.scss'
import validate from "./validate"

const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

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
    logo: PropTypes.string,
    background: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      tags: [],
      agreement: {
        loading: false,
        loaded: false,
        filename: null,
      },
      logo: {
        loading: false,
        loaded: false,
        filename: null,
      },
      background: {
        loading: false,
        loaded: false,
        filename: null,
      },
    }
  }

  handleUpload = (e, field) => {
    const { change } = this.props
    const file = e.target.files[0]
    const reader  = new FileReader()
    this.setState({ [field]: {
      loading: true,
      loaded: false,
      filename: file.name,
    },
    })

    reader.addEventListener('load', () => {
      this.setState(prevState => ({ [field]: {
        loading: false,
        loaded: true,
        filename: prevState[field].filename,
      },
      }))
      change(field, reader.result)
    }, false)

    reader.readAsDataURL(file)
  }

  handleUploadAgreement = (e) => {
    this.handleUpload(e, 'agreement')
  }

  handleUploadLogo = (e) => {
    this.handleUpload(e, 'logo')
  }

  handleUploadBg = (e) => {
    this.handleUpload(e, 'background')
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

  renderAgreement = () => {
    return (
      <div className={css.card}>
        <h3 className={css.cardTitle}>Legal Documents</h3>
        <div className={css.subtitle}>
        By default Users accepting our
          <a href='/static/docs/laborx_standart_agreement.pdf'> Standard Terms and Conditions. </a>
        If you need to have different Terms and Conditions, please upload it below.
        Note that our team will need to review your document before the board publishes.
        </div>
        <div className={css.cardContent}>
          <label
            htmlFor='uploadAgreement'
            className={css.agreementActions}
          >
            <div className={css.agreementActionsIcon}>
              {
                this.state.agreement.loaded
                  ? <Icon size={28} icon={Icon.ICONS.FILE} color={Image.COLORS.BLUE} />
                  : this.state.agreement.loading
                    ? <CircularProgress size={26} thickness={2} />
                    : <Icon size={28} icon={Icon.ICONS.UPLOAD} color={Image.COLORS.BLUE} />
              }

            </div>
            {
              this.state.agreement.filename == null
                ? <p>Upload custom Terms and Conditions</p>
                : <p>{ this.state.agreement.filename  }</p>
            }
          </label>
          <input className={css.agreementInput} type='file' id='uploadAgreement' onChange={this.handleUploadAgreement} />
          <Field component='input' type='hidden' name='agreement' />
        </div>
      </div>
    )
  }

  renderVisuals = () => {
    const { logo, background } = this.props
    return (
      <div className={css.card}>
        <h3 className={css.cardTitle}>Visuals</h3>
        <div className={css.visuals} >
          <label
            className={css.visualsContainer}
            htmlFor='uploadLogo'
          >
            {
              this.state.logo.loaded
                ? <img className={css.visual} src={logo} alt='Logo' />
                : this.state.logo.loading
                  ? <CircularProgress className={css.visual} size={26} thickness={2} />
                  : <Icon className={css.visual} size={28} icon={Icon.ICONS.UPLOAD} color={Image.COLORS.BLUE} />
            }

            {
              this.state.logo.filename === null
                ? <p>UPLOAD LOGO</p>
                : <p>{this.state.logo.filename}</p>
            }
          </label>
          <input className={css.visualInput} type='file' id='uploadLogo' onChange={this.handleUploadLogo} />
          <Field component='input' type='hidden' name='logo' />

          <label
            className={css.visualsContainer}
            htmlFor='uploadBg'
          >
            {
              this.state.background.loaded
                ? <img className={css.visual} src={background} alt='Background' />
                : this.state.background.loading
                  ? <CircularProgress className={css.visual} size={26} thickness={2} />
                  : <Icon className={css.visual} size={28} icon={Icon.ICONS.UPLOAD} color={Image.COLORS.BLUE} />
            }

            {
              this.state.background.filename === null
                ? <p>UPLOAD BACKGROUND</p>
                : <p>{this.state.background.filename}</p>
            }
          </label>
          <input className={css.visualInput} type='file' id='uploadBg' onChange={this.handleUploadBg} />
          <Field component='input' type='hidden' name='background' />
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
            <div className={css.twoColumn}>
              <div>
                <h3 className={css.cardTitle}>Area</h3>
                <div className={css.flexRow}>
                  <Field
                    component={SelectField}
                    name='tagsArea'
                    selectedMenuItemStyle={{ fontSize: 14 }}
                    menuItemStyle={{ fontSize: 14 }}
                    labelStyle={{ fontSize: 14 }}
                    style={{ width: 300 }}
                    hintText='Select area'
                  >
                    {
                      TAG_AREAS_LIST.map((item) => (
                        <MenuItem key={uniqid()} value={item} primaryText={item.name} />
                      ))
                    }
                  </Field>
                </div>
              </div>

              <div>
                <h3 className={css.cardTitle}>Categories</h3>
                <div className={css.flexRow}>
                  <Field
                    component={SelectField}
                    name='tagsCategory'
                    selectedMenuItemStyle={{ fontSize: 14 }}
                    menuItemStyle={{ fontSize: 14 }}
                    labelStyle={{ fontSize: 14 }}
                    style={{ width: 300 }}
                    hintText='Select category'
                  >
                    {
                      TAG_CATEGORIES_LIST.map((item) => (
                        <MenuItem key={uniqid()} value={item} primaryText={item.name} />
                      ))
                    }
                  </Field>
                </div>
              </div>
            </div>
            <h3 className={cn(css.cardTitle, css.skillsRow)}>Skills</h3>
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

          <div className={cn([
            css.card,
            joinRequirement === BOARD_REQUIREMENTS.INVITATION_ONLY.index ? null : css.noMarginBottom ])}
          >
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
                    <MenuItem value={BOARD_POST_FEES.FIXED_FEE} primaryText={BOARD_POST_FEES.FIXED_FEE.label} />
                  }
                </Field>
                <Field
                  className={css.match}
                  component={TextField}
                  name='lhus'
                  hintText={<Translate value='ui.createJobBoard.value' />}
                />
              </div>
            </div>
          </div>

          { this.renderAgreement() }

          { this.renderVisuals() }

        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: FORM_CREATE_JOB_BOARD,
  initialValues: {
    requirements: 0,
    fee: BOARD_POST_FEES.FIXED_FEE,
    endorsingSkills: false,
    joinRequirement: 0,
    ratingRequirements: 0,
    verificationRequirements: 0,
  },
  validate,
})(CreateJobBoardForm)
