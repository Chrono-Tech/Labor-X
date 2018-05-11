import { Image, Input, Chip, Badge, Checkbox, Translate, NumberInput, Calendar, Button } from 'components/common'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import validate from './validate'
import css from './CreateJob.scss'

const FORM_CREATE_JOB = 'form/createJob'

const onSubmit = (values) => {
  // eslint-disable-next-line no-console
  console.log('--CreateJobForm#onSubmit', values)
}

class CreateJob extends React.Component {
  state = {
    jobBoardValue: 1,
    hourlyRatingValue: 1,
    stateValue: 1,
  };

  handleChangeJobBoard = (event, index, value) => this.setState({ jobBoardValue: value });
  handleChangeHourlyRating = (event, index, value) => this.setState({ hourlyRatingValue: value });
  handleChangeState = (event, index, value) => this.setState({ stateValue: value });

  render () {
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
                <Button
                  className={css.doneButton}
                  label='terms.done'
                  type={Button.TYPES.SUBMIT}
                  mods={Button.MODS.FLAT}
                />
              </div>
            </div>
          </div>
          <form className={css.content}>
            <div className={css.headline}>
              <Field
                className={css.boardHeadline}
                component={Input}
                placeholder='ui.createJob.jobHeadlinePlaceholder'
                mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
                name='headline'
              />
            </div>

            <div className={css.card}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.general' /></h3>
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
                name='workerRequirements'
                label='ui.createJob.workerRequirements'
                placeholder='ui.createJob.workerRequirementsPlaceholder'
                mods={Input.MODS.BOXED}
              />
              <Field
                className={css.inputSection}
                component={Input}
                name='conclusion'
                label='ui.createJob.conclusion'
                placeholder='ui.createJob.conclusionPlaceholder'
                mods={Input.MODS.BOXED}
              />
            </div>

            <div className={[css.card, css.noMarginBottom].join(' ')}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.jobBoard' /></h3>
              <div className={css.twoColumn}>
                <Field
                  component={SelectField}
                  value={this.state.jobBoardValue}
                  onChange={this.handleChangeJobBoard}
                  name='jobBoard'
                >
                  <MenuItem value={1} primaryText='General' />
                  <MenuItem value={2} primaryText='Getting Started' />
                  <MenuItem value={3} primaryText='Become Involved' />
                </Field>
                <div className={css.postFee}>
                Post Fee (no-refund): LHUS 1.00 (USD 30.00)
                </div>
              </div>
            </div>
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
                  hintStyle={{ 'font-style': 'italic' }}
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

            <div className={css.card}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.budget' /></h3>
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
            </div>

            <div className={css.card}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.deadline' /></h3>
              <div className={css.twoColumn}>
                <div>
                  <Calendar title='ui.createJob.startsAt' />
                </div>
                <div>
                  <Calendar title='ui.createJob.deadline' />
                </div>
              </div>
            </div>

            <div className={css.card}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.address' /></h3>
              <div className={css.companyAddress}>
                <Field
                  component={Checkbox}
                  name='isCompanyAddress'
                  label='ui.createJob.companyAddressLabel'
                />
              </div>
              <div className={css.twoColumn}>
                <div>
                  <div className={css.selectSection}>
                    <Field
                      component={SelectField}
                      fullWidth
                      hintText='State'
                      hintStyle={{ 'font-style': 'italic' }}
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

            <div className={css.card}>
              <h3 className={css.cardTitle}><Translate value='ui.createJob.categories' /></h3>
              <div className={css.categoriesRow}>
                <Field
                  lineEnabled
                  className={css.find}
                  component={Input}
                  name='searchCategory'
                  placeholder='term.find'
                  mods={Input.MODS.ALIGN_LEFT}
                />
                <Chip value='Inventory' />
                <Chip value='Monetary Exchange' />
                <Chip value='Ordering Supplies' />
              </div>
            </div>
            <div className={css.card}>
              <Field
                component={Checkbox}
                name='legal'
                label='ui.createJob.legalAgreeLabel'
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
  onSubmit,
  initialValues: {
    jobBoard: 1,
  },
})(CreateJob)
