import React from 'react'
import PropTypes from 'prop-types'
import connect from "react-redux/lib/connect/connect"

import { submitWelcome as submit } from "src/store/auth/signup/actions"
import { submitWelcomeLoadingSelector as submitLoadingSelector } from "src/store/auth/signup/selectors"
import { Link } from 'src/components/common'
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton"

import css from './WelcomeContent.pcss'

export class WelcomeContent extends React.Component {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    submitLoading: PropTypes.bool.isRequired,
  }

  render () {
    return (
      <div>
        <div className={css.root}>
          <div className={css.contentWrapper}>
            <div className={css.header}>
              <div className={css.headerInner}>
                <Link href='/'>
                  <img src='/static/images/svg/laborx-white.svg' alt='' />
                </Link>
              </div>
            </div>
            <h1>Welcome to LaborX!</h1>
            <p>
              <strong>Dear Member,</strong>
              <br />
              Our team thanks you for creating the account and wishes you a productive work.
            </p>
            <br />
            <br />
            <br />
            <WhiteRoundedButton onClick={this.props.submit} loader={this.props.submitLoading}>Done</WhiteRoundedButton>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  submitLoading: submitLoadingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  submit: () => dispatch(submit()),
})

WelcomeContent = connect(mapStateToProps, mapDispatchToProps)(WelcomeContent)

export default WelcomeContent
