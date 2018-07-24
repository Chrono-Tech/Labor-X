import React  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AccountLayout } from 'src/components/layouts'
import { AuthorizationMethodsForm } from 'src/components/Account'

import css from './index.scss'

class AuthorizationMethods extends React.Component {

  render () {

    return (
      <div className={css.root}>
        <AccountLayout title='Create New Acccount'>
          <AuthorizationMethodsForm />
        </AccountLayout>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(null, mapDispatchToProps)(AuthorizationMethods)
