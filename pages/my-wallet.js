import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import MyWalletContent from 'src/content/lib/MyWalletContent/MyWalletContent'
import { MainLayout } from 'src/components/layouts'
import { selectInitialProps } from "src/store/my-wallet/actions"
import { getSelectInitialPropsLoading } from "src/store/my-wallet/selectors"

export class MyWalletPage extends React.Component {

  static propTypes = {
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  render () {
    return (
      <MainLayout title='nav.myProfile'>
        { this.props.selectInitialPropsLoading ? <CircularProgress /> : <MyWalletContent /> }
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletPage)
