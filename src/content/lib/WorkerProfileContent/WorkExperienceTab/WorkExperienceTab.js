import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Collapsible from 'react-collapsible'
import { Icon, Button, Translate, Chip } from 'src/components/common'
import { SKILLS_LIST } from 'src/models'
import DatePickerField from 'src/components/DatePickerField'
import css from './WorkExperienceTab.scss'

export default class WorkExperienceTab extends React.Component {
  handleClickValidate = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-WorkExperienceTab handleClickValidate')
  }

  handleClickRemoveBlock = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-WorkExperienceTab handleClickRemoveBlock')
  }

  handleClickAddSkill = () => {
    // eslint-disable-next-line no-console
    console.log('---WorkerProfileContent-WorkExperienceTab handleClickAddSkill')
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

  renderExperiences = ({ fields }) => {
    return (
      <div>
        { fields.map(experience => this.renderExperienceCard(experience)) }
      </div>
    )
  }

  renderExperienceCard = (experience) => {
    return (
      <div className={css.experienceBlock} key={experience}>
        <div className={css.experienceBlockContent}>
          <Field
            fullWidth
            component={TextField}
            name={`${experience}.position`}
            floatingLabelText='Position'
          />
          <div className={css.twoColumn}>
            <Field
              fullWidth
              component={TextField}
              name={`${experience}.organisation`}
              floatingLabelText='Organisation'
            />
            <div className={css.twoColumn}>
              <Field
                fullWidth
                openToYearSelection
                name={`${experience}.workFrom`}
                component={DatePickerField}
                label='From'
                // eslint-disable-next-line react/jsx-no-bind
                format={(value) => value === '' ? null : value}
              />
              <Field
                fullWidth
                openToYearSelection
                name={`${experience}.workTo`}
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
        <div className={css.removeBlock} onClick={this.handleClickRemoveBlock}>
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
        <FieldArray name='experiences' component={this.renderExperiences} />
        <div className={css.block}>
          <div className={css.tagsRow}>
            <Field
              className={css.find}
              component={TextField}
              name='searchSkill'
              hintText={<Translate value='terms.find' />}
            />
            <Icon
              onClick={this.handleClickAddSkill}
              icon={Icon.ICONS.ADD_CIRCLE}
              color={Icon.COLORS.BLUE}
              size={28}
            />
            <div className={css.tags}>
              {SKILLS_LIST.map(e => (
                <Chip value={e.name} key={e.index} />
              ))}
            </div>
          </div>
        </div>
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
            onClick={this.handleClickValidate}
          />
        </Collapsible>
      </div>
    )
  }
}
