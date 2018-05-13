import { Image, Chip, Input, Button } from 'components/common'
import { Field, reduxForm } from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import React from 'react'
import css from './CreateJobBoard.scss'

const FORM_CREATE_JOB_BOARD = 'form/createJobBoard'

const onSubmit = (values) => {
  // eslint-disable-next-line no-console
  console.log('--CreateJobBoardForm#onSubmit', values)
}

class CreateJobBoard extends React.Component {
  state = {
    requirementsValue: 1,
    feeValue: 1,
  };

  handleChangeRequirements = (event, index, value) => this.setState({ requirementsValue: value });
  handleChangeFee = (event, index, value) => this.setState({ feeValue: value });

  render () {
    return (
      <MuiThemeProvider>
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
              <Field
                className={css.boardHeadline}
                component={Input}
                placeholder='ui.createJob.jobBoardHeadlinePlaceholder'
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
                  component={Input}
                  name='searchCategory'
                  placeholder='term.find'
                  mods={Input.MODS.ALIGN_LEFT}
                />
                <Chip value='Inventory' />
                <Chip value='Monetary Exchange' />
                <Chip value='Ordering Supplies' />
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

            <di className={css.card}>
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
            </di>
          </form>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default reduxForm({
  form: FORM_CREATE_JOB_BOARD,
  onSubmit,
  initialValues: {
    requirements: 1,
  },
})(CreateJobBoard)
