import React  from 'react'
import PropTypes  from 'prop-types'
import { Checkbox } from 'redux-form-material-ui'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { COPY_YOUR_ACCOUNT_PASSWORD_FORM as FORM } from "src/store/auth/signup/constants"
import { submitCopyYourAccountPassword as submit } from "src/store/auth/signup/actions"
import { mnemonicSelector } from "src/store/auth/signup/selectors"
import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'
import { Link, Button } from 'src/components/common'
import validate from './validate'

import css from './CopyYourAccountPasswordContent.scss'

export class CopyYourAccountPasswordContent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    mnemonic: PropTypes.string.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  render () {
    return (
      <div>
        <SignupLayout>
          <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
            <h2>Write down back-up phrase</h2>
            <p className={css.description}>
              You can use this phrase to login and access your wallet, even if you forgot your password.
              <br />
              Or you can use it to add account to another browser.
            </p>
            <div className={css.phraseBlock}>
              <div className={css.phraseBlockTitle}>Your back-up phrase (Mnemonic Key)</div>
              <div className={css.phrase} id='mnemonic'>{ this.props.mnemonic }</div>
            </div>
            <div className={css.infoBlock}>
              <div className={css.infoBlockHeader}>Q&A</div>
              <ol className={css.infoBlockList}>
                <li>
                  <p>
                    <b>1. Wow, this is long one!</b> We may suggest to print
                    this <Link className={css.link} href='/'>QR code</Link> which stores the 12 words password.
                    This option however will only work on phones or special devices for desktops and laptops.
                  </p>
                  <p>
                    Your may also consider the most safe solution by purchasing USB hardware devices
                    e.g. <Link className={css.link} href='https://www.ledgerwallet.com/'>Ledger Nano</Link>
                    &nbsp;or <Link className={css.link} href='/'>Trezor</Link>.
                  </p>
                </li>
                <li>
                  <b>2. Why not use the standard email/password?</b> LaborX is a project based on block-chain technology.
                  The technology is removing the need of such information and suggests more safer and anonymous way
                  of work using internet. However, you will have a right to provide the data, e.g.
                  Name, email, date of birth, etc. later on to other people if you decide so.
                </li>
                <li>
                  <b>3. What is the block-chain network again?</b> Block-chain network is a place where database is stored
                  de-centralazied, on every participant computer, special architecture makes block-chain technology
                  the most secure up to date and removing intermediates, who can use your data not in good way.
                </li>
                <li>
                  <b>4. And crypto-currencies?</b> Crypto-currencies are problem-solvers, e.g. Bitcoin has removed need of
                  intermediate, for example banks, which made transaction cheaper, faster and in the most secure way.
                  Another crypto-currency Etherium made possible to make electronic contracts automated and safe for
                  all sides.
                </li>
                <li>
                  <b>5. What is LH?</b> LH (LabourHour) is a crypto-currency invented by LaborX, a ChronoBank project,
                  and solving an issue of inflation. To learn more please read
                  &nbsp;<Link className={css.link} href='/assets/laborx_whitepaper.pdf'>LaborX Whitepaper</Link> and
                  &nbsp;<Link className={css.link} href='/assets/whitepaper.pdf'>ChronoBank Whitepaper</Link>.
                </li>
                <li>
                  <b>6. I have more questions.</b> For more information please visit our&nbsp;
                  <Link className={css.link} href='/'>Q&A</Link>
                </li>
              </ol>
            </div>
            <div className={[css.infoBlock, css.securityBlock].join(' ')}>
              <div className={css.infoBlockHeader}>Security Guidelines</div>
              <ol className={css.infoBlockList}>
                <li>
                  <b>1. Copy you Account Password (Mnemonic key) on Paper.</b> Don&quot;t
                  save your password on a computer, copy it on a paper and store in a safe place.
                </li>
                <li>
                  <b>2. Don&quot;t share your wallet file with anyone you don&quot;t trust.</b> Even
                  the wallet file is protected by password, the file still can be used against you and you may
                  lose your funds. To avoid the situation do not share your file with anyone.
                </li>
                <li><b>3. What if I&quot;ve lost my Back-up phrase (Mnemonic Key)?</b> You may use you wallet file instead.</li>
                <li>
                  <b>4. What if I don&quot;t have neither Wallet file nor Back-up phrase (Mnemonic Key)?</b> We
                  do not store this information and Your account will be lost together with all your funds and history.
                </li>
                <li>
                  <b>5. Following the simple rules will make your account secure.</b>
                </li>
              </ol>
            </div>
            <Field
              className={css.checkbox}
              name='confirm'
              component={Checkbox}
              label='I have read QA and will follow security guidelines given on this page'
            />
            <div>
              <Button
                label='Proceed'
                buttonClassName={css.submitButton}
                type={Button.TYPES.SUBMIT}
                disabled={this.props.pristine || this.props.invalid}
                mods={Button.MODS.INVERT}
                error={this.props.error}
                errorClassName={css.formError}
                primary
              />
            </div>
            <div className={css.progressBlock}>
              <div className={css.progressPoint} />
              <div className={[css.progressPoint, css.progressPointInactive].join(' ')} />
              <div className={[css.progressPoint, css.progressPointInactive].join(' ')} />
            </div>
          </form>
        </SignupLayout>
      </div>
    )
  }

}

CopyYourAccountPasswordContent = reduxForm({
  form: FORM,
  destroyOnUnmount: false,
  validate,
})(CopyYourAccountPasswordContent)

const mapStateToProps = (state) => ({
  mnemonic: mnemonicSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
})

CopyYourAccountPasswordContent = connect(mapStateToProps, mapDispatchToProps)(CopyYourAccountPasswordContent)

export default CopyYourAccountPasswordContent
