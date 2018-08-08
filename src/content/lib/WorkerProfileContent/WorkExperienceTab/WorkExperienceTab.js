import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import Collapsible from 'react-collapsible'
import Grid from '@material-ui/core/Grid'
import { Icon, Button } from 'src/components/common'
import DatePickerField from 'src/components/DatePickerField'
import css from './WorkExperienceTab.scss'

export default class WorkExperienceTab extends React.Component {
  static propTypes = {
    onRemoveExperience: PropTypes.func,
  }

  state = {
  }

  handlRemoveExperience = (index) => {
    this.props.onRemoveExperience(index)
  }

  renderExperiences = ({ fields }) => {
    return (
      <div>
        {fields.map((experience, index) => this.renderExperienceCard({ experience, index, fields }))}
      </div>
    )
  }

  renderUpgardeTitle () {
    return (
      <div className={css.upgradeTitle}>
        <Icon
          icon={Icon.ICONS.SECURITY_UPGRADE}
          color={Icon.COLORS.RED}
          size={36}
        />
        <h3>Upgrade validation level</h3>
      </div>
    )
  }

  renderExperienceCard = ({ experience, index }) => {
    return (
      <div className={css.experienceBlock} key={experience}>
        <div className={css.experienceBlockContent}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Field
                fullWidth
                component={TextField}
                name={`${experience}.organization`}
                label='Organisation'
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                openToYearSelection
                name={`${experience}.since`}
                component={DatePickerField}
                label='From'
                // eslint-disable-next-line react/jsx-no-bind
                format={(value) => value === '' ? null : value}
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                openToYearSelection
                name={`${experience}.until`}
                component={DatePickerField}
                label='To'
                // eslint-disable-next-line react/jsx-no-bind
                format={(value) => value === '' ? null : value}
              />
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name={`${experience}.responsibilities`}
                label='List your responsibilities here'
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </div>
        <div className={css.removeBlock} onClick={() => this.handlRemoveExperience(index)}>
          <Icon
            icon={Icon.ICONS.DELETE}
            color={Icon.COLORS.GREY30}
            size={28}
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={css.content}>
        <FieldArray name='employments' component={this.renderExperiences} />
        {false && (
          <Collapsible classParentString={css.upgradeBlock} trigger={this.renderUpgardeTitle()} >
            <div className={css.description}>
              <p>Upload any documents which can prove that the entered information is valid. Note that changing and saving information will require validation re-submit.</p>
            </div>
            <div className={css.documents}>
              <div className={css.documentEntry}>
                <Icon
                  icon={Icon.ICONS.FILE}
                  color={Icon.COLORS.BLACK}
                  size={28}
                />
                <p>Work Permit.pdf</p>
                <Icon
                  icon={Icon.ICONS.DELETE}
                  color={Icon.COLORS.GREY30}
                  size={28}
                />
              </div>
              <div className={css.documentEntry}>
                <Icon
                  icon={Icon.ICONS.UPLOAD}
                  color={Icon.COLORS.BLUE}
                  size={28}
                />
                <p>Upload Insurance</p>
              </div>
              <div className={css.documentEntry}>
                <Icon
                  icon={Icon.ICONS.UPLOAD}
                  color={Icon.COLORS.BLUE}
                  size={28}
                />
                <p>Upload Certificate(s)</p>
              </div>
              <div className={css.documentEntry}>
                <Icon
                  icon={Icon.ICONS.UPLOAD}
                  color={Icon.COLORS.BLUE}
                  size={28}
                />
                <p>Upload Recommendations(s)</p>
              </div>
            </div>
            <Button
              className={css.validateButton}
              primary
              color={Button.COLORS.PRIMARY}
              label='Validate'
            />
          </Collapsible>
        )}
      </div>
    )
  }
}
