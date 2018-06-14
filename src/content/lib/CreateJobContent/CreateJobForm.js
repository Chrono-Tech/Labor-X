import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Toggle, SelectField, DatePicker, TextField } from 'redux-form-material-ui'
import { MuiThemeProvider, CircularProgress, MenuItem } from 'material-ui'
import { Router } from 'src/routes'
import { Image, Input, Badge, Translate, NumberInput, Button, ValidatedCheckbox, Chip, Link } from 'src/components/common'
import { SignerModel, BoardModel, TAG_CATEGORIES_LIST, TAG_AREAS_LIST, SKILLS_LIST } from 'src/models'
import validate from './validate'
import css from './CreateJobForm.scss'

export const FORM_CREATE_JOB = 'form/createJob'

class CreateJobForm extends React.Component {
  static propTypes = {
    ...propTypes,
    signer: PropTypes.instanceOf(SignerModel).isRequired,
    isLoading: PropTypes.bool,
    hasBudget: PropTypes.bool,
    hasPeriod: PropTypes.bool,
    hasAddress: PropTypes.bool,
    allowCustomOffers: PropTypes.bool,
    startWorkAllowance: PropTypes.bool,
    flowType: PropTypes.number,
    boards: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel)
    ),
  }

  state = {
    hourlyRatingValue: 1,
    // stateValue: 1,
  }

  // handleChangeJobBoard = (event, index, value) => this.setState({ jobBoardValue: value })
  handleChangeHourlyRating = (event, index, value) => this.setState({ hourlyRatingValue: value })
  // handleChangeState = (event, index, value) => this.setState({ stateValue: value })

  handleBack () {
    Router.pushRoute('/opportunities')
  }

  renderBudgetWidget = () => {
    if (!this.props.flowType) return null
    return this.props.flowType === 1 ? (
      <div className={css.budgetWidget}>
        <div>
          <Field
            className={css.numberInput}
            component={NumberInput}
            name='hourlyRate'
            title='ui.createJob.hourlyRate'
            subtitle='USD 60.00'
            max={1000}
            min={0}
          />
        </div>
        <div>
          <Field
            className={css.numberInput}
            component={NumberInput}
            name='totalHours'
            title='ui.createJob.totalHours'
            subtitle={<span>USD 2,400.00<br />LHUS 80.00</span>}
            max={1000}
            min={0}
          />
        </div>
      </div>
    ) : (
      <div className={css.budgetWidget}>
        <div>
          <Field
            className={css.numberInput}
            component={NumberInput}
            name='fixedPrice'
            title='ui.createJob.fixedPrice'
            subtitle={<span>USD 2,400.00<br />LHUS 80.00</span>}
            max={1000}
            min={0}
          />
        </div>
      </div>
    )
  }

  render () {
    const { isLoading, boards, hasBudget, hasPeriod, hasAddress } = this.props

    return (
      <MuiThemeProvider>
        <div className={css.main}>
          <div className={css.title}>
            <div className={css.titleBar}>
              <Button
                className={css.cancelButton}
                icon={Image.SETS.ARROW_BACK}
                type={Button.TYPES.SUBMIT}
                mods={Button.MODS.FLAT}
                onClick={this.handleBack}
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
                  type={Button.TYPES.SUBMIT}
                  mods={Button.MODS.FLAT}
                  disabled={isLoading}
                  onClick={this.props.handleSubmit}
                />
              </div>
            </div>
          </div>
          <form
            className={css.content}
            onSubmit={this.props.handleSubmit}
          >
            <div className={css.headline}>
              <Field
                className={css.boardHeadline}
                component={Input}
                placeholder='ui.createJob.jobHeadlinePlaceholder'
                mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
                name='name'
              />
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.general' /></h3>
              </div>
              <div>
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='intro'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.intro' />}
                  hintText={<Translate value='ui.createJob.introPlaceholder' />}
                />
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='responsibilities'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.responsibilities' />}
                  hintText={<Translate value='ui.createJob.responsibilitiesPlaceholder' />}
                />
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='requirements'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.requirements' />}
                  hintText={<Translate value='ui.createJob.requirementsPlaceholder' />}
                />
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='conclusion'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.conclusion' />}
                  hintText={<Translate value='ui.createJob.conclusionPlaceholder' />}
                />
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.jobBoard' /></h3>
              </div>
              <div>
                <div className={css.twoColumn}>
                  <Field
                    component={SelectField}
                    name='board'
                    hintText={<Translate value='ui.createJob.jobBoard' />}
                  >
                    {boards.map(board => (
                      <MenuItem key={board.key} value={board.id} primaryText={board.ipfs.name} />
                    ))}
                  </Field>
                  <div className={css.postFee}>
                    Post Fee (no-refund): LHUS 1.00 (USD 30.00)
                  </div>
                </div>
                <div>
                  <div className={css.badgesContainer}>
                    <h4><Translate value='ui.createJob.badgesTitle' /></h4>
                    <p><Translate value='ui.createJob.badgesSubtitle' /></p>
                    <div className={css.badges}>
                      <Badge value='1+' title='terms.rating' />
                      <Badge value='term.any' title='terms.validation' />
                      <Badge value='term.any' title='terms.endorsement' />
                      <Badge value='term.any' title='terms.categories' />
                    </div>
                  </div>
                  <div className={css.hourlyRatingColumn}>
                    <Field
                      component={SelectField}
                      hintText='Force Worker Rating'
                      hintStyle={{ fontStyle: 'italic' }}
                      value={this.state.hourlyRatingValue}
                      onChange={this.handleChangeHourlyRating}
                      name='hourlyRating'
                    >
                      <MenuItem value={1} primaryText='Force Worker Rating' />
                      <MenuItem value={2} primaryText='Force Worker Rating' />
                      <MenuItem value={3} primaryText='Force Worker Rating' />
                    </Field>
                    <div className={css.hourlyRating}>
                      <Translate className={css.hourlyRatingTitle} value='ui.createJob.hourlyRatingTitle' />
                      <img className={css.hourlyRatingGraph} src='/static/temp/avearage_rate.png' alt='avearage_rate' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.budget' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='hasBudget'
                    parse={Boolean}
                  />
                </div>
              </div>
              <div className={css.description}>
                If you&apos;re not sure about the job budget yet you may set the module OFF.
                You may also select an hourly-based or fixed budget. In addition you may specify if the given budget is approximate.
                You&apos;ll be able to enter the budget before sending an offer to a worker or the offer is declined.
                If you&apos;d like to select a worker service please use <Link href='/hire-worker'>Hire a Worker</Link>.
              </div>
              {!hasBudget ? null : (
                <div>
                  <Field
                    component={SelectField}
                    name='flowType'
                    hintText={<Translate value='ui.createJob.flowType' />}
                  >
                    <MenuItem value={1} primaryText='Hourly Based' />
                    <MenuItem value={2} primaryText='Fixed price' />
                  </Field>
                  { this.renderBudgetWidget() }

                  <Field
                    component={ValidatedCheckbox}
                    name='budgetApproximate'
                    label={<Translate value='ui.createJob.budgetApproximateLabel' />}
                  />
                </div>
              )}
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.allowCustomOffers' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='allowCustomOffers'
                    parse={Boolean}
                  />
                </div>
              </div>
              <div className={css.description}>
                If you&apos;d like to receive custom offers from Workers enable this section and
                you&apos;ll be able to review these offers along with all other Job Applicants.
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.startWorkAllowance' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='startWorkAllowance'
                    parse={Boolean}
                  />
                </div>
              </div>
              <div className={css.description}>
                Set this option ON if you&apos;d like to confirm the start of the work. Note that without your confirmation the Worker will not be able to track time.
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.deadline' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='hasPeriod'
                  />
                </div>
              </div>
              <div className={css.description}>
                If disabled selected Worker will able to set start and end dates.
                Time the job can be started will be set by the Worker in both cases.
              </div>
              {!hasPeriod ? null : (
                <div className={css.twoColumn}>
                  <div>
                    <Field
                      name='since'
                      component={DatePicker}
                      placeholder='Starts at'
                    />
                    <img className={css.calendar} src='/static/temp/calendar.png' alt='calendar' />
                  </div>
                  <div>
                    <Field
                      name='until'
                      component={DatePicker}
                      placeholder='Deadline'
                    />
                    <img className={css.calendar} src='/static/temp/calendar.png' alt='calendar' />
                  </div>
                </div>
              )}
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.address' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='hasAddress'
                  />
                </div>
              </div>
              {!hasAddress ? null : (
                <div>
                  <Field
                    className={css.addressCheckbox}
                    component={ValidatedCheckbox}
                    name='companyAddress'
                    label={<Translate value='ui.createJob.companyAddressLabel' />}
                  />
                  <div className={css.twoColumn}>
                    <div>
                      <Field
                        lineEnabled
                        className={css.inputSection}
                        type={Input.TYPES.TEXT}
                        component={Input}
                        name='state'
                        mods={Input.MODS.ALIGN_LEFT}
                        placeholder='ui.createJob.state'
                      />
                      <Field
                        lineEnabled
                        className={css.inputSection}
                        type={Input.TYPES.TEXT}
                        component={Input}
                        name='zip'
                        mods={Input.MODS.ALIGN_LEFT}
                        placeholder='ui.createJob.zip'
                      />
                      <Field
                        className={css.inputSection}
                        component={Input}
                        name='street'
                        lineEnabled
                        type={Input.TYPES.TEXT}
                        mods={Input.MODS.ALIGN_LEFT}
                        placeholder='ui.createJob.street'
                      />
                    </div>
                    <div>
                      <Field
                        className={css.inputSection}
                        component={Input}
                        name='city'
                        lineEnabled
                        type={Input.TYPES.TEXT}
                        mods={Input.MODS.ALIGN_LEFT}
                        placeholder='ui.createJob.city'
                      />
                      <div className={css.twoColumn}>
                        <Field
                          className={css.inputSection}
                          component={Input}
                          name='building'
                          lineEnabled
                          type={Input.TYPES.TEXT}
                          mods={Input.MODS.ALIGN_LEFT}
                          placeholder='ui.createJob.buildingN'
                        />
                        <Field
                          className={css.inputSection}
                          component={Input}
                          name='suit'
                          lineEnabled
                          type={Input.TYPES.TEXT}
                          mods={Input.MODS.ALIGN_LEFT}
                          placeholder='ui.createJob.suit'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.skills' /></h3>
              </div>
              <div className={css.tagsRow}>
                <Field
                  className={css.find}
                  component={TextField}
                  name='searchSkill'
                  hintText={<Translate value='terms.find' />}
                />
                <div className={css.tags}>
                  {SKILLS_LIST.map(e => (
                    <Chip value={e.name} key={e.index} />
                  ))}
                </div>
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.area' /></h3>
              </div>
              <div className={css.tagsRow}>
                <Field
                  className={css.find}
                  component={TextField}
                  name='searchArea'
                  hintText={<Translate value='terms.find' />}
                />
                <div className={css.tags}>
                  {TAG_AREAS_LIST.map(e => (
                    <Chip value={e.name} key={e.index} />
                  ))}
                </div>
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.category' /></h3>
              </div>
              <div className={css.tagsRow}>
                <Field
                  className={css.find}
                  component={TextField}
                  name='searchCategory'
                  hintText={<Translate value='terms.find' />}
                />
                <div className={css.tags}>
                  {TAG_CATEGORIES_LIST.map(e => (
                    <Chip value={e.name} key={e.index} />
                  ))}
                </div>
              </div>
            </div>

            <div className={css.card}>
              <Field
                component={ValidatedCheckbox}
                name='legal'
                label={<Translate value='ui.createJob.legalAgreeLabel' />}
              />
            </div>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default reduxForm({
  form: FORM_CREATE_JOB,
  validate,
})(CreateJobForm)
