import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import cn from 'classnames'
import DonutChart from "react-svg-donut-chart"
import { Field, reduxForm } from 'redux-form'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import { Select, TextField } from 'redux-form-material-ui-next'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Autosuggest from 'react-autosuggest'

import { Image, Chip, Button, Icon, ValidatedCheckbox, RadioIcon, VerificationLevelSelector } from 'components/common'
import {
  TagModel,
  TAGS_LIST,
  TAG_AREAS_LIST,
  TAG_CATEGORIES_LIST,
  BOARD_REQUIREMENTS_LIST,
  BOARD_REQUIREMENTS,
  BOARD_POST_FEES,
  BOARD_POST_FEE_LIST,
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
      tagSuggestions: [],
      tagValue: '',
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

  getTagsList () {
    return TAGS_LIST
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    const tagsWithoutSelected = this.getTagsList().filter(tag => !this.state.tags.find(t => t.index === tag.index))

    return inputLength === 0 ? [] : tagsWithoutSelected.filter(tag =>
      tag.name.toLowerCase().indexOf(inputValue) !== -1
    )
  }

  getSuggestionValue = suggestion => {
    const { change } = this.props
    if (suggestion instanceof TagModel && !this.state.tags.find(item => item.index === suggestion.index)) {

      const newTags = [...this.state.tags, suggestion]

      this.setState({ tags: newTags }, () => {
        change('tags', newTags)
      })
    }
    return ''
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      tagSuggestions: this.getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      tagSuggestions: [],
    })
  }

  onSuggestionChange = (event, { newValue }) => {
    this.setState({
      tagValue: newValue,
    })
  }

  onRemoveTag (tag) {
    const { tags } = this.state
    const { change } = this.props

    const newTags = tags.filter(item => item.index !== tag.index)

    this.setState({ tags: newTags })

    change('tags', newTags)
  }

  renderSuggestion = suggestion => <div>{suggestion.name}</div>

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
              <FormControlLabel
                className={css.field}
                control={<Field color='primary' component={ValidatedCheckbox} name='endorsingSkills' />}
                label='Worker skills must be endorsed'
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
                  ? <Icon size={28} icon={Icon.ICONS.FILE} color={Icon.COLORS.BLUE} />
                  : this.state.agreement.loading
                    ? <CircularProgress size={26} thickness={2} />
                    : <Icon size={28} icon={Icon.ICONS.UPLOAD} color={Icon.COLORS.BLUE} />
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
                  : <Icon className={css.visual} size={28} icon={Icon.ICONS.UPLOAD} color={Icon.COLORS.BLUE} />
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
                  : <Icon className={css.visual} size={28} icon={Icon.ICONS.UPLOAD} color={Icon.COLORS.BLUE} />
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
            <Link className={css.backBtn} href='/dashboard'>
              <Image icon={Image.SETS.ARROW_BACK.icon} />
            </Link>
             
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
              fullWidth
              className={css.boardHeadline}
              component={TextField}
              placeholder='Enter Job Board Headline'
              name='name'
              InputProps={{ disableUnderline: true, classes: { root: css.boardHeadlineLabel } }}
            />
          </div>

          <div className={css.card}>
            <div className={css.twoColumn}>
              <div>
                <h3 className={css.cardTitle}>Area</h3>
                <div className={css.flexRow}>
                  <Field
                    className={css.selectField}
                    displayEmpty
                    name='tagsArea'
                    component={Select}
                  >
                    <MenuItem value='' disabled>Select area</MenuItem>
                    {
                      TAG_AREAS_LIST.map((item) => (
                        <MenuItem key={item.index} value={item.index}>{item.name}</MenuItem>
                      ))
                    }
                  </Field>
                </div>
              </div>

              <div>
                <h3 className={css.cardTitle}>Categories</h3>
                <div className={css.flexRow}>
                  <Field
                    className={css.selectField}
                    displayEmpty
                    name='tagsCategory'
                    component={Select}
                  >
                    <MenuItem value='' disabled>Select category</MenuItem>
                    {
                      TAG_CATEGORIES_LIST.map((item) => (
                        <MenuItem key={item.index} value={item.index}>{item.name}</MenuItem>
                      ))
                    }
                  </Field>
                </div>
              </div>
            </div>
            <h3 className={cn(css.cardTitle, css.skillsRow)}>Skills</h3>
            <div className={css.flexRow}>

              <Autosuggest
                theme={{
                  input: css.autocompleteInput,
                  suggestionsContainer: css.suggestionsContainer,
                  suggestion: css.autocompleteSuggestion,
                }}
                suggestions={this.state.tagSuggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                  placeholder: 'Find',
                  value: this.state.tagValue,
                  onChange: this.onSuggestionChange,
                }}
              />
              { formErrors.tags && submitFailed ? <div>{formErrors.tags}</div> : null}

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
              component={Select}
              className={css.requirementsSelect}
              name='joinRequirement'
            >
              {
                BOARD_REQUIREMENTS_LIST.map((item) => (
                  <MenuItem key={item.index} value={item.index}>{item.label}</MenuItem>
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
                  component={Select}
                  name='fee'
                >
                  {
                    BOARD_POST_FEE_LIST.map((item) => (
                      <MenuItem key={item.index} value={item.index}>{item.label}</MenuItem>
                    ))
                  }
                </Field>
                <Field
                  className={css.match}
                  component={TextField}
                  placeholder='LHUS 0.00'
                  name='lht'
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
    fee: BOARD_POST_FEES.FIXED_FEE.index,
    endorsingSkills: false,
    joinRequirement: 0,
    ratingRequirements: 0,
    verificationRequirements: 0,
  },
  validate,
})(CreateJobBoardForm)
