import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfileModel, WorkerModel } from 'src/models'
import { profileSelector } from 'src/store'
import { WorkerProfileContent } from 'src/content'
import { MainLayout } from 'src/components/layouts'

class WorkerProfilePage extends React.Component {

  static propTypes = {
    profile: PropTypes.shape({
      general: PropTypes.instanceOf(ProfileModel),
      worker: PropTypes.instanceOf(WorkerModel),
    }),
  }

  render () {
    const { profile } = this.props
    return !profile ? null : (
      <MainLayout title='nav.workerProfile'>
        <WorkerProfileContent profile={profile} />
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
  const worker = new WorkerModel({})
  return {
    profile: {
      general,
      worker,
    },
  }
}

export default connect(mapStateToProps)(WorkerProfilePage)
