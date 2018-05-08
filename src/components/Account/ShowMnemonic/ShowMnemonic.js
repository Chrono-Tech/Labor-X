import React  from 'react'
import {reduxForm, Field, SubmissionError} from 'redux-form'
import {connect} from 'react-redux'

import { Link, Button } from 'components/common'

import 'styles/globals/globals.scss'
import css from './ShowMnemonic.scss'
import validate from './validate'
import Web3 from "../../../network/Web3Provider";

const FORM_SHOW_MNEMONIC = 'form/showMnemonic'

const onSubmit = ({ confirm }) => {
  if (!confirm) {
    throw new SubmissionError({_error: 'Please apply license'})
  }
}

class ShowMnemonic extends React.Component {

  render () {
    const { handleSubmit, error, pristine, invalid, mnemonic } = this.props
  
    return (
      <form className={css.root} name={FORM_SHOW_MNEMONIC} onSubmit={handleSubmit}>
        <h2>Write down back-up phrase</h2>
        
        <p className={css.description}>
          You can use this phrase to login and access your wallet, even if you forgot your password.
        </p>
        
        <div className={css.phraseBlock}>
          <div className={css.phraseBlockTitle}>Your back-up phrase (Mnemonic Key)</div>
          <div className={css.phrase}>
            { mnemonic }
          </div>
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
              <b>1. Copy you Account Password (Mnemonic key) on Paper.</b> Don't
              save your password on a computer, copy it on a paper and store in a safe place.
            </li>
  
            <li>
              <b>2. Don't share your wallet file with anyone you don't trust.</b> Even
              the wallet file is protected by password, the file still can be used against you and you may
              lose your funds. To avoid the situation do not share your file with anyone.
            </li>
            
            <li><b>3. What if I've lost my Back-up phrase (Mnemonic Key)?</b> You may use you wallet file instead.</li>
  
            <li>
              <b>4. What if I don't have neither Wallet file nor Back-up phrase (Mnemonic Key)?</b> We
              do not store this information and Your account will be lost together with all your funds and history.
            </li>
            
            <li>
              <b>5. Following the simple rules will make your account secure.</b>
            </li>
          </ol>
        </div>
  
        <div className={css.checkboxBlock}>
          <Field id='confirm' className={css.checkbox} component='input' type='checkbox' name='confirm' />
          <label htmlFor='confirm' className={css.checkboxLabel}>
            I have read QA and will follow security guidelines given on this page
          </label>
        </div>
        
        <div>
          <Button
            label='Proceed'
            buttonClassName={css.submitButton}
            type={Button.TYPES.SUBMIT}
            disabled={pristine || invalid}
            mods={Button.MODS.INVERT}
            error={error}
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mnemonic: state.createAccount.mnemonic,
  }
}

const form = reduxForm({ form: FORM_SHOW_MNEMONIC, validate, onSubmit })(ShowMnemonic)
export default connect(mapStateToProps)(form)
