import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'

import PersonalForm from './PersonalForm'
import { Button, Image, Icon } from './../../../components/common'
import { getState as getPageState, reviewProfile } from '../../../store/ui/general-profile-page'
import css from './GeneralProfileContent.scss'

const listItemInnerStyle = {
  padding: '16px 56px 16px 62px',
}

const fontIconStyle = {
  left: 18,
  top: -1,
}

class GeneralProfileContent extends React.Component {

  static propTypes = {
    reviewProfileLoading: PropTypes.bool.isRequired,
    reviewProfile: PropTypes.func.isRequired,
    reviewProfileFailure: PropTypes.instanceOf(Error),
  }

  componentDidMount () {
    this.props.reviewProfile()
  }

  renderCard ({ title, content }){
    return (
      <Card className={css.collapseWrapper}>
        <CardHeader
          title={title}
          closeIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
          openIcon={<Icon className={css.openIcon} icon={Icon.ICONS.DROP_1} color={Icon.COLORS.GREY30} />}
          actAsExpander
          showExpandableButton
          className={css.collapseHeader}
        />
        <CardText className={css.collapseText} expandable>
          {content}
        </CardText>
      </Card>
    )
  }

  renderUserInfoStatus (){
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

  renderUserContactsStatus (){
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

  renderUserAddressStatus (){
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

  renderAddressStatus (){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleError].join(' ')}>
        <Icon className={css.icon} icon={Icon.ICONS.SECURITY_SHIELD} />
        Upgrade
      </span>
    )

    const content = (
      <div>
        <p>
          Upload any documents which can prove that
          the entered address is valid. Note that changing and saving
          information will require validation re-submit.
        </p>
        <List className={css.list}>
          <ListItem
            className={css.listItem}
            innerDivStyle={listItemInnerStyle}
            primaryText={<span className={css.listItemTitle}>My-ID.pdf</span>}
            leftIcon={<FontIcon style={fontIconStyle}><Icon className={css.fileIcon} icon={Icon.ICONS.FILE} /></FontIcon>}
            rightIcon={<FontIcon><Icon className={css.fileActionIcon} icon={Icon.ICONS.DELETE} /></FontIcon>}
          />
        </List>

        <button className={css.validateButton}>Validate</button>
      </div>
    )

    return this.renderCard({ title, content })
  }

