import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'
import { MuiThemeProvider } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import { SelectField, AutoComplete } from 'redux-form-material-ui'

import { Image, Chip, Input, Button } from 'components/common'
import { TAG_CATEGORIES_LIST, JobPostFormModel } from 'src/models'
import { boardCreate } from 'src/store'

import css from './CreateJobBoard.scss'
import {Router} from "../../routes";

const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

class CreateJobBoardForm extends React.Component {
  state = {
    requirementsValue: 1,
    feeValue: 1,
    categories: []
  };

  handleChangeRequirements = (event, index, value) => this.setState({ requirementsValue: value });
  handleChangeFee = (event, index, value) => this.setState({ feeValue: value });

  getTagsList(){
    return TAG_CATEGORIES_LIST && TAG_CATEGORIES_LIST.map(tag => tag.name) || []
  }
  
  onRemoveCategory(name){
    const { categories, change } = this.state
    
    const newCategories = categories.filter(item => item !== name)
    
    this.setState({ categories: newCategories })
    
    change('tags', newCategories.join(', '))
  }
  
  onAddCategory(name){
    const { change } = this.props
    if (!this.state.categories.includes(name)) {
      
      const newCategories = [...this.state.categories, name]
      
      this.setState({categories: newCategories })
      
      change('tags', newCategories.join(', '))
    }
  }
  
  searchCategoryFilter(searchText, key){
    return searchText !== '' &&
      String(key || '').toLowerCase().indexOf(String(searchText || '').toLowerCase()) !== -1
  }
  
  renderCategories(){
    const { categories } = this.state
    
    return categories && categories.map((item, i) => (
      <Chip key={i} value={item} onRemove={(value) => this.onRemoveCategory(value)} />
    ))
  }
  
  render () {
    const { onSubmit, handleSubmit, isLoading } = this.props
    return (
      <MuiThemeProvider>
        <form name={FORM_CREATE_JOB_BOARD} className={css.main}>
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
                  // type={Button.TYPES.SUBMIT}
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
                name='headline'
              />
            </div>

            <div className={css.card}>
              <h3 className={css.cardTitle}>Categories</h3>
              <div className={css.flexRow}>
                <Field
                  lineEnabled
                  className={css.find}
                  component={AutoComplete}
                  onNewRequest={(category) => this.onAddCategory(category)}
                  filter={this.searchCategoryFilter}
                  dataSource={this.getTagsList()}
                  name='searchCategory'
                  placeholder='Find'
                  mods={Input.MODS.ALIGN_LEFT}
                />
                <Field
                  component='input'
                  type='hidden'
                  name='tags'
                  readOnly
                />
                { this.renderCategories() }
              </div>
            </div>

            <div className={[css.card, css.noMarginBottom].join(' ')}>
              <h3 className={css.cardTitle}>Join requirements</h3>
              <div className={css.subtitle}>Specify which requirements should be met in order to join the board.</div>
              <Field
                component={SelectField}
                className={css.requirementsSelect}
                value={this.state.requirementsValue}
                onChange={this.handleChangeRequirements}
                name='requirements'
              >
                <MenuItem value={1} primaryText='Match job board categories' />
                <MenuItem value={2} primaryText='Specific rating and verification' />
                <MenuItem value={3} primaryText='By invitation only' />
              </Field>
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
                    value={this.state.feeValue}
                    onChange={this.handleChangeFee}
                    hintText='Fixed Fee'
                    hintStyle={{ 'font-style': 'italic' }}
                    name='fee'
                  >
                    <MenuItem value={1} primaryText='Option 1' />
                    <MenuItem value={2} primaryText='Option 2' />
                    <MenuItem value={3} primaryText='Option 3' />
                  </Field>
                  <Field
                    lineEnabled
                    className={css.match}
                    type={Input.TYPES.TEXT}
                    component={Input}
                    name='zip'
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
              <div className={css.visuals}>
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

const CreateJobBoard = reduxForm({
  form: FORM_CREATE_JOB_BOARD,
  initialValues: {
    requirements: 1,
  },
})(CreateJobBoardForm)

class CreateJobBoardWrapper extends React.Component {
  
  constructor(){
    super()
    
    this.state = {
      isLoading: false
    }
  }
  
  handleSubmit = async (values) => {
    this.setState({
      isLoading: true,
    })
    
    console.log('handle', values)
    try {
      await this.props.handleSubmit(values)
      // Router.pushRoute('/job-boards')
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }
  
  render(){
    return (
      <CreateJobBoard onSubmit={this.handleSubmit.bind(this)} isLoading={this.state.isLoading}/>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    async handleSubmit (values) {
      // eslint-disable-next-line no-console
      console.log('--CreateJobForm#onSubmit', values, this)
      await dispatch(boardCreate({}))
    },
  }
}

export default connect(null, mapDispatchToProps)(CreateJobBoardWrapper)
