import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageContentLoader from 'src/components/PageContentLoader'
import MyWalletContent from 'src/content/lib/MyWalletContent/MyWalletContent'
import { MainLayout } from 'src/components/layouts'
import { selectInitialProps, reset } from "src/store/my-wallet/actions"
import { getSelectInitialPropsLoading } from "src/store/my-wallet/selectors"

export class MyWalletPage extends React.Component {

  static propTypes = {
    reset: PropTypes.func.isRequired,
    selectInitialProps: PropTypes.func.isRequired,
    selectInitialPropsLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.selectInitialProps()
  }

  componentWillUnmount () {
    this.props.reset()
  }

  render () {
    return (
      <MainLayout title='nav.myProfile'>
        { this.props.selectInitialPropsLoading ? <PageContentLoader /> : <MyWalletContent /> }
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  selectInitialPropsLoading: getSelectInitialPropsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  selectInitialProps: () => dispatch(selectInitialProps()),
  reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletPage)
