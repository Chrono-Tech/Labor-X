import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Field, reduxForm, propTypes } from 'redux-form'
import { Toggle, SelectField, DatePicker, TextField } from 'redux-form-material-ui'
import { MuiThemeProvider, CircularProgress, MenuItem } from 'material-ui'
import { Image, Input, Badge, Translate, NumberInput, Button, ValidatedCheckbox } from 'src/components/common'
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
    hasRequirements: PropTypes.bool,
    hasSkills: PropTypes.bool,
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
              <div>
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='intro'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.intro' />}
                />
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='responsibilities'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.responsibilities' />}
                />
                <Field
                  className={css.inputSection}
                  component={TextField}
                  name='requirements'
                  fullWidth
                  floatingLabelText={<Translate value='ui.createJob.requirements' />}
                />
              </div>
            </div>

            <div className={css.card}>
              <div className={css.cardHeading}>
                <h3><Translate value='ui.createJob.tags' /></h3>
              </div>
              <div className={cn(css.row, css.twoColumn)}>
                <Field
                  component={SelectField}
                  floatingLabelText={<Translate value='ui.createJob.area' />}
                  name='area'
                >
                  {TAG_AREAS_LIST.map(area => (
                    <MenuItem key={area.index} value={area.index} primaryText={area.name} />
                  ))}
                </Field>
                <Field
                  component={SelectField}
                  floatingLabelText={<Translate value='ui.createJob.category' />}
                  name='category'
                >
                  {TAG_CATEGORIES_LIST.map(category => (
                    <MenuItem key={category.index} value={category.index} primaryText={category.name} />
                  ))}
                </Field>
              </div>
              <div>
                <Field
                  component={SelectField}
                  floatingLabelText={<Translate value='ui.createJob.skills' />}
                  name='skills'
                  multiple
                  fullWidth
                >
                  {SKILLS_LIST.map(skill => (
                    <MenuItem key={skill.index} value={skill.index} primaryText={skill.name} />
                  ))}
                </Field>
              </div>
            </div>

            {/* <Field
              className={css.inputSection}
              component={Input}
              name='conclusion'
              label='ui.createJob.conclusion'
              placeholder='ui.createJob.conclusionPlaceholder'
              mods={Input.MODS.BOXED}
            /> */}

            <div className={css.card} style={{ padding: '3rem 0' }}>
              <div style={{ padding: '0 3rem 3rem' }}>
                <div className={css.cardHeading}>
                  <h3><Translate value='ui.createJob.jobBoard' /></h3>
                  {/*<div>*/}
                    {/*<Field*/}
                      {/*component={Toggle}*/}
                      {/*name='hasRequirements'*/}
                    {/*/>*/}
                  {/*</div>*/}
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
                  <div className={css.card} style={{boxShadow: 'none'}}>
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
                        <div className={css.hourlyRatingGraph}>
                          <img src='/static/images/create-job-average-hour-price-per-validation-level-chart.png'/>
                        </div>
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
              {!hasBudget ? null : (
                <div className={css.twoColumn}>
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
                      name='since'
                      component={DatePicker}
                      placeholder='Starts at'
                    />
                  </div>
                  <div>
                    <Field
                      name='until'
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
                  {/*
                    <div className={css.companyAddress}>
                      <Field
                        component={Checkbox}
                        name='isCompanyAddress'
                        label={<Translate value='ui.createJob.companyAddressLabel' />}
                      />
                    </div>
                  */}
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

            {/*
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
            */}

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
