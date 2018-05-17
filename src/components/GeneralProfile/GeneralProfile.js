import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import { MuiThemeProvider } from 'material-ui/styles'

import { Input, Button, Image, Icon, Select } from 'components/common'

import css from './GeneralProfile.scss'

const FORM_GENERAL_PROFILE = 'form/generalProfile'

class GeneralProfile extends React.Component {
  static VALIDATE_STATUS = {
    VALIDATED: 'validated',
    UPGRADE: 'upgrade',
    WARNING: 'warning',
    ERROR: 'error',
  }
  
  getStatusIcon(){
  
  }
  
  renderCard({ title, content}){
    return (
      <Card className={css.collapseWrapper}>
        <CardHeader
          title={title}
          closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
          openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
          actAsExpander={true}
          showExpandableButton={true}
          className={css.collapseHeader}
        />
        <CardText className={css.collapseText} expandable={true}>
          {content}
        </CardText>
      </Card>
    )
  }
  
  renderUserInfoStatus(){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleSuccess].join(' ')}>
        <Icon className={css.icon} {...Icon.SETS.SECURITY_CHECK} />
        Validated
      </span>
    )
    
    const content = 'Great Job! You have successfully passed validation.' +
      '          Note that changing and saving information will require validation re-submit.' +
      '          View available Job Boards for your Validation level'
    
    return this.renderCard({ title, content })
  }
  
  renderUserContactsStatus(){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleError].join(' ')}>
        <Icon className={css.icon} {...Icon.SETS.SECURITY_SHIELD} />
        Validated
      </span>
    )
    
    const content = 'Great Job! You have successfully passed validation.' +
      '          Note that changing and saving information will require validation re-submit.' +
      '          View available Job Boards for your Validation level'
    
    return this.renderCard({ title, content })
  }
  
  renderUserAddressStatus(){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleError].join(' ')}>
        <Icon className={css.icon} icon={Icon.ICONS.SECURITY_SHIELD} />
        Validated
      </span>
    )
    
    const content = 'Great Job! You have successfully passed validation.' +
      '          Note that changing and saving information will require validation re-submit.' +
      '          View available Job Boards for your Validation level'

    
    return this.renderCard({ title, content })
  }
  
  render () {
    return (
      <MuiThemeProvider>
        <div className={css.main}>
          <div className={css.titleBlock}>
            <div className={css.titleBar}>
              <Button
                className={css.cancelButton}
                icon={Image.SETS.ARROW_BACK}
                type={Button.TYPES.SUBMIT}
                mods={Button.MODS.FLAT}
                label='My Profile'
              />
              <div className={css.titleBarRight}>
                <Button
                  className={css.doneButton}
                  label='DONE'
                  type={Button.TYPES.SUBMIT}
                  mods={Button.MODS.FLAT}
                />
              </div>
            </div>
          </div>
          <div className={css.contentWrapper}>
            <form name={FORM_GENERAL_PROFILE}>
              
              <div className={css.card}>
                <div className={css.cardWrapper}>
                  <div className={css.avatarBlock}>
                    <img src='/static/images/profile-photo.jpg' alt='' />
                    <div className={css.avatarUploadButton}>
                      <Icon className={css.avatarUploadIcon} icon={Icon.ICONS.UPLOAD} />
                      <br />
                      <span className={css.avatarUploadButtonText}>
                        Upload<br/> Photo
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className={css.cardTitle}>Photo, Name and Date of birth</h3>
                    <div className={css.flexRow}>
                      <Field
                        component={Input}
                        className={css.field}
                        name='firstName'
                        type='text'
                        placeholder='First name'
                        materialInput
                        materialTheme={Input.MATERIAL_THEME.PROFILE}
                      />
  
                      <Field
                        component={Input}
                        className={[css.field, css.fieldLastName].join(' ')}
                        name='lastName'
                        type='text'
                        placeholder='Last name'
                        materialInput
                        materialTheme={Input.MATERIAL_THEME.PROFILE}
                      />
                    </div>
                    <div className={css.flexRow}>
                      <Field
                        className={css.dateSelect}
                        component={Select}
                        name='birthdayDate'
                        placeholder='DD'
                        hintText='DD'
                        type='select'
                        values={[
                          { value: '01', name: '01' }
                        ]}
                      />
                      <Field
                        className={css.dateSelect}
                        component={Select}
                        name='birthdayMonth'
                        placeholder='MM'
                        hintText='MM'
                        type='select'
                        values={[
                          { value: '01', name: '01' },
                        ]}
                      />
                      <Field
                        className={css.dateSelect}
                        component={Select}
                        name='birthdayYear'
                        placeholder='YYYY'
                        hintText='YYYY'
                        type='select'
                        values={[
                          { value: '2018', name: '2018' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
                
                { this.renderUserInfoStatus() }
                
              </div>
              
              <div className={css.card}>
                <div className={[css.cardWrapper, css.cardWrapperContacts].join(' ')}>
                  <div className={css.blockCircle}>
                    <Icon className={css.blockCircleIcon} icon={Icon.ICONS.PHONE_EMAIL} />
                  </div>
                  <div>
                    <h3 className={css.cardTitle}>Email and Phone</h3>
                    <div className={css.flexRow}>
                      <Field
                        component={Input}
                        className={css.field}
                        name='firstName'
                        placeholder='First name'
                        materialInput
                        materialTheme={Input.MATERIAL_THEME.PROFILE}
                      />
  
                      <Field
                        className={css.shortField}
                        component={Select}
                        name='lang'
                        placeholder='RU'
                        hintText='RU'
                        type='select'
                        values={[
                          { value: 'RU', name: 'RU' },
                        ]}
                      />
  
                      <Field
                        component={Input}
                        className={css.phoneField}
                        name='phone'
                        placeholder='999 999 99 99'
                        materialInput
                        materialTheme={Input.MATERIAL_THEME.PROFILE}
                      />
                    </div>
                  </div>
                  
                </div>
                
                { this.renderUserContactsStatus() }
                
              </div>
              
              <div className={css.card}>
                <div className={css.cardWrapper}>
                  
                  <h3 className={css.cardTitle}>Home Address</h3>
                  <div className={css.flexRow}>
                    <Field
                      lineEnabled
                      className={css.find}
                      component={Input}
                      name='searchCategory'
                      placeholder='Find'
                    />
                  </div>
                </div>
                
              </div>
            
            </form>
          </div>
        </div>
      </MuiThemeProvider>

    )
  }
}

export default reduxForm({ form: FORM_GENERAL_PROFILE })(GeneralProfile)
