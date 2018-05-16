import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card'
import { MuiThemeProvider } from 'material-ui/styles'

import { Input, Button, Image, Icon } from 'components/common'

import css from './GeneralProfile.scss'

const FORM_GENERAL_PROFILE = 'form/generalProfile'

class GeneralProfile extends React.Component {
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
  
  renderUserInfoCardStatus(){
    const title = (
      <span className={css.cardActionTitle}>
        <Icon className={css.icon} {...Icon.SETS.SECURITY_CHECK} />
        Validated
      </span>
    )
    
    const content = 'Great Job! You have successfully passed validation.\n' +
      '          Note that changing and saving information will require validation re-submit.\n' +
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
                  <div>
                    photo
                  </div>
                  <div>
                    <h3 className={css.cardTitle}>Photo, Name and Date of birth</h3>
                    <div className={css.flexRow}>
                      <Field
                        lineEnabled
                        className={css.find}
                        component={Input}
                        name='searchCategory'
                        placeholder='Find'
                        mods={Input.MODS.ALIGN_LEFT}
                        materialInput
                      />
                    </div>
                  </div>
                </div>
                
                {
                  }
                
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
                        lineEnabled
                        className={css.find}
                        component={Input}
                        name='searchCategory'
                        placeholder='Find'
                        mods={Input.MODS.ALIGN_LEFT}
                        materialInput
                      />
                    </div>
                  </div>
                  
                </div>
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
                      mods={Input.MODS.ALIGN_LEFT}
                      materialInput
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
