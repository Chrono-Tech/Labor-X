import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Collapsible from 'react-collapsible'
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
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={TextField}
              name={`${experience}.organization`}
              floatingLabelText='Organisation'
            />
            <div className={css.twoColumn}>
              <Field
                fullWidth
                openToYearSelection
                name={`${experience}.since`}
                component={DatePickerField}
                label='From'
                // eslint-disable-next-line react/jsx-no-bind
                format={(value) => value === '' ? null : value}
              />
              <Field
                fullWidth
                openToYearSelection
                name={`${experience}.until`}
                component={DatePickerField}
                label='To'
                // eslint-disable-next-line react/jsx-no-bind
                format={(value) => value === '' ? null : value}
              />
            </div>
          </div>
          <Field
            fullWidth
            component={TextField}
            name={`${experience}.responsibilities`}
            hintText='List your responsibilities here'
            multiLine
            rows={2}
          />
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
