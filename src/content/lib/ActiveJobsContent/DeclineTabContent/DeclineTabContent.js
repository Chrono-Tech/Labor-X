import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { modalsPush } from 'src/store'
import DeclineJobCard from 'src/components/common/DeclineJobCard/DeclineJobCard'
import DelegateDialog from 'src/partials/lib/DelegateDialog/DelegateDialog'
import css from './DeclineTabContent.scss'

class DeclineTabContent extends React.Component {
  static propTypes = {
  }

  handleDelegate = () => {
    const modal = {
      component: DelegateDialog,
      props: { },
    }
    this.props.pushModal(modal)
  }

  render () {
    return (
      <div className={css.content}>
        <DeclineJobCard onHandleDelegate={this.handleDelegate} />
        <DeclineJobCard onHandleDelegate={this.handleDelegate} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushModal: (modal) => dispatch(modalsPush(modal)) ,
})

export default connect(null, mapDispatchToProps)(DeclineTabContent)