  renderWarningEvent (){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleWarning].join(' ')}>
        <Icon className={css.icon} icon={Icon.ICONS.SECURITY_SHIELD} />
        Validation on review
      </span>
    )

    const content = (
      <div>
        <p>
          Upload any documents which can prove that
          the entered address is valid. Note that changing and saving
          information will require validation re-submit.
        </p>
        <List className={css.list}>
          <ListItem
            className={css.listItem}
            innerDivStyle={listItemInnerStyle}
            primaryText={<span className={css.listItemTitle}>My-ID.pdf</span>}
            leftIcon={<FontIcon style={fontIconStyle}><Icon className={css.fileIcon} icon={Icon.ICONS.FILE} /></FontIcon>}
            rightIcon={<FontIcon><Icon className={css.fileActionIcon} icon={Icon.ICONS.DELETE} /></FontIcon>}
          />
        </List>

        <button className={css.cancelValidation}>Cancel validation</button>
      </div>
    )

    return this.renderCard({ title, content })
  }

  renderIssueEvent (){
    const title = (
      <span className={[css.cardActionTitle, css.cardActionTitleError].join(' ')}>
        <Icon className={css.icon} icon={Icon.ICONS.MESSAGE_WARNING} />
        Validation issue
      </span>
    )

    const content = (
      <div>
        <div className={css.userBlock}>
          <div>
            <div className={css.userAvatar}>
              <img src='/static/images/worker-3.jpg' alt='' />
            </div>
          </div>
          <div>
            <div className={css.userName}>Anna Herman</div>
            <div className={css.userPosition}>Verifier</div>
          </div>
        </div>
        <p className={css.issueTextBlock}>
          Hello Emilie,
          unfortunately we couldn&#39;t verify this document. My-ID.pdf
        </p>
        <p className={css.issueTextBlock}>
          <b>Reason</b>: reason statement.
        </p>
        <p className={css.issueTextBlock}>
          Please fix the listed issues and re-upload the fixed document. If you think this is an error feel free to contact me.
        </p>
        <List className={css.list}>
          <ListItem
            className={css.listItemIssue}
            innerDivStyle={listItemInnerStyle}
            primaryText={<span className={css.issueTitle}>Upload Document</span>}
            leftIcon={<FontIcon style={fontIconStyle}><Icon className={css.issueIcon} icon={Icon.ICONS.UPLOAD} /></FontIcon>}
          />
          <ListItem
            className={css.listItemIssue}
            innerDivStyle={listItemInnerStyle}
            primaryText={<span className={css.issueTitle}>Message Verifier</span>}
            leftIcon={<FontIcon style={fontIconStyle}><Icon className={css.issueIcon} icon={Icon.ICONS.MESSAGE} /></FontIcon>}
          />
        </List>

        <button className={css.validateButton}>Validate</button>
      </div>
    )

    return this.renderCard({ title, content })
  }

  renderContent () {
    if (this.props.reviewProfileLoading) return <CircularProgress size={24} />
    if (this.props.reviewProfileFailure) return <div>error {this.props.reviewProfileFailure.message}</div>
    return [
      <PersonalForm />,
    ]
  }

  render () {
    return (
      <div className={css.main}>
        <div className={css.titleBlock}>
          <div className={css.titleBar}>
            <Button className={css.cancelButton} icon={Image.SETS.ARROW_BACK} type={Button.TYPES.SUBMIT} mods={Button.MODS.FLAT} label='My Profile' />
            <div className={css.titleBarRight}>
              <Button className={css.doneButton} label='DONE' type={Button.TYPES.SUBMIT} mods={Button.MODS.FLAT} />
            </div>
          </div>
        </div>
        <div className={css.contentWrapper}>
          {this.renderContent()}

          {/*<form name={FORM_GENERAL_PROFILE}>*/}

          {/*<div className={css.card}>*/}
          {/*<div className={[css.cardWrapper, css.cardWrapperContacts].join(' ')}>*/}
          {/*<div>*/}
          {/*<div className={css.blockCircle}>*/}
          {/*<Icon className={css.blockCircleIcon} icon={Icon.ICONS.PHONE_EMAIL} />*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*<h3 className={css.cardTitle}>Email and Phone</h3>*/}
          {/*<div className={css.flexRow}>*/}
          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={css.field}*/}
          {/*name='email'*/}
          {/*placeholder='Email'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}

          {/*<Field*/}
          {/*className={css.langField}*/}
          {/*component={Select}*/}
          {/*name='lang'*/}
          {/*placeholder='RU'*/}
          {/*hintText='RU'*/}
          {/*type='select'*/}
          {/*values={[*/}
          {/*{ value: 'RU', name: 'RU' },*/}
          {/*]}*/}
          {/*/>*/}

          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={css.phoneField}*/}
          {/*name='phone'*/}
          {/*placeholder='999 999 99 99'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*</div>*/}

          {/*</div>*/}

          {/*{ this.renderUserContactsStatus() }*/}

          {/*</div>*/}

          {/*<div className={css.card}>*/}
          {/*<div className={css.cardWrapper}>*/}
          {/*<div>*/}
          {/*<div className={css.blockCircle}>*/}
          {/*<Icon className={css.blockCircleIcon} icon={Icon.ICONS.HOME} />*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*<h3 className={css.cardTitle}>Home Address</h3>*/}
          {/*<div className={css.flexRow}>*/}
          {/*<Field*/}
          {/*className={css.field}*/}
          {/*component={Select}*/}
          {/*name='country'*/}
          {/*placeholder='Country'*/}
          {/*hintText='Country'*/}
          {/*type='select'*/}
          {/*values={[*/}
          {/*{ value: 'Russia', name: 'Russia' },*/}
          {/*]}*/}
          {/*/>*/}
          {/*<Field*/}
          {/*className={css.field}*/}
          {/*component={Select}*/}
          {/*name='state'*/}
          {/*placeholder='State'*/}
          {/*hintText='State'*/}
          {/*type='select'*/}
          {/*values={[*/}
          {/*{ value: 'State', name: 'State' },*/}
          {/*]}*/}
          {/*/>*/}
          {/*</div>*/}

          {/*<div className={css.flexAdditionalRow}>*/}
          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={css.field}*/}
          {/*name='city'*/}
          {/*placeholder='City'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}
          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={css.field}*/}
          {/*name='zip'*/}
          {/*placeholder='ZIP'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}
          {/*</div>*/}

          {/*<div className={css.flexRow}>*/}
          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={[css.field, css.buildingField].join(' ')}*/}
          {/*name='building'*/}
          {/*placeholder='Building #'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}

          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={[css.field, css.suitField].join(' ')}*/}
          {/*name='suit'*/}
          {/*placeholder='Suit'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}

          {/*<Field*/}
          {/*component={Input}*/}
          {/*className={css.field}*/}
          {/*name='street'*/}
          {/*placeholder='Street'*/}
          {/*materialInput*/}
          {/*materialTheme={Input.MATERIAL_THEME.PROFILE}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}

          {/*{ this.renderAddressStatus() }*/}

          {/*</div>*/}

          {/*<div className={css.eventBlock}>*/}
          {/*{ this.renderWarningEvent() }*/}
          {/*</div>*/}

          {/*<div className={css.eventBlock}>*/}
          {/*{ this.renderIssueEvent() }*/}
          {/*</div>*/}

          {/*</form>*/}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  const pageState = getPageState(state)
  return ({
    reviewProfileLoading: pageState.reviewProfileLoading,
    profile: pageState.profile,
    reviewProfileFailure: pageState.reviewProfileFailure,
  })
}

const mapDispatchToProps = (dispatch) => ({
  reviewProfile: () => dispatch(reviewProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralProfileContent)
