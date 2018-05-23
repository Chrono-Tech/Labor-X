import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Toggle, SelectField, Checkbox, DatePicker } from 'redux-form-material-ui'
import { MuiThemeProvider, CircularProgress, MenuItem } from 'material-ui'
import { Image, Input, Chip, Badge, Translate, NumberInput, Button } from 'src/components/common'
import { SignerModel, BoardModel } from 'src/models'
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
    hasRequirements: PropTypes.bool,
    hasSkills: PropTypes.bool,
    boards: PropTypes.arrayOf(
      PropTypes.instanceOf(BoardModel)
    ),
  }

  state = {
    hourlyRatingValue: 1,
    stateValue: 1,
  }

  // handleChangeJobBoard = (event, index, value) => this.setState({ jobBoardValue: value })
  handleChangeHourlyRating = (event, index, value) => this.setState({ hourlyRatingValue: value })
  handleChangeState = (event, index, value) => this.setState({ stateValue: value })

  render () {
    const { isLoading, boards, hasBudget, hasPeriod, hasAddress, hasRequirements, hasSkills } = this.props
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
              <Field
                className={css.inputSection}
                component={Input}
                name='intro'
                label='ui.createJob.intro'
                placeholder='ui.createJob.introPlaceholder'
                mods={Input.MODS.BOXED}
              />
              <Field
                className={css.inputSection}
                component={Input}
                name='responsibilities'
                label='ui.createJob.responsibilities'
                placeholder='ui.createJob.responsibilitiesPlaceholder'
                mods={Input.MODS.BOXED}
              />
              <Field
                className={css.inputSection}
                component={Input}
                name='requirements'
                label='ui.createJob.workerRequirements'
                placeholder='ui.createJob.workerRequirementsPlaceholder'
                mods={Input.MODS.BOXED}
              />
              {/* <Field
                className={css.inputSection}
                component={Input}
                name='conclusion'
                label='ui.createJob.conclusion'
                placeholder='ui.createJob.conclusionPlaceholder'
                mods={Input.MODS.BOXED}
              /> */}
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.jobBoard' /></h3>
                <div>
                  <Field
                    component={Toggle}
                    name='hasRequirements'
                  />
                </div>
              </div>
              <div>
                <div className={css.twoColumn}>
                  <Field
                    component={SelectField}
                    name='boardId'
                  >
                    {boards.map(board => (
                      <MenuItem key={board.key} value={board.id} primaryText={board.ipfs.name} />
                    ))}
                  </Field>
                  <div className={css.postFee}>
                    Post Fee (no-refund): LHUS 1.00 (USD 30.00)
                  </div>
                </div>
                {!hasRequirements ? null : (
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
                    <div className={css.card}>
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
                          <div className={css.hourlyRatingGraph} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
              {!hasBudget ? null : (
                <div className={css.twoColumn}>
                  <div>
                    <Field
                      className={css.numberInput}
                      component={NumberInput}
                      name='hourlyRate'
                      title='ui.createJob.hourlyRate'
                      subtitle='USD 60.00'
                      max={5}
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
                      max={40}
                      min={0}
                    />
                  </div>
                </div>
              )}
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
              {!hasPeriod ? null : (
                <div className={css.twoColumn}>
                  <div>
                    <Field
                      name='periodStart'
                      component={DatePicker}
                      placeholder='Starts at'
                    />
                  </div>
                  <div>
                    <Field
                      name='periodEnd'
                      component={DatePicker}
                      placeholder='Deadline'
                    />
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
                  <div className={css.companyAddress}>
                    <Field
                      component={Checkbox}
                      name='isCompanyAddress'
                      label={<Translate value='ui.createJob.companyAddressLabel' />}
                    />
                  </div>
                  <div className={css.twoColumn}>
                    <div>
                      <div className={css.selectSection}>
                        <Field
                          component={SelectField}
                          fullWidth
                          hintText='State'
                          hintStyle={{ fontStyle: 'italic' }}
                          value={this.state.stateValue}
                          onChange={this.handleChangeState}
                          name='state'
                        >
                          <MenuItem value={1} primaryText='State' />
                          <MenuItem value={2} primaryText='State' />
                          <MenuItem value={3} primaryText='State' />
                        </Field>
                      </div>
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
                <div>
                  <Field
                    component={Toggle}
                    name='hasSkills'
                  />
                </div>
              </div>
              {!hasSkills ? null : (
                <div className={css.skillsRow}>
                  <Field
                    lineEnabled
                    className={css.find}
                    component={Input}
                    name='searchSkill'
                    placeholder='term.find'
                    mods={Input.MODS.ALIGN_LEFT}
                  />
                  <Chip value='Inventory' />
                  <Chip value='Monetary Exchange' />
                  <Chip value='Ordering Supplies' />
                </div>
              )}
            </div>

            <div className={css.card}>
              <Field
                component={Checkbox}
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
