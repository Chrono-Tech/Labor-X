import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { CircularProgress } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import AutoComplete from 'material-ui/AutoComplete'
import { SelectField } from 'redux-form-material-ui'

import { Image, Chip, Input, Button, Icon, Checkbox } from 'components/common'
import {
  TAG_CATEGORIES_LIST,
  BOARD_REQUIREMENTS_LIST,
  BOARD_POST_FEE_LIST,
} from 'src/models'

import css from './CreateJobBoardForm.scss'

export const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

class CreateJobBoardForm extends React.Component {
  static propTypes = {
    isSpecificRequirements: PropTypes.bool,
    change: PropTypes.func,
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      categories: []
    }
  }
  
  
  getTagsList(){
    return TAG_CATEGORIES_LIST
  }
  
  onRemoveCategory(tag, i){
    const { categories } = this.state
    const { change } = this.props
    
    const newCategories = categories.filter(item => item.index !== tag.index)
    
    this.setState({ categories: newCategories })
    
    change('tagCategories', newCategories.map((item) => item.index).join(', '))
  }
  
  onAddCategory(tag) {
    const { change } = this.props
    
    if (!this.state.categories.find(item => item.index === tag.index)) {
      
      const newCategories = [...this.state.categories, tag]
      
      this.setState({categories: newCategories }, () => {
        change('tagCategories', newCategories.map((item) => item.index).join(','))
      })
    }
    
    change('searchCategory', '')
  }
  
  searchCategoryFilter(searchText, key){
    return searchText !== '' &&
      String(key || '').toLowerCase().indexOf(String(searchText || '').toLowerCase()) !== -1
  }
  
  renderCategories(){
    const { categories } = this.state
    
    return categories && categories.map((item, i) => (
      <Chip key={i} value={item.name} onRemove={(value) => this.onRemoveCategory(item)} />
    ))
  }
  
  renderSpecificRequirementsContent(){
    return (
      <div>
        <div className={css.specificRequirementsBlock}>
          <div className={css.specificRequirement}>
            <h3 className={css.cardTitle}>
              Rating Requirements
            </h3>
            <div className={css.subtitle}>
              Specify which requirements should be met in order to join the board.
            </div>
            <div>
              <Icon className={css.star} size={36} {...Icon.SETS.STAR} />
              <Icon className={css.star} size={36} {...Icon.SETS.STAR} />
              <Icon className={css.star} size={36} {...Icon.SETS.STAR} />
              <Icon className={css.star} size={36} {...Icon.SETS.STAR} />
              <Icon className={css.semiTransparentStar} size={36} {...Icon.SETS.STAR} />
            </div>
          </div>
          
          <div className={[css.specificRequirement, css.specificRequirementRight].join(' ')}>
            <h3 className={css.cardTitle}>
              Validation Level Requirements
            </h3>
            <div className={css.subtitle}>
              Indicates which users&apos; information are validated.
            </div>
            <div>
              <div className={css.securityRating}>
                <Icon size={38} {...Icon.SETS.SECURITY} />
                <span className={css.securityRatingCount}>1</span>
                
                <div className={[css.popover, css.popoverArrow, css.arrowRight].join(' ')}>
                  <b>Level 1</b>
                  <div className={css.popoverDescription}>
                    Ether email or phone is validated.
                  </div>
                </div>
                
              </div>
              <div className={css.securityRating}>
                <Icon size={38} {...Icon.SETS.SECURITY} />
                <span className={css.securityRatingCount}>2</span>
  
                <div className={[css.popover, css.popoverArrow, css.arrowRight].join(' ')}>
                  <b>Level 2</b>
                  <div className={css.popoverDescription}>
                    ID, email or phone are validated.
                  </div>
                </div>
                
              </div>
              <div className={css.securityRating}>
                <Icon size={38} {...Icon.SETS.SECURITY} />
                <span className={css.securityRatingCount}>3</span>
                
                <div className={[css.popover, css.popoverArrow, css.arrowRight].join(' ')}>
                  <b>Level 3</b>
                  <div className={css.popoverDescription}>
                    Address, ID, email or phone are validated.
                  </div>
                </div>
                
              </div>
              <div className={[css.securityRating, css.securityRatingLast].join(' ')}>
                <Icon size={38} {...Icon.SETS.SECURITY} />
                <span className={css.securityRatingCount}>4</span>
  
                <div className={[css.popover, css.popoverArrow, css.arrowRight].join(' ')}>
                  <b>Job Board Rating</b>
                  <div className={css.popoverDescription}>
                    Insurance, work permit, certificates, recommendations and other supportive documents, address, ID, email or phone are validated.
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        <div className={css.specificRequirementsBlock}>
          <div className={css.specificRequirement}>
            <h3 className={css.cardTitle}>
              Skills
            </h3>
            <div className={css.subtitle}>
              <Field
                component={Checkbox}
                className={css.field}
                name='endorsingSkills'
                label='Worker skills must be endorsed'
                material
                defaultTheme={true}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  render () {
    const { onSubmit, handleSubmit, isLoading, isSpecificRequirements } = this.props
    return (
      <MuiThemeProvider>
        <form name={FORM_CREATE_JOB_BOARD} className={css.main} onSubmit={handleSubmit}>
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
                  mods={Button.MODS.FLAT}
                  onClick={this.props.handleSubmit}
                />
              </div>
            </div>
          </div>
          <div className={css.content}>
            <div className={css.headline}>
              <Field
                className={css.boardHeadline}
                component={Input}
                placeholder='Enter Job Board Headline'
                mods={[ Input.MODS.INVERT, Input.MODS.HUGE ]}
                name='name'
              />
            </div>
            
            <div className={css.card}>
              <h3 className={css.cardTitle}>Categories</h3>
              <div className={css.flexRow}>
                <Field
                  className={css.find}
                  style={{marginRight: 10}}
                  component={AutoComplete}
                  onNewRequest={this.onAddCategory.bind(this)}
                  filter={this.searchCategoryFilter.bind(this)}
                  dataSourceConfig={{
                    text: 'name',
                    value: 'name'
                  }}
                  dataSource={this.getTagsList()}
                  name='searchCategory'
                  placeholder='Find'
                />
                <Field
                  component='input'
                  type='hidden'
                  name='tagCategories'
                  readOnly
                />
                { this.renderCategories() }
              </div>
            </div>
            
            <div className={[css.card, css.noMarginBottom].join(' ')}>
              <h3 className={css.cardTitle}>
                Join requirements
              </h3>
              <div className={css.subtitle}>
                Specify which requirements should be met in order to join the board.
              </div>
              <Field
                component={SelectField}
                className={css.requirementsSelect}
                name='joinRequirement'
                selectedMenuItemStyle={{fontSize: 14}}
                menuItemStyle={{fontSize: 14}}
                labelStyle={{fontSize: 14}}
                style={{width: 300}}
              >
                {
                  BOARD_REQUIREMENTS_LIST.map((item, i) => (
                    <MenuItem key={i} value={item.index} primaryText={item.name} />
                  ))
                }
              </Field>
              
              {
                isSpecificRequirements ? this.renderSpecificRequirementsContent() : null
              }
              
            </div>
            
            <div className={css.chartContainer}>
              <h4>How much people can join?</h4>
              <p>Check our estimates for worker and clients based on your parameters</p>
              <div className={css.chart} />
            </div>
            
            <div className={css.card}>
              <h3 className={css.cardTitle}>Job Post Fee</h3>
              <div className={css.subtitle}>Specify fee amount for posting job on the Job Board</div>
              <div className={css.cardContent}>
                <div className={css.feeInputs}>
                  <Field
                    component={SelectField}
                    hintText='Fixed Fee'
                    hintStyle={{ fontStyle: 'italic' }}
                    name='fee'
                  >
                    {
                      BOARD_POST_FEE_LIST.map((item, i) => (
                        <MenuItem key={i} value={item.index} primaryText={item.name} />
                      ))
                    }
                  </Field>
                  <Field
                    lineEnabled
                    className={css.match}
                    type={Input.TYPES.TEXT}
                    component={Input}
                    name='lhus'
                    mods={Input.MODS.ALIGN_LEFT}
                    placeholder='ui.createJobBoard.value'
                  />
                </div>
                <div className={css.delimiter} />
                <h3>Job Post Service Agreement</h3>
                <div><span>By default Clients will be provided with our </span><a href='/'>Standard Agreement.</a></div>
                <div className={css.delimiter} />
                <div className={css.feeActions}>
                  <div className={css.feeActionsIcon}>
                    <Image
                      icon='file_upload'
                      color={Image.COLORS.BLUE}
                    />
                  </div>
                  <div>
                    <a href='/'>Upload Custom Agreement</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={css.card}>
              <h3 className={css.cardTitle}>Visuals</h3>
              <div className={css.visuals} >
                <div className={css.visualsContainer}>
                  <img src='/static/temp/become.png' alt='Logo' />
                  <a href='/'>UPLOAD LOGO</a>
                </div>
                <div className={css.visualsContainer}>
                  <img src='/static/temp/example_bg.jpg' alt='Background' />
                  <a href='/'>UPLOAD BACKGROUND</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </MuiThemeProvider>
    )
  }
}

export default reduxForm({
  form: FORM_CREATE_JOB_BOARD,
  initialValues: {
    tagCategories: '',
    requirements: 0,
    fee: 0,
    feeValue: 0,
    endorsingSkills: false,
    joinRequirement: 0,
  },
})(CreateJobBoardForm)
