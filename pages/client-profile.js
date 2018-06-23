import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { ProfileModel, ClientModel } from 'src/models'
import { profileSelector } from 'src/store'
import { ClientProfileContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class ClientProfilePage extends React.Component {

  static propTypes = {
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      client: PropTypes.instanceOf(ClientModel),
    }),
    stuff: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
  }

  render () {
    const { profile, stuff } = this.props
    return !profile && !stuff ? null : (
      <MainLayout title='nav.ClientProfile'>
        <ClientProfileContent profile={profile}  stuff={stuff} />
      </MainLayout>
    )
  }
}

function mapStateToProps (state) {
  const selectedWallet = state.wallet.selectedWallet
  if (!selectedWallet) {
    return {
      profile: null,
      stuff: null,
    }
  }
  const address = selectedWallet.encrypted[0].address
  const general = profileSelector(address)(state)

  // TODO @aevalyakin get actual data
  const client = new ClientModel({})
  const stuff = [
    new ProfileModel({ id: uniqid() }),
    new ProfileModel({ id: uniqid() }),
    new ProfileModel({ id: uniqid() }),
  ]
  return {
    profile: {
      general,
      client,
    },
    stuff,
  }
}

export default connect(mapStateToProps)(ClientProfilePage)
