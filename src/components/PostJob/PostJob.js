import { Image, Input, Chip, Badge, Checkbox, Translate, Select, NumberInput, Calendar, Button } from 'components/common'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import css from './PostJob.scss'
import validate from './validate'

const FORM_JOB_POST = 'form/jobPost'

const onSubmit = (values) => {
  console.log('--JobPostForm#onSubmit', values)
}

class PostJob extends React.Component {
  render () {
    return (
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
            <h1 className={css.boardHeadline}><Translate value='ui.postJob.jobHeadlinePlaceholder' /></h1>
            {/* <Field
              component={Input}
              placeholder='ui.postJob.jobHeadlinePlaceholder'
              mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
              name='headline'
            /> */}
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.general' /></h3>
            <Field
              className={css.inputSection}
              component={Input}
              name='intro'
              label='ui.postJob.intro'
              placeholder='ui.postJob.introPlaceholder'
              mods={Input.MODS.BOXED}
            />
            <Field
              className={css.inputSection}
              component={Input}
              name='responsibilities'
              label='ui.postJob.responsibilities'
              placeholder='ui.postJob.responsibilitiesPlaceholder'
              mods={Input.MODS.BOXED}
            />
            <Field
              className={css.inputSection}
              component={Input}
              name='workerRequirements'
              label='ui.postJob.workerRequirements'
              placeholder='ui.postJob.workerRequirementsPlaceholder'
              mods={Input.MODS.BOXED}
            />
            <Field
              className={css.inputSection}
              component={Input}
              name='conclusion'
              label='ui.postJob.conclusion'
              placeholder='ui.postJob.conclusionPlaceholder'
              mods={Input.MODS.BOXED}
            />
          </div>

          <div className={[css.card, css.noMarginBottom].join(' ')}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.jobBoard' /></h3>
            <div className={css.twoColumn}>
              <Field
                component={Select}
                name='jobBoardCategory'
              />
              <div>
                Post Fee (no-refund): LHUS 1.00 (USD 30.00)
              </div>
            </div>
          </div>
          <div className={css.badgesContainer}>
            <h4><Translate value='ui.postJob.badgesTitle' /></h4>
            <p><Translate value='ui.postJob.badgesSubtitle' /></p>
            <div className={css.badges}>
              <Badge value='1+' title='terms.rating' />
              <Badge value='term.any' title='terms.validation' />
              <Badge value='term.any' title='terms.endorsement' />
              <Badge value='term.any' title='terms.categories' />
            </div>
          </div>
          <div className={css.card}>
            <div className={css.col}>
              <Field
                component={Select}
                name='forceWorkerRating'
              />
              <div className={css.hourlyRating}>
                <Translate className={css.hourlyRatingTitle} value='ui.postJob.hourlyRatingTitle' />
                <div className={css.hourlyRatingGraph} />
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.budget' /></h3>
            <div className={css.twoColumn}>
              <div>
                <Field
                  className={css.numberInput}
                  component={NumberInput}
                  name='hourlyRate'
                  title='ui.postJob.hourlyRate'
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
                  title='ui.postJob.totalHours'
                  subtitle={<span>USD 2,400.00<br />LHUS 80.00</span>}
                  max={40}
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.deadline' /></h3>
            <div className={css.twoColumn}>
              <div>
                <Calendar title='ui.postJob.startsAt' />
              </div>
              <div>
                <Calendar title='ui.postJob.deadline' />
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.address' /></h3>
            <div className={css.companyAddress}>
              <Field
                component={Checkbox}
                name='isCompanyAddress'
                label='ui.postJob.companyAddressLabel'
              />
            </div>
            <div className={css.twoColumn}>
              <div>
                <div className={css.inputSection}>
                  <Field
                    component={Select}
                    name='state'
                    lineEnabled
                    type={Input.TYPES.TEXT}
                    placeholder='ui.postJob.state'
                  />
                </div>
                <Field
                  className={css.inputSection}
                  component={Input}
                  name='zip'
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='ui.postJob.zip'
                />
                <Field
                  className={css.inputSection}
                  component={Input}
                  name='street'
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='ui.postJob.street'
                />
              </div>
              <div>
                <Field
                  className={css.inputSection}
                  component={Input}
                  name='city'
                  lineEnabled
                  type={Input.TYPES.TEXT}
                  placeholder='ui.postJob.city'
                />
                <div className={css.twoColumn}>
                  <Field
                    className={css.inputSection}
                    component={Input}
                    name='building'
                    lineEnabled
                    type={Input.TYPES.TEXT}
                    placeholder='ui.postJob.buildingN'
                  />
                  <Field
                    className={css.inputSection}
                    component={Input}
                    name='suit'
                    lineEnabled
                    type={Input.TYPES.TEXT}
                    placeholder='ui.postJob.suit'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.card}>
            <h3 className={css.cardTitle}><Translate value='ui.postJob.categories' /></h3>
            <div className={css.categoriesRow}>
              <Field
                className={css.find}
                component={Input}
                name='searchCategory'
                placeholder='term.find'
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
              label='ui.postJob.legalAgreeLabel'
            />
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({ form: FORM_JOB_POST, validate, onSubmit })(PostJob)
