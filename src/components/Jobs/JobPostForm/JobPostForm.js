import {
  Badge,
  Button,
  Calendar,
  Chip,
  FieldGroup,
  NumberInput,
  Image,
  Input,
  Paper,
  Select,
  Translate,
} from 'components/common'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Checkbox from '../../common/Checkbox/Checkbox'
import css from './JobPostForm.scss'
import validate from './validate'

const FORM_JOB_POST = 'form/jobPost'

const onSubmit = (values) => {
  console.log('--JobPostForm#onSubmit', values)
}

class JobPostForm extends React.Component {
  render () {
    const prefix = this.constructor.name
    const { handleSubmit, pristine, invalid } = this.props

    return (
      <form className={css.root} name={FORM_JOB_POST} onSubmit={handleSubmit}>
        <div className={css.headline}>
          <div className={css.headlineActions}>
            <div className={css.headlineLeft}>
              <Button
                className={css.headlineButton}
                label='terms.cancel'
                type={Button.TYPES.SUBMIT}
                mods={Button.MODS.FLAT}
              />
            </div>
            <div className={css.headlineRight}>
              <Button
                className={css.headlineButton}
                icon={Image.SETS.HELP_INVERT}
                mods={Button.MODS.FLAT}
              />
              <Button
                className={css.headlineButton}
                label='terms.done'
                type={Button.TYPES.SUBMIT}
                disabled={pristine || invalid}
                mods={Button.MODS.FLAT}
              />
            </div>
          </div>
          <div className={css.headlineContent}>
            <Field
              className={css.headlineInput}
              component={Input}
              placeholder={`${prefix}.jobHeadlinePlaceholder`}
              mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
              name='headline'
            />
          </div>
        </div>
        <Paper>
          <FieldGroup title={`${prefix}.general`}>
            <Field
              component={Input}
              name='intro'
              label={`${prefix}.intro`}
              placeholder={`${prefix}.introPlaceholder`}
              mods={Input.MODS.BOXED}
            />
            <Field
              component={Input}
              name='responsibilities'
              label={`${prefix}.responsibilities`}
              placeholder={`${prefix}.responsibilitiesPlaceholder`}
              mods={Input.MODS.BOXED}
            />
            <Field
              component={Input}
              name='workerRequirements'
              label={`${prefix}.workerRequirements`}
              placeholder={`${prefix}.workerRequirementsPlaceholder`}
              mods={Input.MODS.BOXED}
            />
            <Field
              component={Input}
              name='conclusion'
              label={`${prefix}.conclusion`}
              placeholder={`${prefix}.conclusionPlaceholder`}
              mods={Input.MODS.BOXED}
            />
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.jobBoard`}>
            <div className={[ css.row, css.boardCategory ].join(' ')}>
              <div className={css.col}>
                <Field
                  component={Select}
                  name='jobBoardCategory'
                />
              </div>
              <div className={css.col}>
                Post Fee (no-refund): LHUS 1.00 (USD 30.00)
              </div>
            </div>
            <div className={css.inject}>
              <div className={css.requirements}>
                <div className={css.requirementsTitle}><Translate value={`${prefix}.badgesTitle`} /></div>
                <div className={css.requirementsSubtitle}><Translate value={`${prefix}.badgesSubtitle`} /></div>
                <div className={css.requirementsBadges}>
                  <Badge value='1+' title='terms.rating' />
                  <Badge value='term.any' title='terms.validation' />
                  <Badge value='term.any' title='terms.endorsement' />
                  <Badge value='term.any' title='terms.categories' />
                </div>
              </div>
            </div>
            <div className={[ css.row, css.workerRating ].join(' ')}>
              <div className={css.col}>
                <Field
                  component={Select}
                  name='forceWorkerRating'
                />
                <div className={css.hourlyRating}>
                  <Translate className={css.hourlyRatingTitle} value={`${prefix}.hourlyRatingTitle`} />
                  <div className={css.hourlyRatingGraph} />
                </div>
              </div>
            </div>
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.budget`}>
            <div className={css.row}>
              <div className={css.col}>
                <Field
                  className={css.numberInput}
                  component={NumberInput}
                  name='hourlyRate'
                  title={`${prefix}.hourlyRate`}
                  subtitle='USD 60.00'
                  max={5}
                  min={0}
                />
              </div>
              <div className={css.col}>
                <Field
                  className={css.numberInput}
                  component={NumberInput}
                  name='totalHours'
                  title={`${prefix}.totalHours`}
                  subtitle={<span>USD 2,400.00<br />LHUS 80.00</span>}
                  max={40}
                  min={0}
                />
              </div>
            </div>
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.deadline`}>
            <div className={css.row}>
              <div className={css.col}>
                <Calendar title={`${prefix}.startsAt`} />
              </div>
              <div className={css.col}>
                <Calendar title={`${prefix}.deadline`} />
              </div>
            </div>
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.address`}>
            <div className={css.row}>
              <div className={css.col}>
                <Field
                  component={Checkbox}
                  name='isCompanyAddress'
                  label={`${prefix}.companyAddressLabel`}
                />
              </div>
            </div>
            <div className={css.row}>
              <div className={css.col}>
                <Field
                  component={Select}
                  name='state'
                />
              </div>
              <div className={css.col}>
                <Field
                  component={Input}
                  name='city'
                  placeholder={`${prefix}.city`}
                />
              </div>
            </div>
            <div className={css.row}>
              <div className={css.col}>
                <Field
                  component={Input}
                  name='zip'
                  placeholder={`${prefix}.zip`}
                />
              </div>
              <div className={css.col}>
                <div className={css.row}>
                  <div className={css.col}>
                    <Field
                      component={Input}
                      name='building'
                      placeholder={`${prefix}.buildingN`}
                    />
                  </div>
                  <div className={css.col}>
                    <Field
                      component={Input}
                      name='suit'
                      placeholder={`${prefix}.suit`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={css.row}>
              <div className={css.col}>
                <Field
                  component={Input}
                  name='street'
                  placeholder={`${prefix}.street`}
                />
              </div>
            </div>
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.categories`}>
            <div className={css.find}>
              <Field
                className={css.findInput}
                component={Input}
                name='searchCategory'
                placeholder='term.find'
              />
              <div className={css.chips}>
                <Chip value='Inventory' />
                <Chip value='Monetary Exchange' />
                <Chip value='Ordering Supplies' />
              </div>
            </div>
          </FieldGroup>
        </Paper>
        <Paper>
          <FieldGroup title={`${prefix}.legal`}>
            <Field
              component={Checkbox}
              name='legal'
              label={`${prefix}.legalAgreeLabel`}
            />
          </FieldGroup>
        </Paper>
      </form>
    )
  }
}

export default reduxForm({ form: FORM_JOB_POST, validate, onSubmit })(JobPostForm)
