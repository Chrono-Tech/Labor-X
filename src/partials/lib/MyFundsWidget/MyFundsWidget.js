import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Widget, Image } from 'src/components/common'
import { SignerModel } from 'src/models'
import { signerSelector } from 'src/store'
import css from './MyFundsWidget.scss'

export class MyFundsWidget extends React.Component {
  static propTypes = {
    signer: PropTypes.instanceOf(SignerModel).isRequired,
  }

  render () {
    const { signer } = this.props
    return signer && (
      <Widget
        href='/my-profile'
        title='ui.dashboard.general.completeYourProfile'
        subtitle='ui.dashboard.general.general'
        actions={[
          {
            href: '/general-profile',
            label: 'nav.generalProfile',
            isLink: true,
            secondIcon: Image.SETS.MESSAGE_ERROR,
          },
          {
            href: '/recruiter-profile',
            label: 'nav.recruiterProfile',
            isLink: true,
          },
          {
            href: '/worker-profile',
            label: 'nav.workerProfile',
            isLink: true,
          },
          {
            href: '/client-profile',
            label: 'nav.clientProfile',
            isLink: true,
          },
        ]}
      >
        <div className={css.main}>
          {signer.address}
        </div>
      </Widget>
    )
  }
}

function mapStateToProps (state) {
  const signer = signerSelector()(state)
  return {
    signer,
  }
}

function mapDispatchToProps (/*dispatch*/) {
  return {
    // stack: state.modals.stack,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFundsWidget)
