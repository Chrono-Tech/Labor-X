import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { TextField } from 'redux-form-material-ui'
import { profileSelector } from 'src/store'
import { MuiThemeProvider } from 'material-ui/styles'
import { Button, Link, Icon } from 'src/components/common'
import { JobModel, ProfileModel } from 'src/models'
import css from './SendInvoiceDialog.scss'

class SendInvoiceDialog extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    client: PropTypes.instanceOf(ProfileModel).isRequired,
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      expenses: [
        {
          name: 'Gas Tubes',
          value: 10,
        },
      ],
      newExpense: {
        name: '',
        value: '',
      },
    }
  }

  handleCancel () {
    // eslint-disable-next-line no-console
    console.log('SendInvoiceDialog-handleCancel')
  }

  handleSend () {
    // eslint-disable-next-line no-console
    console.log('SendInvoiceDialog-handleSend')
  }

  handleAddExpense = () => {
    this.setState((prevState) => {
      return {
        expenses: prevState.expenses.concat({
          value: prevState.newExpense.value,
          name: prevState.newExpense.name,
        }),
        newExpense: {
          name: '',
          value: '',
        },
      }
    })
  }

  handleRemoveExpense = (index) => {
    this.setState((prevState) => {
      const newExpenses = prevState.expenses
      newExpenses.splice(index, 1)
      return { expenses: newExpenses }
    })
  }

  handleExpenseNameChange = (e) => {
    const input = e.target.value
    this.setState((prevState) => {
      return { newExpense: { ...prevState.newExpense, name: input  } }
    })
  }

  handleExpenseValueChange = (e) => {
    const input = e.target.value
    this.setState((prevState) => {
      return { newExpense: { ...prevState.newExpense, value: input  } }
    })
  }

  expensesValue = () => {
    return this.state.expenses.map(e => e.value).reduce((acc, curr) => acc + Number(curr), 0 )
  }

  render () {
    const { job, client } = this.props
    return (
      <MuiThemeProvider>
        <div className={css.root}>
          <div className={css.header}>
            <h2>Send an Invoice</h2>
            <div className={css.headerInfo}>
              By sending an Invoice to your Client you declare the job is complied. The job will be moved to <Link className={css.link} href='/comleted-jobs'>Completed Jobs</Link> and the invoice can be found in
              <strong> Contract</strong> tab of the job. Your Client will pay or state the invoice decline reasons based on job you&quot;ve done.
            </div>
            <div className={css.client}>
              <img src={client.ipfs.logo} alt={client.ipfs.name} />
              <div>
                <strong>Bill To</strong>
                <p>{client.ipfs.name}</p>
              </div>
            </div>
          </div>
          <div className={css.body}>
            <div className={css.bodyRow}>
              <strong>{job.ipfs.name}</strong>
              <strong>LHUS {job.ipfs.budget.award.toFixed(2).toString()}</strong>
            </div>
            {
              this.state.expenses.map((e, index) => (
                <ExpenseItem
                  key={uniqid()}
                  name={e.name}
                  value={Number(e.value)}
                  index={index}
                  onClick={this.handleRemoveExpense}
                />
              ))
            }
            <div className={css.bodyRow}>
              <TextField
                fullWidth
                className={css.expense}
                hintText='Expense'
                value={this.state.newExpense.name}
                onChange={this.handleExpenseNameChange}
              />
              <div className={css.fieldWithIcon}>
                <TextField
                  fullWidth
                  hintText='$0.00'
                  value={this.state.newExpense.value}
                  onChange={this.handleExpenseValueChange}
                />
                <Icon
                  className={css.icon}
                  onClick={this.handleAddExpense}
                  size={30}
                  icon={Icon.ICONS.ADD_CIRCLE}
                  color={Icon.COLORS.BLUE}
                />
              </div>
            </div>
            <div className={css.bodyRow}>
              <strong>Total</strong>
              <div className={css.amount}>
                <strong>LHUS {job.ipfs.budget.award.plus(this.expensesValue() / 40).toFixed(2).toString()}</strong>
                <p>&nbsp;(${job.ipfs.budget.awardUSD.plus(this.expensesValue()).toFixed(2).toString()})</p>
              </div>
            </div>
          </div>
          <div className={css.actions}>
            <Button
              buttonClassName={css.cancelAction}
              type={Button.TYPES.BUTTON}
              onClick={this.handleCancel}
              label='CANCEL'
            />
            <Button
              buttonClassName={css.sendAction}
              type={Button.TYPES.BUTTON}
              onClick={this.handleSend}
              label='SEND'
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps (state, op) {
  const client = profileSelector(op.job.client)(state)
  return {
    job: op.job,
    client,
  }
}

export default connect(mapStateToProps)(SendInvoiceDialog)

class ExpenseItem extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor (props, context) {
    super(props, context)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove () {
    this.props.onClick(this.props.index)
  }

  render () {
    const { name, value } = this.props
    return (
      <div className={css.bodyRow}>
        <p>{name}</p>
        <div className={css.fieldWithIcon}>
          <p>${value.toFixed(2)}</p>
          <Icon
            className={css.icon}
            onClick={this.handleRemove}
            size={30}
            icon={Icon.ICONS.DELETE}
            color={Icon.COLORS.GREY30}
          />
        </div>
      </div>
    )
  }
}
