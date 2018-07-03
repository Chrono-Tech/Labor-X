import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { Link } from 'src/routes'

import { hideAccount404Dialog as hide } from "src/store/login/actions";
import { getOpenAccount404Dialog } from "src/store/login/selectors";

import css from './Account404Dialog.scss'
import {Button} from "../../../components/common";

class Account404Dialog extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
  }

  handleRequestClose = () => {
    this.props.hide()
  }

  handleNoClick = () => {
    this.props.hide()
  }

  handleYesClick = () => {
    this.props.goToCreateAccountPage()
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
        contentClassName={css.dialog}
        title={<h2>LaborX account is not found</h2>}
        titleClassName={css.dialogTitle}
        bodyClassName={css.dialogContent}
        actionsContainerClassName={css.actionWrapper}
        actions={[
          <RaisedButton label='No' className={css.noButton} onClick={this.handleNoClick} />,
          <Link route='/create-account'><RaisedButton label='YES' primary={true} /></Link>,
        ]}
      >
        LaborX account with the provided address is not found.
        Would you like to Create a New Account?
      </Dialog>
    )
  }

}

const mapStateTopProps = state => ({
  open: getOpenAccount404Dialog(state),
})

const mapDispatchTopProps = dispatch => ({
  hide: () => dispatch(hide()),
})

export default connect(mapStateTopProps, mapDispatchTopProps)(Account404Dialog)


// renderDialog (){
//   return (
//
//   )
// }